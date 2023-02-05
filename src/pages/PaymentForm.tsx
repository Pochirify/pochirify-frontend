import Template from "components/templates/PaymentForm";
import { usePaymentAction } from "providers/PaymentStateProvider";
import { useEffect } from "react";

const PaymentForm = () => {
  const { setShowFooter } = usePaymentAction();
  useEffect(() => {
    setShowFooter(true);
  }, []);

  return (
    <>
      <Template />
    </>
  );
};

export default PaymentForm;
