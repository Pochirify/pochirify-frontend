import Image from "next/image";
import { Grid } from "@mui/material";
import { Typography } from "components/atoms/Typography";
import styles from "style.module.scss";

type Props = {
  iconImageURL: string;
  title: string;
  children: React.ReactNode;
};

export const FormContainer = (props: Props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Image src={props.iconImageURL} width={40} height={40} alt="" />
        </Grid>
        <Grid item xs={10}>
          <Typography>{props.title}</Typography>
        </Grid>
      </Grid>
      <div>{props.children}</div>
    </>
  );
};
