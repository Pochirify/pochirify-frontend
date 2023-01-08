import { PaymentMethod } from "types";

export function getPaymentMethodAssetPath(paymentMethod: PaymentMethod) {
  return "/Payment/" + paymentMethod + ".png";
}

export function getPaymentMethodsExcept(except: PaymentMethod) {
  const methods: PaymentMethod[] = [];
  if (except !== "googlePay") {
    methods.push("googlePay");
  }
  if (except !== "paypay") {
    methods.push("paypay");
  }
  if (except !== "card") {
    methods.push("card");
  }

  return methods;
}
