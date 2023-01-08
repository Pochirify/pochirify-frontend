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
    prefecture: yup.string().min(1, "選択してください。"),
    address2: yup.string().min(1, "入力してください。"),
    address3: yup.string().min(1, "入力してください。"),
    lastName: yup.string().min(1, "入力してください。"),
    firstName: yup.string().min(1, "入力してください。"),
  })
);
