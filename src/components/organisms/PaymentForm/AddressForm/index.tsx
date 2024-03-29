import { Typography } from "components/atoms/Typography";
import { Grid } from "@mui/material";
import axios from "axios";
import {
  Control,
  Controller,
  UseFormSetValue,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { InputWithHyphen } from "components/molecules/FixedDigitInput/InputWithHyphen";
import { TextField } from "components/molecules/TextField";
import { useEffect } from "react";
import { Form } from "components/organisms/PaymentForm";
import { prefectures } from "utils/payment/prefectures";

type Props = {
  setValue: UseFormSetValue<Form>;
  register: UseFormRegister<Form>;
  control: Control<Form>;
};

export const AddressForm = (props: Props) => {
  // useEffect(() => {
  //   console.log(isValid);
  // }, [isValid]);
  const fillAddress = async (value: string) => {
    // TODO: 読み込み中はローディングマークつけるべきかもしれない
    try {
      const res = await axios.get("https://zipcloud.ibsnet.co.jp/api/search", {
        params: {
          zipcode: value,
        },
      });
      if (res.data.results) {
        const result = res.data.results[0];
        props.setValue("prefecture", result["address1"]);
        props.setValue("city", result["address2"]);
        props.setValue("streetAddress", result["address3"]);
      }
    } catch {
      console.log("住所の取得に失敗しました。");
    }
  };
  const setZipCode = async (value: string) => {
    props.setValue("zipCode", value);
  };

  // プルダウンがチェンジされた時
  const handleChange = (e: any) => {
    props.setValue("prefecture", e.target.value);
  };

  // TODO: define as atom
  const Select = () => {
    return (
      <select {...props.register("prefecture")} onChange={handleChange}>
        {prefectures.map((prefecture) => (
          <option key={prefecture} value={prefecture}>
            {prefecture}
          </option>
        ))}
      </select>
    );
  };
  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <Typography tag="span">郵便番号*</Typography>
        </Grid>
        <Grid item xs={7}>
          {/* 一番後ろまでいってから消すときぶっ壊れている */}
          <InputWithHyphen
            length={7}
            onComplete={fillAddress}
            setValue={setZipCode}
            // onBlur={setZip}
            autoFocus={false}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <Typography tag="span">都道府県*</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography tag="span">
            <Select />
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <Typography tag="span">市区町村* </Typography>
        </Grid>
        <Grid item xs={7}>
          <Controller
            control={props.control}
            name="city"
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} placeholder="市区町村" />
            )}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <Typography tag="span">町・番地*</Typography>
        </Grid>
        <Grid item xs={7}>
          <Controller
            control={props.control}
            name="streetAddress"
            defaultValue=""
            render={({ field }) => (
              <TextField placeholder="町・番地" {...field} />
            )}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <Typography tag="span">建物名など</Typography>
        </Grid>
        <Grid item xs={7}>
          <Controller
            control={props.control}
            name="building"
            defaultValue=""
            render={({ field }) => (
              <TextField placeholder="建物名など" {...field} />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
