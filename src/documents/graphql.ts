import { gql } from "@apollo/client";

// const ALL_ACTIVE_PRODUCTS = gql`
//   query allActiveProductIDs {
//     allActiveProductIDs {
//       ids
//     }
//   }
// `;
// const PRODUCT_DETAIL = gql`
//   query productDetail($id: String!) {
//     productDetail(id: $id) {
//       product: product {
//         id
//         title
//         price
//         contents
//         roughTimeRange {
//           from
//           to
//         }
//       }
//       variants: variants {
//         id
//         title
//         price
//         contents
//         roughTimeRange {
//           from
//           to
//         }
//       }
//     }
//   }
// `;

const VARIANT_GROUP_DETAIL = gql`
  query variantGroupDetail($id: String!) {
    variantGroupDetail(id: $id) {
      variantGroup: variantGroup {
        id
        title
        imageURLs
        deliveryTimeRange {
          from
          to
        }
        faqImageURL {
          webpURL
          pngURL
        }
        descriptionImageURL {
          webpURL
          pngURL
        }
        badgeImageURL
      }
      variants: variants {
        id
        title
        price
        contents
        imageURL
      }
    }
  }
`;
// TODO: 複数形にする
const ALL_ACTIVE_VARIANT_GROUP_ID = gql`
  query allActiveVariantGroupID {
    allActiveVariantGroupIDs {
      ids
    }
  }
`;
