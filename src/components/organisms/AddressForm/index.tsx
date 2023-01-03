import { Typography } from "components/atoms/Typography";
import { Grid } from "@mui/material";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { addressFormResolver } from "utils/resolvers/addressForm";
import { WithHyphenInput } from "components/molecules/FixedDigitInput/WithHyphenInput";
import { TextField } from "components/atoms/TextField";

type Address = {
  zipCode: string;
  prefecture: string;
  address2: string;
  address3: string;
  address4: string;
};

export const AddressForm = () => {
  // 外部から注入する
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<Address>({
    resolver: addressFormResolver,
    defaultValues: {
      zipCode: "",
      prefecture: "",
      address2: "",
      address3: "",
      address4: "",
    },
  });
  const fillAddress = async (value: string) => {
    // setZipcodeMain({ ...zipcode, sub: e.target.value });
    // setValue("zipCode", e.target.value)
    // 7チェックもいらなそう
    // TODO: 読み込み中はローディングマークつけるべきかもしれない
    try {
      const res = await axios.get("https://zipcloud.ibsnet.co.jp/api/search", {
        params: {
          zipcode: value,
        },
      });
      if (res.data.results) {
        const result = res.data.results[0];
        setValue("prefecture", result["address1"]);
        setValue("address2", result["address2"]);
        setValue("address3", result["address3"]);
      }
    } catch {
      console.log("住所の取得に失敗しました。");
    }
  };
  const setZipCode = async (value: string) => {
    setValue("zipCode", value);
  };

  const items = ["アイテム1", "東京都", "アイテム3"];

  // プルダウンがチェンジされた時
  const handleChange = (e: any) => {
    setValue("prefecture", e.target.value);
  };

  // TODO: define as atom
  const Select = () => {
    return (
      <select {...register("prefecture")} onChange={handleChange}>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography tag="span">郵便番号：</Typography>
        </Grid>
        <Grid item xs={6}>
          <WithHyphenInput
            length={7}
            onComplete={fillAddress}
            setValue={setZipCode}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          都道府県：
        </Grid>
        <Grid item xs={6}>
          <Typography tag="span">
            <Select />
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography tag="span">市区町村： </Typography>
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="address2"
            defaultValue=""
            render={({ field }) => <TextField {...field} width={"50%"} />}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography tag="span">町・番地：</Typography>
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="address3"
            defaultValue=""
            render={({ field }) => <TextField {...field} width="50%" />}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography tag="span">建物名など</Typography>
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="address4"
            defaultValue=""
            render={({ field }) => <TextField {...field} width="50%" />}
          />
        </Grid>
      </Grid>
    </>
  );
};
