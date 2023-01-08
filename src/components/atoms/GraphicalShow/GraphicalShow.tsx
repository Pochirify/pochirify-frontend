import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import styles from "./style.module.scss";

type Props = {
  isShow: boolean;
  children: React.ReactNode;
};

export const GraphicalShow = (props: Props) => {
  return (
    <TransitionStyle className={styles.module}>
      <CSSTransition
        classNames="module"
        in={props.isShow}
        timeout={200}
        unmountOnExit
      >
        {props.children}
      </CSSTransition>
    </TransitionStyle>
  );
};

const TransitionStyle = styled.div`
  .module-enter {
    opacity: 0;
  }

  .module-enter-active {
    opacity: 1;
    transition: opacity 0.2s linear;
  }

  .module-exit {
    opacity: 1;
  }

  .module-exit-active {
    opacity: 0;
    transition: opacity 0.2s linear;
  }
`;
