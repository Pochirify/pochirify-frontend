import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

type Props = {
  imageURLs: string[];
};

export const Images = (props: Props) => {
  const images = props.imageURLs.map((url) => {
    return {
      original: url,
      // thumbnail: url,
    };
  });

  return (
    <div>
      <ImageGallery
        items={images}
        showIndex={true}
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
      />
    </div>
  );
};
