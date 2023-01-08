import React, { FC, useState } from "react";
import { PaymentMethod } from "types";

type Props = {
  children: React.ReactNode;
};
type State = {
  totalPrice: number;
  selectingPaymentMethod: PaymentMethod;
  availablePaymentMethods: PaymentMethod[];
};

const defaultState: State = {
  totalPrice: 0,
  selectingPaymentMethod: "paypay",
  availablePaymentMethods: ["googlePay", "paypay", "card"],
};
const PaymentStateContext = React.createContext(defaultState);
const PaymentStateActionContext = React.createContext({
  setTotalPrice: () => {},
  setSelectingPaymentMethod: () => {},
} as {
  setTotalPrice: (totalPrice: number) => void;
  setSelectingPaymentMethod: (method: PaymentMethod) => void;
});
// ____________________________________________________________
//
export const PaymentStateProvider: FC<Props> = ({ children }: Props) => {
  const [state, setState] = useState<State>(defaultState);

  const setTotalPrice = React.useCallback((totalPrice: number) => {
    setState((prev) => ({ ...prev, totalPrice: totalPrice }));
  }, []);
  const setSelectingPaymentMethod = React.useCallback(
    (method: PaymentMethod) => {
      setState((prev) => ({ ...prev, selectingPaymentMethod: method }));
    },
    []
  );

  return (
    <PaymentStateContext.Provider value={state}>
      <PaymentStateActionContext.Provider
        value={{ setTotalPrice, setSelectingPaymentMethod }}
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
