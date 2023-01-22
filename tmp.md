// function ProductDetail() {
//   const { data, loading, error } = useQuery<ProductDetailQuery>(
//     ProductDetailDocument,
//     {
//       variables: {
//         x: "1",
//       },
//     }
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>error!</p>;

//   // return data.todos.map(({  }))
//   console.log(data);
//   return <h2>data</h2>;
// }

// import type { CodegenConfig } from "@graphql-codegen/cli";

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:8080/api/query",
//   documents: "src/**/*.tsx",
//   generates: {
//     "src/gql/": {
//       preset: "client",
//       // plugins: ["typescript-operations"],
//       plugins: [],
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"],
//     },
//   },
// };

// export default config;
// function getTotalPrice(numbersInCart: number[], variants: Product[]) {
//   let total = 0;
//   variants.forEach((variant, i) => {
//     total += variant.price * numbersInCart[i];
//   });
//   return total;
// }

// export default function Template({ data }: Props) {
//   const [numbersInCart, setNumbersInCart] = useState(
//     data.variantGroupDetail.variants.map(() => 0)
//   );
//   const [touchedIndex, setTouchedIndex] = useState(0);
//   // const [totalPrice, setTotalPrice] = useState(0);
//   function totalPriceReducer(current: number, index: number) {
//     // data.variantGroupDetail.variants.forEach((variant, i) => {
//     //   total += variant.price * numbersInCart[i];
//     // });
//     return current + data.variantGroupDetail.variants[index].price;
//   }
//   const [totalPrice, dispatchTotalPrice] = useReducer(totalPriceReducer, 0);
// useEffect(() => {
//   setTotalPrice(
//     getTotalPrice(numbersInCart, data.variantGroupDetail.variants)
//   );
// }, [numbersInCart]);
// function updateCartInfo(numInCart: number) {
//   setCartInfos((prevCartInfos: CartInfo[]) => {
//     const newCartInfos = [...prevCartInfos];
//     newCartInfos[touchedIndex] = {
//       ...newCartInfos[touchedIndex],
//       numInCart,
//     };
//     return newCartInfos;
//   });
// }

function getIsFormValid(
  getValues: (name: string) => string,
  errors: FieldErrors<Form>
) {
  return (
    getValues("phoneNumber") !== "" &&
    typeof errors.phoneNumber === "undefined" &&
    getValues("email") !== "" &&
    typeof errors.email === "undefined" &&
    getValues("prefecture") !== "" &&
    typeof errors.prefecture === "undefined" &&
    getValues("address2") !== "" &&
    typeof errors.address2 === "undefined" &&
    getValues("address3") !== "" &&
    typeof errors.address3 === "undefined" &&
    getValues("lastName") !== "" &&
    typeof errors.lastName === "undefined" &&
    getValues("firstName") !== "" &&
    typeof errors.firstName === "undefined"
  );
}