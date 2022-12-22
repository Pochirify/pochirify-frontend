import React from "react";
// ____________________________________________________________
//
type Props = {
  children: React.ReactNode;
};
type State = {
  isShow: boolean;
  renderComponent: () => React.ReactNode;
};
const defaultState: State = {
  isShow: false,
  renderComponent: () => null,
};
const ModalStateContext = React.createContext(defaultState);
const ModalActionContext = React.createContext({
  showModal: () => {},
  hideModal: () => {},
} as {
  showModal: (renderComponent: () => React.ReactNode) => void;
  hideModal: () => void;
});
// ____________________________________________________________
//
export const ModalProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, setState] = React.useState<State>(defaultState);
  // useCallbackは、依存関係のあるやつが変化しない限り関数を再レンダリングしないっていうやつ。
  // 今回の場合は初期レンダリング時にしか関数はレンダリングされない。
  const showModal = React.useCallback(
    (renderComponent: () => React.ReactNode) => {
      setState((prev) => ({ ...prev, isShow: true, renderComponent }));
    },
    []
  );
  const hideModal = React.useCallback(() => {
    setState((prev) => ({ ...prev, isShow: false }));
  }, []);
  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={{ showModal, hideModal }}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};
// ______________________________________________________
//
export function useModalState() {
  return React.useContext(ModalStateContext);
}
export function useModalAction() {
  return React.useContext(ModalActionContext);
}
