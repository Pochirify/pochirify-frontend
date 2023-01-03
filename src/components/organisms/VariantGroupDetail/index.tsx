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
import { Grid } from "@mui/material";

type Props = {
  data: VariantGroupDetailQuery;
  isMobile: boolean;
};

export default function VariantGroupDetail({ data, isMobile }: Props) {
  const [touchedIndex, setTouchedIndex] = useState(0);
  const [selectingCounts, setSelectingCounts] = useState<number[]>(
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
      <Typography tag="h3" bold alignCenter>
        {data.variantGroupDetail.variantGroup.title}
      </Typography>
      <BarImage src={data.variantGroupDetail.variantGroup.badgeImageURL} />
      {isMobile && (
        <Images imageURLs={data.variantGroupDetail.variantGroup.imageURLs} />
      )}
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
      <SelectingCountSetter
        selectingCount={selectingCounts[touchedIndex]}
        productTitle={data.variantGroupDetail.variants[touchedIndex].title}
        price={data.variantGroupDetail.variants[touchedIndex].price}
        onChange={updateSelectingCount}
      />
      {/* TODO: 普通のnext/imageのImageでいい */}
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
