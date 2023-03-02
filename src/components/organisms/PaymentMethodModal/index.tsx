import { Typography } from "components/atoms/Typography";
import { BarImage } from "components/atoms/BarImage";
import { useModalAction } from "providers/ModalProvider";
import {
  usePaymentState,
  usePaymentAction,
} from "providers/PaymentStateProvider";
import { getPaymentMethodAssetPath } from "utils/payment/paymentMethod";
import { Grid } from "@mui/material";

type Props = {};

export const PaymentMethodModal = (props: Props) => {
  const { totalPrice, availablePaymentMethods } = usePaymentState();
  const { setSelectingPaymentMethod } = usePaymentAction();
  const { hideModal } = useModalAction();

  return (
    <div>
      <Grid container>
        <Grid item xs={10}>
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
        <Grid item xs={2}>
          <button onClick={() => hideModal()}>
            {/* 画像がいいかも */}
            <Typography tag="span" size="14">
              ✖️
            </Typography>
          </button>
        </Grid>
      </Grid>
      {availablePaymentMethods.map((method) => {
        return (
          <BarImage
            key={method}
            src={getPaymentMethodAssetPath(method)}
            height={60}
            onClick={() => {
              setSelectingPaymentMethod(method);
              hideModal();
            }}
          />
        );
      })}
    </div>
  );
};
