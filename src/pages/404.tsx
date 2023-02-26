import { useEffect } from "react";
import styles from "./style.module.scss";
import { usePaymentAction } from "providers/PaymentStateProvider";

export default function Custom404() {
  return <div className={styles.module404}>404 - Page Not Found</div>;
}
