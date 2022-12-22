import { Typography } from "components/atoms/Typography";
import { usePaymentState } from "providers/PaymentStateProvider";
import styles from "./style.module.scss";
import { Grid } from "@material-ui/core";
import { BarImage } from "components/atoms/BarImage";
import { getPaymentMethodAssetsPath } from "utils/paymentMethodAssets";
import Image from "next/image";
// import { Image } from "components/atoms/Image";

export const Footer = () => {
  const { totalPrice, selectingPaymentMethod } = usePaymentState();
  return (
    <footer className={styles.module}>
      <div className={styles.totalPrice}>
        <Typography tag="span" size="10">合計 </Typography>
        <Typography tag="span" size="12" bold>
          {totalPrice}
        </Typography>
        <Typography tag="span" size="10">円 (税込・送料込み)　</Typography>
      </div>
      <div className={styles.paymentBar}>
        <span className={styles.paymentButton}>
          <Image
            src={getPaymentMethodAssetsPath(selectingPaymentMethod)}
            alt=""
            width={100}
            height={60}
          />
          {/* TODO: なぜかこいつが下いってしまう */}
          <Typography
            tag="span"
            size="10"
            alignCenter
            className={styles.paymentButtonText}
          >
            でお支払い
          </Typography>
        </span>
        <Image
          src="/paymentMethodSelectButton.png"
          alt=""
          width={60}
          height={60}
        />
      </div>
    </footer>
  );
};
