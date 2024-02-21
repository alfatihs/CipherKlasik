export function generateKey(key: string): number[][] {
  return key
    .trim()
    .split("\n")
    .map((el) =>
      el
        .trim()
        .split(" ")
        .map((el) => parseInt(el.trim()))
    );
}
