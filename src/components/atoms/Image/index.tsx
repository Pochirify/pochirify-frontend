import { mergeClassName } from "utils/string";
import React from "react";
import styles from "./style.module.scss";
// ____________________________________________________________
//
// spanのデフォルトの引数を継承。classNameとか
type Props = React.ComponentPropsWithoutRef<"span"> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  children?: never;
};
// ____________________________________________________________
//
export const Image = ({
  // 継承、propsで定義したものから使用するものを指定
  className,
  alt,
  src,
  width = 80,
  height = 80,
  ...props
}: Props) => (
  <span
    {...props}
    role="img"
    aria-label={alt}
    style={{
      width,
      height,
      minWidth: width,
      minHeight: height,
      backgroundImage: `url(${src})`,
    }}
    className={mergeClassName(styles.module, className)}
  />
);
