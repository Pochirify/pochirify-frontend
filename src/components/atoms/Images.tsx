import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Card, Grid } from "@mui/material";

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
      <Grid container justifyContent="center">
        <Card sx={{ maxWidth: 380 }}>
          <ImageGallery
            items={images}
            showPlayButton={false}
            showNav={true}
            disableSwipe={false}
            showIndex={true}
            showFullscreenButton={false}
            onErrorImageURL={
              "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png"
            }
          />
        </Card>
      </Grid>
    </div>
  );
};
