import { useState } from "react";
import { SixDigitInput } from "components/molecules/FixedDigitInput/SixDigitInput";
import { PhoneNumberInput } from "components/molecules/FixedDigitInput/PhoneNumberInput/input";
import { usePaymentState } from "providers/PaymentStateProvider";
import { Typography } from "components/atoms/Typography";

const PaymentForm = () => {
  const { totalPrice } = usePaymentState();
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log(phoneNumber);
  return (
    <>
      <Typography size={"14"}>合計{totalPrice}円（税込・送料込み）</Typography>
      {/* <SixDigitInput
        correctNumber={111222}
        onComplete={() => {
          console.log("sfds");
        }}
      /> */}
      <PhoneNumberInput
        onComplete={() => {
          console.log("sfds");
        }}
        setValue={setPhoneNumber}
      />
    </>
  );
};

export default PaymentForm;
