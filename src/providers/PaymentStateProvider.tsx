import React, { FC, useState } from "react";
import { PaymentMethod } from "types";

type Props = {
  children: React.ReactNode;
};
type State = {
  totalPrice: number;
  paymentReadied: boolean;
  showFooter: boolean;
  onClick?: () => void; // footerをclickした時
  selectingPaymentMethod: PaymentMethod;
  availablePaymentMethods: PaymentMethod[];
};

const defaultState: State = {
  totalPrice: 0,
  paymentReadied: false,
  showFooter: true,
  selectingPaymentMethod: "paypay",
  availablePaymentMethods: ["googlePay", "paypay", "card"],
};
const PaymentStateContext = React.createContext(defaultState);
const PaymentStateActionContext = React.createContext({
  setTotalPrice: () => {},
  setPaymentReadied: () => {},
  setShowFooter: () => {},
  setOnClick: () => {},
  setSelectingPaymentMethod: () => {},
} as {
  setTotalPrice: (totalPrice: number) => void;
  setPaymentReadied: (paymentReadied: boolean) => void;
  setShowFooter: (showFooter: boolean) => void;
  setOnClick: (onClick: () => void) => void;
  setSelectingPaymentMethod: (method: PaymentMethod) => void;
});
// ____________________________________________________________
//
export const PaymentStateProvider: FC<Props> = ({ children }: Props) => {
  const [state, setState] = useState<State>(defaultState);

  const setTotalPrice = React.useCallback((totalPrice: number) => {
    setState((prev) => ({ ...prev, totalPrice }));
  }, []);
  const setPaymentReadied = React.useCallback((paymentReadied: boolean) => {
    setState((prev) => ({ ...prev, paymentReadied }));
  }, []);
  const setShowFooter = React.useCallback((showFooter: boolean) => {
    setState((prev) => ({ ...prev, showFooter }));
  }, []);
  const setOnClick = React.useCallback((onClick: () => void) => {
    setState((prev) => ({ ...prev, onClick }));
  }, []);
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
          setTotalPrice,
          setPaymentReadied,
          setShowFooter,
          setOnClick,
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
