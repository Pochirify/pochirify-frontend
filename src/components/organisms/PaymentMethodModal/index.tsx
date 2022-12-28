import { Typography } from "components/atoms/Typography";
import { BarImage } from "components/atoms/BarImage";
import { useModalAction } from "providers/ModalProvider";
import {
  usePaymentState,
  usePaymentAction,
} from "providers/PaymentStateProvider";
import { getPaymentMethodAssetPathsExcept } from "utils/paymentMethodAssets";
import { Grid } from "@mui/material";

type Props = {};

export const PaymentMethodModal = (props: Props) => {
  const { totalPrice, selectingPaymentMethod } = usePaymentState();
  const { hideModal } = useModalAction();

  const paths = getPaymentMethodAssetPathsExcept(selectingPaymentMethod);
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
      {paths.map((path) => {
        return <BarImage key={path} src={path} height={60} />;
      })}
    </div>
  );
};
