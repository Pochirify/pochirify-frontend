import { VariantGroupDetailQuery, ProductVariant } from "gql/graphql";
import styles from "./style.module.scss";
import VariantGroupDetail from "components/organisms/VariantGroupDetail";

type Props = {
  data: VariantGroupDetailQuery;
};

export default function Template({ data }: Props) {
  return (
    <>
      <VariantGroupDetail data={data} isMobile={true} />
    </>
  );
}
