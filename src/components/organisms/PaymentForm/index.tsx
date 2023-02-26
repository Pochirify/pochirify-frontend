import React, { useEffect, useState, useCallback } from "react";
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
import { useCard } from "./useCard";
import {
  MutationFunctionOptions,
  DefaultContext,
  ApolloCache,
  FetchResult,
} from "@apollo/client";
import { CreateOrderMutation, CreateOrderInput, Exact } from "gql/graphql";
import { Footer } from "components/organisms/Layout/Footer";
import { useRouter } from "next/router";

export type Form = {
  phoneNumber: string;
  email: string;
  zipCode: string;
  prefecture: string;
  // TODO: フィールド名わかりずらい
  city: string;
  streetAddress: string;
  building?: string;
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

type Props = {
  productID: string;
  totalPrice: number;
  quantity: number;
  setPaying: (paying: boolean) => void;
  createOrder: (
    options?:
      | MutationFunctionOptions<
          CreateOrderMutation,
          Exact<{
            input: CreateOrderInput;
          }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<FetchResult<CreateOrderMutation>>;
};

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
  // TODO: useFormは一つにまとめられる(resolverでwhen句使う)
  const {
    cardControl,
    cardSetValue,
    cardTrigger,
    cardRegister,
    cardGetValues,
    cardIsValid,
    cardErrors,
  } = useCard();

  const { selectingPaymentMethod } = usePaymentState();
  const [showCardForm, setShowCardForm] = useState(
    selectingPaymentMethod === "card"
  );

  // props.createOrder({
  //   variables: {
  //     input: {
  //       productID: "",
  //       quantity: 0,
  //       paymentMethod: PaymentMethod.Card,
  //       phoneNumber: "",
  //       emailAddress: "",
  //       zipCode: 3424,
  //       prefecture: "",
  //       city: "",
  //       streetAddress: "",
  //       lastName: "",
  //       firstName: "",
  //     },
  //   },
  // }).catch((e) => {});
  useEffect(() => {
    setShowCardForm(selectingPaymentMethod === "card");
  }, [selectingPaymentMethod]);

  const setPhoneNumber = (value: string) => {
    setValue("phoneNumber", value);
  };

  const [active, setActive] = useState(false);
  useEffect(() => {
    let active: boolean;
    if (selectingPaymentMethod === "card") {
      active = isValid && cardIsValid;
    } else {
      active = isValid;
    }
    setActive(active);
  }, [isValid, cardIsValid, selectingPaymentMethod]);

  const router = useRouter();

  return (
    <div className={styles.module}>
      <Typography size={"14"}>
        合計{props.totalPrice}円（税込・送料込み）
      </Typography>
      <FormContainer
        iconImageURL="/Payment/PaymentForm/telePhone.png"
        title="電話番号"
      >
        <InputWithHyphen
          length={11}
          setValue={setPhoneNumber}
          autoFocus={true}
        />
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
      <Footer
        totalPrice={props.totalPrice}
        active={active}
        onClick={() => props.setPaying(true)}
      />
    </div>
  );
};
