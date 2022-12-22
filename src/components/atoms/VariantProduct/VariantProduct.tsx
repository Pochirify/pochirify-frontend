import Image from "next/image";
import { Stack } from "@mui/material";
import { Product } from "../../../gql/graphql";
import styles from "./styles.module.scss";

type Props = {
  product: Product;
  onClick: () => void;
};

export const VariantProduct = (props: Props) => {
  const contents = props.product.contents.map((content) => {
    return (
      <>
        <li>{content}</li>
      </>
    );
  });
  return (
    <span>
      <Stack
        direction="column"
        className={styles.module}
        onClick={() => props.onClick()}
      >
        <Image
          src={props.product.imageURL}
          width="100"
          height="100"
          alt="product"
        />
        <span className={styles.title}>{props.product.title}</span>
        <span className={styles.price}>
          {props.product.price}(税込・送料込み)
        </span>
        <span className={styles.contentTitle}>内容</span>
        <ul className={styles.content}>{contents}</ul>
      </Stack>
    </span>
  );
};
