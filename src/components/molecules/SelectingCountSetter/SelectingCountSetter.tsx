import { Grid, Typography } from "@mui/material";

type Props = {
  selectingCount: number;
  productTitle: string;
  price: number;
  onChange: (value: number) => void;
};

export const SelectingCountSetter = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={12}>
            <Typography>{props.productTitle}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{props.price}(税込・送料込み)</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        {/* TODO: as number input */}
        <input
          type="number"
          value={props.selectingCount}
          onChange={(event) => props.onChange(event.target.valueAsNumber)}
        />
      </Grid>
    </Grid>
  );
};
