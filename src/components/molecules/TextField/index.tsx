import React from "react";
import styles from "./style.module.scss";
import { mergeClassName } from "utils/string";

type Props = React.ComponentProps<"input"> & {
  className?: string;
  // bottom shows if both of bottom and error gotten
  bottom?: string;
  error?: string;
};

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  function TextFiled({ className, bottom, error, ...props }) {
    return (
      <div className={mergeClassName(styles.module, className)}>
        <input {...props} />
        {(bottom || error) && (
          <div className={styles.bottom}>
            {!bottom && <span>{error}</span>}
            {!error && <span>{bottom}</span>}
            {error && bottom && <span>{bottom}</span>}
          </div>
        )}
      </div>
    );
  }
);
