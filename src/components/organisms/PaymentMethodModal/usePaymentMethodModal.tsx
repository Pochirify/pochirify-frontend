import React from "react";
import { useModalAction } from "providers/ModalProvider";
import { PaymentMethodModal } from ".";

export function usePaymentMethodModal() {
  const { showModal } = useModalAction();
  const onClick = React.useCallback(() => {
    showModal(() => <PaymentMethodModal />);
  }, [showModal]);
  return { onClick } as const;
}
