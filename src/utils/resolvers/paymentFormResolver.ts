import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const paymentFormResolver = yupResolver(
  yup.object().shape({
    address2: yup.string().min(1, "入力してください").max(10, "ddddd"),
    address3: yup.string().min(1),
  })
);
