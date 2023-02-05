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
import { useEffect, useState } from "react";

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
  router: NextRouter;
};

const Template = (props: Props) => {
  // NOTE: router.queryの準備ができるの時間がかかるので、
  // その間はloadingを表示しておく必要がある。
  const [isReady, setIsReady] = useState(false);

  const productID = props.router.query.productID as string | undefined;
  const quantity = props.router.query.quantity as string | undefined;
  const variantImageURLs = props.router.query.variantImageURLs as
    | string[]
    | undefined;

  // 不正なqueryの場合に404へリダイレクトする。
  // 不正でないかつ、queryの準備ができていたらloadingを解く。
  useEffect(() => {
    // router.isReadyは、client sideのみで実行される、useEffect内で使用する必要がある
    if (
      props.router.isReady &&
      (!productID || !quantity || !variantImageURLs)
    ) {
      props.router.push("/404");
    }
    if (props.router.isReady && productID && quantity && variantImageURLs) {
      setIsReady(true);
    }
  }, [props.router.isReady]);

  const [createOrder, { data, loading, error }] = useMutation<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >(CreateOrderDocument);

  if (!isReady) {
    return <>loading...</>;
  }

  const quantityInt = parseInt(quantity as string, 10);
  return (
    <div className={styles.module}>
      {/* <button onClick={() => payWithCard(form)}>button</button> */}
      <Grid container>
        <Grid item xs={6}>
          {variantImageURLs?.map((url, i) => {
            return <Image key={i} src={url} height="100" width="100" alt="" />;
          })}
        </Grid>
        <Grid item xs={6}>
          <PaymentForm
            productID={productID as string}
            quantity={quantityInt}
            createOrder={createOrder}
          />
        </Grid>
      </Grid>
      <Scripts />
    </div>
  );
};

export default withRouter(Template);
