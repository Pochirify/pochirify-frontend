import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const addressFormResolver = yupResolver(
  yup.object().shape({
    address1: yup.string().min(1),
    address2: yup.string().min(1),
    address3: yup.string().min(1),
  })
);
