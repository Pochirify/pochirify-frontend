import { VariantGroupDetailQuery, Product } from "gql/graphql";
import { useEffect, useReducer, useState } from "react";
import { ProductsSlider } from "components/molecules/ProductsSlider/ProductsSlider";
import { SelectingCountSetter } from "components/molecules/SelectingCountSetter/SelectingCountSetter";
import { WebpPngImage } from "components/atoms/WebpPngImage";
import { Images } from "components/atoms/Images";
import { BarImage } from "components/atoms/BarImage";
import { DeliveryDetail } from "components/molecules/DeliveryDetail/DeliveryDetail";
import { ReturnPolicy } from "components/molecules/ReturnPolicy/ReturnPolicy";
import { Typography } from "components/atoms/Typography";
import { usePaymentAction } from "providers/PaymentStateProvider";
import styles from "./style.module.scss";

type Props = {
  data: VariantGroupDetailQuery;
};

export default function Template({ data }: Props) {
  const [touchedIndex, setTouchedIndex] = useState(0);
  const [selectingCounts, setSelectingCounts] = useState(
    data.variantGroupDetail.variants.map(() => 0)
  );
  const { setTotalPrice } = usePaymentAction();
  useEffect(() => {
    setTotalPrice(
      selectingCounts[touchedIndex] *
        data.variantGroupDetail.variants[touchedIndex].price
    );
  }, [
    touchedIndex,
    selectingCounts,
    data.variantGroupDetail.variants,
    setTotalPrice,
  ]);

  function updateSelectingCount(selectingCount: number) {
    setSelectingCounts((prevCounts: number[]) => {
      const newCounts = [...prevCounts];
      newCounts[touchedIndex] = selectingCount;
      return newCounts;
    });
  }

  return (
    <>
      <Typography tag="h3">
        {data.variantGroupDetail.variantGroup.title}
      </Typography>
      <BarImage src={data.variantGroupDetail.variantGroup.badgeImageURL} />
      <Images imageURLs={data.variantGroupDetail.variantGroup.imageURLs} />
      <DeliveryDetail
        deliveryTimeFrom={
          data.variantGroupDetail.variantGroup.deliveryTimeRange.from
        }
        deliveryTimeTo={
          data.variantGroupDetail.variantGroup.deliveryTimeRange.to
        }
      />
      <ReturnPolicy />
      <ProductsSlider
        variantProducts={data.variantGroupDetail.variants}
        onProductClick={setTouchedIndex}
      />
      {/* TODO: useEffectで定義した方がレンダリング早い。
      stateが更新されるたびに全部がレンダリングされるが、useEffectはレンダリング前に値を更新することで、
      レンダリング回数を減らすことができる。使わないと、レンダリングで他の値が更新されるたびにまたレンダリングされて、
      一回でいいのに連続でレンダリングしてしまいそう*/}
      <SelectingCountSetter
        selectingCount={selectingCounts[touchedIndex]}
        productTitle={data.variantGroupDetail.variants[touchedIndex].title}
        price={data.variantGroupDetail.variants[touchedIndex].price}
        onChange={updateSelectingCount}
      />
      {/* 普通のnext/imageのImageでいい説 */}
      <WebpPngImage
        webpImageURL={data.variantGroupDetail.variantGroup.faqImageURL.webpURL}
        pngImageURL={data.variantGroupDetail.variantGroup.faqImageURL.pngURL}
      />
      <WebpPngImage
        webpImageURL={
          data.variantGroupDetail.variantGroup.descriptionImageURL.webpURL
        }
        pngImageURL={
          data.variantGroupDetail.variantGroup.descriptionImageURL.pngURL
        }
      />
      <Typography className={styles.space}></Typography>
    </>
  );
}

// TODO: 計算の部分をorganizmとして取り出す。
