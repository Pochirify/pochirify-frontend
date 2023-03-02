import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import MobileTemplate from "components/templates/VariantGroup/MobileTemplate";
import PcTemplate from "components/templates/VariantGroup/PcTemplate";
import {
  AllActiveVariantGroupIdDocument,
  AllActiveVariantGroupIdQuery,
  QueryVariantGroupDetailArgs,
  VariantGroupDetailDocument,
  VariantGroupDetailQuery,
} from "../../gql/graphql";
import { useMediaQueryContext } from "providers/MediaQueryProvider";

const Page = ({ data }: { data: VariantGroupDetailQuery }) => {
  const { isMobileSite, isPcSite } = useMediaQueryContext();

  return (
    <>
      {isMobileSite && <MobileTemplate data={data} />}
      {isPcSite && <PcTemplate data={data} />}
    </>
  );
};

export default Page;
// const imageSrc = (index: number, imageURLs: string[]): string => {
//   return imageURLs[index];
// };

// export default function VariantGroupDetail({
//   data,
// }: {
//   data: VariantGroupDetailQuery;
// }) {
//   const [openingIndex, setOpeningIndex] = useState(0);
//   return (
//     <div>
//       <h2>{data.variantGroupDetail.variantGroup.title}</h2>
//       <Image
//         src={imageSrc(
//           openingIndex,
//           data.variantGroupDetail.variantGroup.imageURLs
//         )}
//         width="100"
//         height="100"
//         alt="image"
//       />
//       <Image
//         onMouseOver={() => setOpeningIndex(0)}
//         src={data.variantGroupDetail.variantGroup.imageURLs[0]}
//         width="100"
//         height="100"
//         alt="image"
//       />
//       <Image
//         onMouseOver={() => setOpeningIndex(1)}
//         src={data.variantGroupDetail.variantGroup.imageURLs[1]}
//         width="100"
//         height="100"
//         alt="image"
//       />
//     </div>
//   );
// }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL === undefined) {
    throw new Error("process.env.NEXT_PUBLIC_BACKEND_URL is undefined");
  }
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    cache: new InMemoryCache(),
  });

  // TODO: error handling
  const { data } = await client.query<
    VariantGroupDetailQuery,
    QueryVariantGroupDetailArgs
  >({
    query: VariantGroupDetailDocument,
    variables: {
      id: params?.id as string,
    },
  });
  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL === undefined) {
    throw new Error("process.env.NEXT_PUBLIC_BACKEND_URL is undefined");
  }
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    cache: new InMemoryCache(),
  });

  // TODO: error handling
  const data = await client.query<AllActiveVariantGroupIdQuery>({
    query: AllActiveVariantGroupIdDocument,
  });
  const paths = data.data.allActiveVariantGroupIDs.ids.map((id) => {
    return {
      params: {
        id: id,
      },
    };
  });

  return {
    paths,
    fallback: false,
    // revalidate: 30,
  };
};
