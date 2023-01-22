import Template from "components/templates/Payment";
import { useState } from "react";
import { usePaymentAction } from "providers/PaymentStateProvider";
import { useEffect } from "react";
import { withRouter, NextRouter, useRouter } from "next/router";

type Props = {
  router: NextRouter;
};

const Payment = (props: Props) => {
  const { setShowFooter } = usePaymentAction();
  useEffect(() => {
    setShowFooter(true);
  }, []);

  // NOTE: router.queryの準備ができるの時間がかかるので、
  // その間はloadingを表示しておく必要がある。
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  }, [props.router.isReady]);

  if (loading) {
    return <>loading...</>;
  }

  const quantityInt = parseInt(quantity as string, 10);
  return (
    <>
      <Template
        productID={productID as string}
        quantity={quantityInt}
        variantImageURLs={variantImageURLs as string[]}
      />
    </>
  );
};

export default withRouter(Payment);
