import { PaymentMethod } from "types";
export function getPaymentMethodAssetsPath(paymentMethod: PaymentMethod) {
  return "/Payment/" + paymentMethod + ".png"
}
