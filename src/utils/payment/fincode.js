export function payWithCard(form) {
  const api_key =
    "p_test_NTgzNjMyNGQtOTI4Zi00NDMzLThlYjEtMGJjYTRkOTI0NTA2ODcyM2FjNmUtNDg0Yi00Yzg5LThkZWQtNGY3OWJiMTE4Njdmc18yMzAxMDEzMTYzNg";
  let fincode = Fincode(api_key);
  const transaction = {
    // オーダーID
    id: form.orderID,
    // 決済種別
    pay_type: "Card",
    // 取引ID
    access_id: form.accessID,
    // 支払い方法
    method: "1", // 一括
    // カード番号
    card_no: form.cardNo,
    // 有効期限 yymm形式
    expire: form.expire,
    // カード名義人
    holder_name: form.holderName,
    // セキュリティコード
    security_code: form.securityCode,
  };

  // 決済実行
  fincode.payments(
    transaction,
    function (status, response) {
      if (status === 200) {
        // リクエスト正常時の処理
        console.log(response);
      } else {
        // リクエストエラー時の処理
        console.log(response);
      }
    },
    function () {
      // 通信エラー処理
      console.log("ERROR");
    }
  );
}
