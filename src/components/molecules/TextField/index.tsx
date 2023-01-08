import React from "react";
import styles from "./style.module.scss";
import { mergeClassName } from "utils/string";

type Props = React.ComponentProps<"input"> & {
  className?: string;
  number?: boolean;
  // bottom shows if both of bottom and error gotten
  // bottom?: string;
  error?: string;
};

// TODO: refじゃなくてよい
export const TextField = React.forwardRef<HTMLInputElement, Props>(
  // TODO: nameタグもとっていれるべき？
  function TextFiled({ className, error, ...props }) {
    return (
      <span className={mergeClassName(styles.module, className)}>
        <input {...props} />
        {error && <span className={styles.error}>{error}</span>}
        {/* {(bottom || error) && (
          <div className={styles.bottom}>
            {!bottom && <span>{error}</span>}
            {!error && <span>{bottom}</span>}
            {error && bottom && <span>{bottom}</span>}
          </div>
        )} */}
      </span>
    );
  }
);
