import { useModalAction } from "providers/ModalProvider";

export function usePaymentMethodModal() {
  const {showModal} = useModalAction()
  const onClick = React.useCallback(() => {
    showModal(()=>)
  })
}