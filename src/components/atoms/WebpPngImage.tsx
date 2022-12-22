import Image from "react-image-webp";

type Props = {
  webpImageURL: string;
  pngImageURL: string;
};

// next/imageはこれやらなくても自動でwebpにしてくれるっぽいからいらん？
export const WebpPngImage = (props: Props) => {
  return (
    <div>
      <Image
        src={props.pngImageURL}
        webp={props.webpImageURL}
        width="100%"
        alt="description"
      />
    </div>
  );
};
