import Script from "next/script";
import styles from "./style.module.scss";
import { PaymentForm } from "components/organisms/PaymentForm";
import { Grid } from "@mui/material";
import Image from "next/image";
import { usePaymentState } from "providers/PaymentStateProvider";
import { withRouter, NextRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  CreateOrderDocument,
  CreateOrderMutation,
  CreateOrderMutationVariables,
} from "gql/graphql";
import { useEffect } from "react";

// payWithCodeと住所自動入力に必要
const Scripts = () => {
  return (
    <>
      <Script src="https://js.test.fincode.jp/v1/fincode.js" />
      {/* <Script src="https://ajaxzip3.github.io/ajaxzip3.js" /> */}
    </>
  );
};
// const form: FincodePaymentForm = {
//   orderID: "o_HllPegeTRbyqLzTU6RTZ_g",
//   accessID: "a_ee1F2rCATY6BrG349U4BIQ",
//   cardNo: "4541136894473008",
//   expire: "2805",
//   holderName: "SHOTA KONO",
//   securityCode: "644",
// };

type Props = {
  productID: string;
  quantity: number;
  variantImageURLs: string[];
};

const Template = (props: Props) => {
  const [createOrder, { data, loading, error }] = useMutation<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >(CreateOrderDocument);

  return (
    <div className={styles.module}>
      {/* <button onClick={() => payWithCard(form)}>button</button> */}
      <Grid container>
        <Grid item xs={6}>
          {props.variantImageURLs.map((url, i) => {
            return <Image key={i} src={url} height="100" width="100" alt="" />;
          })}
        </Grid>
        <Grid item xs={6}>
          <PaymentForm
            productID={props.productID}
            quantity={props.quantity}
            createOrder={createOrder}
          />
        </Grid>
      </Grid>
      <Scripts />
    </div>
  );
};

export default Template;
