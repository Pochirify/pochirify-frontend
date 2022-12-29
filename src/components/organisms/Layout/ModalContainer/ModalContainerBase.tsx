import { useModalState } from "providers/ModalProvider";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import React from "react";

type Props = {
  moduleClassName: string;
  containerClassName: string;
};

// TODO: こいつを使ってcssは外から注入する。
// TODO: marginをつける。開いてる時に背後をうすくする。
export const ModalContainerBase = (props: Props) => {
  const { isShow, renderComponent } = useModalState();
  return (
    <TransitionStyle>
      <CSSTransition classNames="modal" in={isShow} timeout={200} unmountOnExit>
        <div className={props.moduleClassName}>
          <div className={props.containerClassName}>{renderComponent()}</div>
        </div>
      </CSSTransition>
    </TransitionStyle>
  );
};

// CSSTransitionによるclass命名規則を守るため、scssではなくstyled-componentsを使用している
const TransitionStyle = styled.div`
  .modal-enter {
    opacity: 0;
    transform: translateY(100%);
  }

  .modal-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.2s linear, transform 0.2s linear;
  }

  .modal-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .modal-exit-active {
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.2s linear, transform 0.2s;
  }
`;
