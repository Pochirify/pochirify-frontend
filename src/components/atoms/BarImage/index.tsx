import Image from "next/image";
// ____________________________________________________________
//
type Props = {
  src: string;
  // alt: string;
  height?: number;
};
// ____________________________________________________________
//
// image atomの一つの種類として定義するべきかも
export const BarImage = (props: Props) => {
  let height = 50;
  if (props.height) {
    height = props.height;
  }
  return (
    <div style={{ position: "relative", width: "100%", height: height }}>
      <Image src={props.src} layout="fill" objectFit="contain" alt="image" />
    </div>
  );
};
