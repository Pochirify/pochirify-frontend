import React, { Children, useState } from "react";
import { Footer } from "./Footer";
import { MobileModalContainer } from "./ModalContainer/Mobile";
import { DesktopModalContainer } from "./ModalContainer/Desktop";
import { useMediaQueryContext } from "providers/MediaQueryProvider";
import { Grid } from "@mui/material";

type Props = {
  children: React.ReactNode;
};
export const Layout = ({ children }: Props) => {
  const { isMobileSite } = useMediaQueryContext();
  if (isMobileSite) {
    return (
      <div>
        <main>{children}</main>
        <Footer />
        <MobileModalContainer />
      </div>
    );
  } else {
    return (
      <div>
        <main>{children}</main>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            {/* TODO: 変更 */}
            <div style={{ height: "190px" }}></div>
            <Footer />
          </Grid>
        </Grid>
        <DesktopModalContainer />
      </div>
    );
  }
};
