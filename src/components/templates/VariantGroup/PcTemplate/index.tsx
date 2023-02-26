import { VariantGroupDetailQuery, ProductVariant } from "gql/graphql";
import { Images } from "components/atoms/Images";
import { Grid } from "@mui/material";
import styles from "./style.module.scss";
import VariantGroupDetail from "components/organisms/VariantGroupDetail";

type Props = {
  data: VariantGroupDetailQuery;
};

export default function Template({ data }: Props) {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Images imageURLs={data.variantGroupDetail.variantGroup.imageURLs} />
        </Grid>
        <Grid item xs={6}>
          <VariantGroupDetail data={data} isMobile={false} />
        </Grid>
      </Grid>
    </>
  );
}
