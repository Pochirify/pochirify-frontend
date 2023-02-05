import React, { useEffect } from "react";
import { Typography } from "components/atoms/Typography";
import { usePaymentState } from "providers/PaymentStateProvider";
import styles from "./style.module.scss";
import { Grid } from "@material-ui/core";
import { getPaymentMethodAssetPath } from "utils/payment/paymentMethodAssets";
import { usePaymentMethodModal } from "components/organisms/PaymentMethodModal/usePaymentMethodModal";
import { useMediaQueryContext } from "providers/MediaQueryProvider";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

export const Footer = () => {
  const {
    totalPrice,
    paymentReadied,
    showFooter,
    onClick,
    selectingPaymentMethod,
  } = usePaymentState();
  const router = useRouter();
  const paymentMethodModal = usePaymentMethodModal();
  const { isMobileSite } = useMediaQueryContext();
  const moduleWidth = isMobileSite ? "100%" : "50%";

  const [active, setActive] = React.useState(true);
  useEffect(() => {
    const active = paymentReadied || router.pathname !== "/Payment";
    setActive(active);
    // console.log(!paymentReadied && router.pathname === "/PaymentForm");
  }, [paymentReadied, router.pathname]);

  if (!showFooter) {
    return <></>;
  }

  return (
    <Grid container style={{ width: moduleWidth }} className={styles.module}>
      <Box
        sx={{
          border: 1,
          borderRadius: 1,
          backgroundColor: "white",
          borderColor: "white",
        }}
      >
        <Grid container justifyContent="center">
          <Grid container xs={11}>
            <Grid container item justifyContent="flex-end">
              <Grid item>
                <Typography tag="span" size="10">
                  合計
                </Typography>
                <Typography tag="span" size="12" bold>
                  {totalPrice}
                </Typography>
                <Typography tag="span" size="10">
                  円 (税込・送料込み)　
                </Typography>
              </Grid>
            </Grid>
            <Grid container item justifyContent="center">
              <Box
                sx={{
                  border: 1,
                  borderRadius: 3,
                  width: "100%",
                  height: "90%",
                }}
              >
                <Grid container>
                  <Grid
                    container
                    item
                    xs={10}
                    justifyContent="center"
                    alignItems="center"
                    style={{ opacity: active ? undefined : 0.3 }}
                  >
                    <a
                      role="button"
                      className={active ? styles.button : undefined}
                      onClick={active ? onClick : undefined}
                    >
                      <img
                        src={getPaymentMethodAssetPath(selectingPaymentMethod)}
                        alt=""
                        width="60%"
                        height="80%"
                      />
                      <Typography tag="span" size="10">
                        でお支払い
                      </Typography>
                    </a>
                  </Grid>
                  <Grid item xs={2}>
                    <a
                      role="button"
                      {...paymentMethodModal}
                      className={styles.button}
                    >
                      {/* 多分画像じゃなくて、文字列で扱うべき */}
                      <img
                        src="/paymentMethodSelectButton.png"
                        alt=""
                        width="100%"
                        height="90%"
                      />
                    </a>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
