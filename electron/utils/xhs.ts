// 小红书payload里的search_id
export const createSearchId = () => {
  function F() {
    let timestamp = new Date().getTime().toString();
    if (timestamp.length < 13) {
      timestamp = timestamp.padEnd(13, "0");
    }
    return timestamp;
  }
  function J() {
    let t = BigInt(F()),
      r = BigInt(Math.ceil(2147483646 * Math.random()));
    return (t <<= BigInt(64)), (t += r).toString(36);
  }
  return J();
};
