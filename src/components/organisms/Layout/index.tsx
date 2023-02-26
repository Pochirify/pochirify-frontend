import React, { Children, useState } from "react";
import { MobileModalContainer } from "./ModalContainer/Mobile";
import { DesktopModalContainer } from "./ModalContainer/Desktop";
import { useMediaQueryContext } from "providers/MediaQueryProvider";
import styles from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};
export const Layout = ({ children }: Props) => {
  const { isMobileSite } = useMediaQueryContext();
  if (isMobileSite) {
    return (
      <div>
        <main>{children}</main>
        <MobileModalContainer />
      </div>
    );
  } else {
    return (
      <div className={styles.pc_site}>
        <main>{children}</main>
        <DesktopModalContainer />
      </div>
    );
  }
};
