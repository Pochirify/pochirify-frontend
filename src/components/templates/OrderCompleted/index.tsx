import { useState, useEffect } from "react";
import { withRouter, NextRouter } from "next/router";
import styles from "./style.module.scss";
import { Grid } from "@mui/material";
import Image from "next/image";
import { Typography } from "components/atoms/Typography";

type Props = {
  router: NextRouter;
};

const Template = (props: Props) => {
  // // NOTE: router.queryの準備ができるの時間がかかるので、
  // // その間はloadingを表示しておく必要がある。
  // const [isReady, setIsReady] = useState(false);

  // const shippingTimeFrom = props.router.query.shippingTimeFrom as
  //   | string
  //   | undefined;
  // const shippingTimeTo = props.router.query.shippingTimeTo as
  //   | string
  //   | undefined;

  // // 不正なqueryの場合に404へリダイレクトする。
  // // 不正でないかつ、queryの準備ができていたらloadingを解く。
  // useEffect(() => {
  //   // router.isReadyは、client sideのみで実行される、useEffect内で使用する必要がある
  //   if (props.router.isReady && (!shippingTimeFrom || !shippingTimeTo)) {
  //     props.router.push("/404");
  //   }
  //   if (props.router.isReady && shippingTimeFrom && shippingTimeTo) {
  //     setIsReady(true);
  //   }
  // }, [props.router.isReady]);

  // if (!isReady) {
  //   return <>loading...</>;
  // }

  return (
    <div className={styles.module}>
      <div className={styles.content}>
        <Grid container className={styles.title}>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}>
            <Image
              src="/completed.png"
              width={30}
              height={30}
              alt=""
              className={styles.title_item}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography tag="span">ご注文が確定されました</Typography>
          </Grid>
        </Grid>
        <Typography size="10" bold>
          ご注文内容と配送状況については注文完了メールまたは発送通知メールにてご確認ください。
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography size="10" bold>
              ご注文内容と配送状況については注文完了メールまたは発送通知メールにてご確認ください。
            </Typography>
          </Grid>
          <Grid item xs={6}>お届け</Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withRouter(Template);
