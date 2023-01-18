import { useEffect, useState } from "react";
import { SixDigitInput } from "components/molecules/FixedDigitInput/SixDigitInput";
import { InputWithHyphen } from "components/molecules/FixedDigitInput/InputWithHyphen";
import {
  usePaymentAction,
  usePaymentState,
} from "providers/PaymentStateProvider";
import { Typography } from "components/atoms/Typography";
import { payWithCard } from "utils/payment/fincode";
import { FincodePaymentForm } from "types";
import { FormContainer } from "components/molecules/FormContainer";
import Script from "next/script";
import { AddressForm } from "components/organisms/PaymentForm/AddressForm";
import styles from "./style.module.scss";
import { TextField } from "components/molecules/TextField";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { paymentFormResolver } from "utils/resolver";
import { CardForm } from "components/organisms/PaymentForm/CardForm";
import { GraphicalShow } from "components/atoms/GraphicalShow/GraphicalShow";
import { useRouter } from "next/router";
import { useCard } from "./useCard";

export type Form = {
  phoneNumber: string;
  email: string;
  zipCode: string;
  prefecture: string;
  // TODO: フィールド名わかりずらい
  address2: string;
  address3: string;
  address4?: string;
  lastName: string;
  firstName: string;
};

// const form: FincodePaymentForm = {
//   orderID: "o_HllPegeTRbyqLzTU6RTZ_g",
//   accessID: "a_ee1F2rCATY6BrG349U4BIQ",
//   cardNo: "4541136894473008",
//   expire: "2805",
//   holderName: "SHOTA KONO",
//   securityCode: "644",
// };

type Props = {};

export const PaymentForm = (props: Props) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { isValid, errors },
  } = useForm<Form>({
    resolver: paymentFormResolver,
  });
  const {
    cardControl,
    cardSetValue,
    cardTrigger,
    cardRegister,
    cardGetValues,
    cardIsValid,
    cardErrors,
  } = useCard();

  const { totalPrice, selectingPaymentMethod } = usePaymentState();
  const [showCardForm, setShowCardForm] = useState(
    selectingPaymentMethod === "card"
  );
  useEffect(() => {
    setShowCardForm(selectingPaymentMethod === "card");
  }, [selectingPaymentMethod, setValue]);

  const setPhoneNumber = (value: string) => {
    setValue("phoneNumber", value);
  };

  const { setPaymentReadied } = usePaymentAction();
  useEffect(() => {
    let readied: boolean;
    if (selectingPaymentMethod === "card") {
      readied = isValid && cardIsValid;
    } else {
      readied = isValid;
    }
    setPaymentReadied(readied);
  }, [isValid, cardIsValid, selectingPaymentMethod, setPaymentReadied]);

  return (
    <div className={styles.module}>
      <Typography size={"14"}>合計{totalPrice}円（税込・送料込み）</Typography>
      <FormContainer
        iconImageURL="/Payment/PaymentForm/telePhone.png"
        title="電話番号"
      >
        <InputWithHyphen length={11} setValue={setPhoneNumber} />
      </FormContainer>
      <FormContainer
        iconImageURL="/Payment/PaymentForm/mail.png"
        title="お問い合わせ先"
      >
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="XXX@example.com"
              onChangeCapture={() => trigger("email")}
              error={errors.email?.message}
            />
          )}
        />
      </FormContainer>
      <FormContainer
        iconImageURL="/Payment/PaymentForm/address.png"
        title="配送先住所"
      >
        <AddressForm
          setValue={setValue}
          register={register}
          control={control}
        />
      </FormContainer>
      {/* <button onClick={() => payWithCard(form)}>button</button> */}
      <FormContainer
        iconImageURL="/Payment/PaymentForm/name.png"
        title="氏名（カナ）"
      >
        <Controller
          control={control}
          name="lastName"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="例）ヤマダ"
              className={styles.name}
            />
          )}
        />
        <Controller
          control={control}
          name="firstName"
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="例）タロウ"
              className={styles.name}
            />
          )}
        />
      </FormContainer>

      <GraphicalShow isShow={showCardForm}>
        <FormContainer
          iconImageURL="/Payment/PaymentForm/card.png"
          title="クレジットカード"
        >
          <CardForm
            setValue={cardSetValue}
            trigger={cardTrigger}
            register={cardRegister}
            control={cardControl}
            getValues={cardGetValues}
            errors={cardErrors}
          />
        </FormContainer>
      </GraphicalShow>
      <input type="submit" onClick={() => trigger()} />
    </div>
  );
};
