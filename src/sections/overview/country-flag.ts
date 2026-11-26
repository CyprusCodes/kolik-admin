export const countryFlag = (code: string) =>
  code.length === 2
    ? String.fromCodePoint(...[...code.toUpperCase()].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65))
    : "";
