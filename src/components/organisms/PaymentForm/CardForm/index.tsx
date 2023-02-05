import { useState } from "react";
import {
  UseFormTrigger,
  UseFormSetValue,
  UseFormRegister,
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
} from "react-hook-form";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Card } from "components/organisms/PaymentForm/useCard";
import { TextField } from "components/molecules/TextField";
import { Grid } from "@mui/material";

type Props = {
  setValue: UseFormSetValue<Card>;
  trigger: UseFormTrigger<Card>;
  register: UseFormRegister<Card>;
  control: Control<Card>;
  getValues: UseFormGetValues<Card>;
  errors?: FieldErrors<Card>;
};

export const CardForm = (props: Props) => {
  const [cardNo, setCardNo] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expire, setExpire] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const onChangeCardNo = (e: any) => {
    setCardNo(e.target.value);
  };
  const onChangeHolderName = (e: any) => {
    setHolderName(e.target.value);
  };
  const onChangeExpire = (e: any) => {
    setExpire(e.target.value);
  };
  const onChangeSecurityCode = (e: any) => {
    setSecurityCode(e.target.value);
  };

  return (
    <div>
      <Cards
        number={cardNo}
        name={holderName}
        expiry={expire}
        cvc={securityCode}
      />
      <Grid container>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="cardNo"
            defaultValue=""
            render={({ field }) => (
              // telだとアルファベットとかも入れることができてしまう...
              <TextField
                {...field}
                placeholder="カード番号（16桁）"
                type="tel"
                maxLength={16}
                onInput={onChangeCardNo}
                error={props.errors?.cardNo?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="holderName"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="名義人（例 TARO YAMADA）"
                type="text"
                onInput={onChangeHolderName}
                error={props.errors?.holderName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          {/* TODO: 色々改良の余地あり */}
          <Controller
            control={props.control}
            name="expire"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="有効期限（例 08/27）"
                type="text"
                maxLength={5}
                onInput={onChangeExpire}
                error={props.errors?.expire?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="securityCode"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="セキュリティコード（3桁）"
                type="tel"
                maxLength={3}
                onInput={onChangeSecurityCode}
                error={props.errors?.securityCode?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};
