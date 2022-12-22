import React, { Children, useState } from "react";
import { Footer } from "./Footer";
import { ModalContainer } from "./ModalContainer";

type Props = {
  children: React.ReactNode;
};
export const Layout = ({ children }: Props) => {
  return (
    <div>
      <main>{children}</main>
      <Footer />
      <ModalContainer />
    </div>
  );
};
