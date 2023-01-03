import React from "react";
import styles from "./style.module.scss";
import { mergeClassName } from "utils/string";

type Props = React.ComponentProps<"input"> & {
  width: "50%" | "100%";
};

export const TextField = (props: Props) => {
  const width = props.width === "50%" ? styles.half : styles.full;
  return <input {...props} className={mergeClassName(styles.module, width)} />;
};
