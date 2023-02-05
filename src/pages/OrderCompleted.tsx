import Template from "components/templates/OrderCompleted";
import { usePaymentAction } from "providers/PaymentStateProvider";
import { useEffect } from "react";

const OrderCompleted = () => {
  const { setShowFooter } = usePaymentAction();
  useEffect(() => {
    setShowFooter(false);
  }, []);

  return (
    <>
      <Template />
    </>
  );
};

export default OrderCompleted;
