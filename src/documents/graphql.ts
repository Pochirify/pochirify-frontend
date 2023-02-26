import { gql } from "@apollo/client";

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
        faqImageURL
        descriptionImageURL
        badgeImageURL
      }
      variants: variants {
        id
        title
        unitPrice
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

const CREATE_ORDER = gql`
  mutation createOrder($input: createOrderInput!) {
    createOrder(input: $input) {
      order {
        orderID
        totalPrice
        orderResult {
          ... on paypayOrderResult {
            url
          }
          ... on creditCardResult {
            cardOrderID
            accessID
          }
        }
      }
    }
  }
`;
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
