import { PaymentMethod } from "types";
import { PaymentMethod as GqlPaymentMethod } from "gql/graphql";

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

export function getGqlPaymentMethod(
  paymentMethod: PaymentMethod
): GqlPaymentMethod {
  switch (paymentMethod) {
    case "googlePay":
      return GqlPaymentMethod.GooglePay;
    case "paypay":
      return GqlPaymentMethod.Paypay;
    case "card":
      return GqlPaymentMethod.Card;
    default:
      return GqlPaymentMethod.Paypay;
  }
}
