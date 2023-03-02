import { VariantGroupDetailQuery, ProductVariant } from "gql/graphql";
import { useEffect, useReducer, useState } from "react";
import { ProductsSlider } from "components/molecules/ProductsSlider/ProductsSlider";
import { SelectingCountSetter } from "components/molecules/SelectingCountSetter/SelectingCountSetter";
import { Images } from "components/atoms/Images";
import { BarImage } from "components/atoms/BarImage";
import { DeliveryDetail } from "components/molecules/DeliveryDetail/DeliveryDetail";
import { ReturnPolicy } from "components/molecules/ReturnPolicy/ReturnPolicy";
import {
  usePaymentAction,
  usePaymentState,
} from "providers/PaymentStateProvider";
import { Typography } from "components/atoms/Typography";
import styles from "./style.module.scss";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { Footer } from "components/organisms/Footer";
import Image from "next/image";

type Props = {
  data: VariantGroupDetailQuery;
  isMobile: boolean;
};

export default function VariantGroupDetail({ data, isMobile }: Props) {
  const [touchedIndex, setTouchedIndex] = useState(0);
  const [selectingCounts, setSelectingCounts] = useState<number[]>(
    data.variantGroupDetail.variants.map(() => 1)
  );

  const totalPrice =
    selectingCounts[touchedIndex] *
    data.variantGroupDetail.variants[touchedIndex].unitPrice;
  const { setTotalPrice } = usePaymentAction();
  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [totalPrice, setTotalPrice]);

  const [onClick, setOnClick] = useState({ fn: () => {} });
  const router = useRouter();
  useEffect(() => {
    setOnClick({
      fn: () => {
        router.push({
          pathname: "/PaymentForm",
          query: {
            productID: data.variantGroupDetail.variants[touchedIndex].id,
            totalPrice: totalPrice,
            quantity: selectingCounts[touchedIndex],
            variantImageURLs: data.variantGroupDetail.variantGroup.imageURLs,
          },
        });
      },
    });
  }, [touchedIndex, selectingCounts, data, totalPrice]);

  function updateSelectingCount(selectingCount: number) {
    setSelectingCounts((prevCounts: number[]) => {
      const newCounts = [...prevCounts];
      newCounts[touchedIndex] = selectingCount;
      return newCounts;
    });
  }

  return (
    <>
      <Grid sx={{ mt: 3 }}>
        <Typography tag="h3" bold alignCenter>
          {data.variantGroupDetail.variantGroup.title}
        </Typography>
      </Grid>
      <BarImage src={data.variantGroupDetail.variantGroup.badgeImageURL} />
      {isMobile && (
        <Images imageURLs={data.variantGroupDetail.variantGroup.imageURLs} />
      )}
      {/* <Grid sx={{ mt: 1 }}>
        <DeliveryDetail
          deliveryTimeFrom={
            data.variantGroupDetail.variantGroup.deliveryTimeRange.from
          }
          deliveryTimeTo={
            data.variantGroupDetail.variantGroup.deliveryTimeRange.to
          }
        />
      </Grid>
      <Grid sx={{ mt: 1 }}>
        <ReturnPolicy />
      </Grid> */}
      <Grid sx={{ mt: 1 }}>
        <ProductsSlider
          variantProducts={data.variantGroupDetail.variants}
          onProductClick={setTouchedIndex}
        />
      </Grid>
      <Grid sx={{ mt: 1 }}>
        <SelectingCountSetter
          selectingCount={selectingCounts[touchedIndex]}
          productTitle={data.variantGroupDetail.variants[touchedIndex].title}
          price={data.variantGroupDetail.variants[touchedIndex].unitPrice}
          onChange={updateSelectingCount}
        />
      </Grid>
      <Grid sx={{ mt: 1 }}>
        <img
          src={data.variantGroupDetail.variantGroup.descriptionImageURL}
          width="100%"
          alt="description"
        />
        {/* <WebpPngImage
          webpImageURL={
            data.variantGroupDetail.variantGroup.descriptionImageURL.webpURL
          }
          pngImageURL={
            data.variantGroupDetail.variantGroup.descriptionImageURL.pngURL
          }
        /> */}
      </Grid>
      <Typography className={styles.space}></Typography>
      {/* TODO: Footerのstyle修正 */}
      <Footer
        totalPrice={totalPrice}
        active={totalPrice > 0}
        onClick={onClick.fn}
      />
    </>
  );
}
