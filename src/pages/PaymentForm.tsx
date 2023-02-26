import Template from "components/templates/PaymentForm";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const PaymentForm = () => {
  const { isMobileSite } = useMediaQueryContext();
  return (
    <>
      <Template isMobileSite={isMobileSite} />
    </>
  );
};

export default PaymentForm;
