import React from "react";
import { Stack } from "@mui/material";
import { Product } from "../../../gql/graphql";
import { VariantProduct } from "../../atoms/VariantProduct/VariantProduct";
import styles from "./styles.module.scss";

type Props = {
  variantProducts: Array<Product>;
  onProductClick(hoveringProductIndex: number): void;
};

export const ProductsSlider = (props: Props) => {
  return (
    <Stack direction="row" className={styles.module}>
      {props.variantProducts.map((product, i) => {
        return (
          <>
            <VariantProduct
              product={product}
              onClick={() => props.onProductClick(i)}
            />
          </>
        );
      })}
    </Stack>
  );
};
