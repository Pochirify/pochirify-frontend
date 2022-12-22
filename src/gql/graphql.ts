/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: any;
  PhoneNumber: any;
};

export type AddressInput = {
  addressOne: Scalars["String"];
  addressTwo?: InputMaybe<Scalars["String"]>;
  prefecture: Scalars["String"];
  zip: Scalars["String"];
};

export type AllActiveVariantGroupIDs = {
  __typename?: "AllActiveVariantGroupIDs";
  ids: Array<Scalars["String"]>;
};

export type DeliveryTimeRange = {
  __typename?: "DeliveryTimeRange";
  from: Scalars["String"];
  to: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createPaypayQRCode: CreatePaypayQrCodePayload;
  createTodo: Todo;
  createUser: User;
};

export type MutationCreatePaypayQrCodeArgs = {
  input: PaypayQrCodeInput;
};

export type MutationCreateTodoArgs = {
  input: NewTodo;
};

export type MutationCreateUserArgs = {
  input: NewUser;
};

export type NewTodo = {
  text: Scalars["String"];
  userId: Scalars["String"];
};

export type NewUser = {
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type PaypayQrCodeInput = {
  address: AddressInput;
  amount: Scalars["Int"];
  emailAddress: Scalars["EmailAddress"];
  orderDescription: Scalars["String"];
  phoneNumber: Scalars["PhoneNumber"];
};

export type Product = {
  __typename?: "Product";
  contents: Array<Scalars["String"]>;
  id: Scalars["ID"];
  imageURL: Scalars["String"];
  price: Scalars["Int"];
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  allActiveVariantGroupIDs: AllActiveVariantGroupIDs;
  todos: Array<Todo>;
  users: Array<User>;
  variantGroupDetail: VariantGroupDetail;
};

export type QueryVariantGroupDetailArgs = {
  id: Scalars["String"];
};

export type Todo = {
  __typename?: "Todo";
  done: Scalars["Boolean"];
  id: Scalars["ID"];
  text: Scalars["String"];
  user: User;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  todo?: Maybe<Todo>;
};

export type VariantGroup = {
  __typename?: "VariantGroup";
  badgeImageURL: Scalars["String"];
  deliveryTimeRange: DeliveryTimeRange;
  descriptionImageURL: WebpPngImageUrl;
  faqImageURL: WebpPngImageUrl;
  id: Scalars["ID"];
  imageURLs: Array<Scalars["String"]>;
  title: Scalars["String"];
};

export type VariantGroupDetail = {
  __typename?: "VariantGroupDetail";
  variantGroup: VariantGroup;
  variants: Array<Product>;
};

export type WebpPngImageUrl = {
  __typename?: "WebpPngImageURL";
  pngURL: Scalars["String"];
  webpURL: Scalars["String"];
};

export type CreatePaypayQrCodePayload = {
  __typename?: "createPaypayQRCodePayload";
  deepLink: Scalars["String"];
  url: Scalars["String"];
};

export type VariantGroupDetailQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type VariantGroupDetailQuery = {
  __typename?: "Query";
  variantGroupDetail: {
    __typename?: "VariantGroupDetail";
    variantGroup: {
      __typename?: "VariantGroup";
      id: string;
      title: string;
      imageURLs: Array<string>;
      badgeImageURL: string;
      deliveryTimeRange: {
        __typename?: "DeliveryTimeRange";
        from: string;
        to: string;
      };
      faqImageURL: {
        __typename?: "WebpPngImageURL";
        webpURL: string;
        pngURL: string;
      };
      descriptionImageURL: {
        __typename?: "WebpPngImageURL";
        webpURL: string;
        pngURL: string;
      };
    };
    variants: Array<{
      __typename?: "Product";
      id: string;
      title: string;
      price: number;
      contents: Array<string>;
      imageURL: string;
    }>;
  };
};

export type AllActiveVariantGroupIdQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AllActiveVariantGroupIdQuery = {
  __typename?: "Query";
  allActiveVariantGroupIDs: {
    __typename?: "AllActiveVariantGroupIDs";
    ids: Array<string>;
  };
};

export const VariantGroupDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "variantGroupDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "variantGroupDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  alias: { kind: "Name", value: "variantGroup" },
                  name: { kind: "Name", value: "variantGroup" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "imageURLs" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deliveryTimeRange" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "from" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "to" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "faqImageURL" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "webpURL" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "pngURL" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "descriptionImageURL" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "webpURL" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "pngURL" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "badgeImageURL" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  alias: { kind: "Name", value: "variants" },
                  name: { kind: "Name", value: "variants" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "contents" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "imageURL" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VariantGroupDetailQuery,
  VariantGroupDetailQueryVariables
>;
export const AllActiveVariantGroupIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allActiveVariantGroupID" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allActiveVariantGroupIDs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ids" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AllActiveVariantGroupIdQuery,
  AllActiveVariantGroupIdQueryVariables
>;
