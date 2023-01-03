export type PaymentMethod = "googlePay" | "paypay";

export type FincodePaymentForm = {
  orderID: string;
  accessID: string;
  cardNo: string;
  expire: string; // yymm形式
  holderName: string;
  securityCode: string;
};
