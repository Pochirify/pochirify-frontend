import { useState } from "react";
import { SixDigitInput } from "components/molecules/FixedDigitInput/SixDigitInput";
import { InputWithHyphen } from "components/molecules/FixedDigitInput/InputWithHyphen";
import { usePaymentState } from "providers/PaymentStateProvider";
import { Typography } from "components/atoms/Typography";
import { payWithCard } from "utils/payment/fincode";
import { FincodePaymentForm } from "types";
import { FormContainer } from "components/molecules/FormContainer";
import Script from "next/script";
import { AddressForm } from "components/organisms/AddressForm";
import styles from "./style.module.scss";
import { TextField } from "components/molecules/TextField";

// payWithCodeと住所自動入力に必要
const Scripts = () => {
  return (
    <>
      <Script src="https://js.test.fincode.jp/v1/fincode.js" />
      <Script src="https://ajaxzip3.github.io/ajaxzip3.js" />
    </>
  );
};

const Template = () => {
  const { totalPrice } = usePaymentState();
  const [phoneNumber, setPhoneNumber] = useState("");
  // const form: FincodePaymentForm = {
  //   orderID: "o_HllPegeTRbyqLzTU6RTZ_g",
  //   accessID: "a_ee1F2rCATY6BrG349U4BIQ",
  //   cardNo: "4541136894473008",
  //   expire: "2805",
  //   holderName: "SHOTA KONO",
  //   securityCode: "644",
  // };
  return (
    <div className={styles.module}>
      <Typography size={"14"}>合計{totalPrice}円（税込・送料込み）</Typography>
      <FormContainer
        iconImageURL="/Payment/PaymentForm/telePhone.png"
        title="電話番号"
      >
        <InputWithHyphen
          length={11}
          onComplete={() => {
            console.log("sfds");
          }}
          setValue={setPhoneNumber}
        />
      </FormContainer>
      <FormContainer
        iconImageURL="/Payment/PaymentForm/mail.png"
        title="メールアドレス"
      >
        <TextField width="100%" />
      </FormContainer>
      <FormContainer
        iconImageURL="/Payment/PaymentForm/address.png"
        title="配送先住所"
      >
        <AddressForm />
      </FormContainer>
      {/* <button onClick={() => payWithCard(form)}>button</button> */}
      <Scripts />
    </div>
  );
};

export default Template;
