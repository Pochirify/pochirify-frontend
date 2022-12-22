import { useModalAction, useModalState } from "providers/ModalProvider";
import React from "react";
import styles from "./style.module.scss";

const ModalContainerBase: React.FC = () => {
  const { isShow, renderComponent } = useModalState();
  const { hideModal } = useModalAction();
  if (!isShow) return null;
  return (
    <div className={styles.module} onClick={hideModal}>
      {/* 外側をclickしたらhideModalする */}
      <div
        className={styles.container}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export const ModalContainer = React.memo(ModalContainerBase);
