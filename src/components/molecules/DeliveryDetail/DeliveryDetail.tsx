import { Typography } from "components/atoms/Typography";
import Image from "next/image";
import styles from "./style.module.scss";

type Props = {
  deliveryTimeFrom: string;
  deliveryTimeTo: string;
};
export const DeliveryDetail = (props: Props) => {
  return (
    <div className={styles.module}>
      {/* TODO: imageはIcon atomとして切り出すべき */}
      <Image src="/truck_icon.png" width="40" height="40" alt="truck_icon" />
      <Image
        src="/delivery_cost_free.png"
        width="100"
        height="35"
        alt="delivery_cost"
      />
      <Typography tag="span" size="10">
        {props.deliveryTimeFrom}〜{props.deliveryTimeFrom}にお届け
      </Typography>
    </div>
  );
};
