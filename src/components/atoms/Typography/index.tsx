import { mergeClassName } from "utils/string";
import React from "react";
import styles from "./style.module.scss";
// ______________________________________________________
//
type Tag = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Elements = {
  p: HTMLParagraphElement;
  span: HTMLSpanElement;
  h1: HTMLTitleElement;
  h2: HTMLTitleElement;
  h3: HTMLTitleElement;
  h4: HTMLTitleElement;
  h5: HTMLTitleElement;
  h6: HTMLTitleElement;
};
// ______________________________________________________
//
type Size = "10" | "12" | "14" | "16" | "18" | "20" | "22" | "24";
// ______________________________________________________
//
// TODO: 垂直方向にcenterも欲しい
type Props<T extends Tag> = React.ComponentPropsWithoutRef<T> & {
  tag?: Tag;
  size?: Size;
  bold?: boolean;
  alignCenter?: boolean;
};
// ______________________________________________________
//
function TypographyBase<T extends Tag>(
  {
    className,
    tag = "p",
    size = "16",
    bold = undefined,
    alignCenter = false,
    ...props
  }: React.PropsWithChildren<Props<T>>,
  ref: React.ForwardedRef<Elements[T]>
) {
  return React.createElement(tag, {
    ref,
    className: mergeClassName(
      styles.module,
      className,
      alignCenter && styles.center
    ),
    ...props,
    "data-size": size,
    "data-bold": bold,
  });
}

export const Typography = React.forwardRef(TypographyBase);
