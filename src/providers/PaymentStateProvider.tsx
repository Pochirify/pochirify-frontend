import React, { FC, useState } from "react";
import { PaymentMethod } from "types";

type Props = {
  children: React.ReactNode;
};
type State = {
  selectingPaymentMethod: PaymentMethod;
  availablePaymentMethods: PaymentMethod[];
};

const defaultState: State = {
  selectingPaymentMethod: "paypay",
  availablePaymentMethods: ["googlePay", "paypay", "card"],
};
const PaymentStateContext = React.createContext(defaultState);
const PaymentStateActionContext = React.createContext({
  setSelectingPaymentMethod: () => {},
} as {
  setSelectingPaymentMethod: (method: PaymentMethod) => void;
});
// ____________________________________________________________
//
export const PaymentStateProvider: FC<Props> = ({ children }: Props) => {
  const [state, setState] = useState<State>(defaultState);
  const setSelectingPaymentMethod = React.useCallback(
    (method: PaymentMethod) => {
      setState((prev) => ({ ...prev, method }));
    },
    []
  );

  return (
    <PaymentStateContext.Provider value={state}>
      <PaymentStateActionContext.Provider
        value={{
          setSelectingPaymentMethod,
        }}
      >
        {children}
      </PaymentStateActionContext.Provider>
    </PaymentStateContext.Provider>
  );
};
// ____________________________________________________________
//
export function usePaymentState() {
  return React.useContext(PaymentStateContext);
}
export function usePaymentAction() {
  return React.useContext(PaymentStateActionContext);
}
