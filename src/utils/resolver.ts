import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const paymentFormResolver = yupResolver(
  yup.object().shape({
    phoneNumber: yup.string().length(11, "正しい電話番号を入力してください。"),
    email: yup
      .string()
      .lowercase()
      .required("お問い合わせ先は必須項目です。")
      .email("正しいメールアドレスを入力してください。"),
    prefecture: yup.string().min(1),
    address2: yup.string().min(1),
    address3: yup.string().min(1),
    lastName: yup.string().min(1),
    firstName: yup.string().min(1),

    cardNo: yup.string().length(16),
    holderName: yup.string().min(1),
    expire: yup.string().length(5), // TODO: add regular expression
    securityCode: yup.string().length(3),
  })
);

export const cardResolver = yupResolver(
  yup.object().shape({
    cardNo: yup.string().length(16),
    holderName: yup.string().min(1),
    expire: yup.string().length(5), // TODO: add regular expression
    securityCode: yup.string().length(3),
  })
);
