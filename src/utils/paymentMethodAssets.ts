import { PaymentMethod } from "types";

export function getPaymentMethodAssetPath(paymentMethod: PaymentMethod) {
  return "/Payment/" + paymentMethod + ".png";
}

export function getPaymentMethodAssetPathsExcept(except: PaymentMethod) {
  const paths = [];
  if (except !== "googlePay") {
    paths.push(getPaymentMethodAssetPath("googlePay"));
  }
  if (except !== "paypay") {
    paths.push(getPaymentMethodAssetPath("paypay"));
  }

  return paths;
}
