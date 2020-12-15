// Функция взятая из демонстрации академии.
export const nanoid = (t = 21) => {
  let e = ``;
  let r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--;) {
    let n = 63 & r[t];
    let tempExpressionOne = n < 63 ? `_` : `-`;
    let tempExpressionTwo = n < 62 ? (n - 26).toString(36).toUpperCase() : tempExpressionOne;
    e += n < 36 ? n.toString(36) : tempExpressionTwo;
  }
  return e;
};
