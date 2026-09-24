import gradient from "gradient-string";

const colors = {
  primary: gradient(["#36D1DC", "#5B86E5"]),
  success: gradient(["#56ab2f", "#a8e063"]),
  warning: gradient(["#f7971e", "#ffd200"]),
  danger: gradient(["#cb2d3e", "#ef473a"]),
  info: gradient(["#00c6ff", "#0072ff"]),
  purple: gradient(["#DA22FF", "#9733EE"]),
  sunset: gradient(["#FA8BFF", "#2BD2FF", "#2BFF88"]),
  ocean: gradient(["#2E3192", "#1BFFFF"]),
};

type ColorFn = (text: string) => string;

const COLOR_MAP: ColorFn[] = [
  colors.primary,
  colors.success,
  colors.info,
  colors.purple,
  colors.sunset,
  colors.ocean,
];

export {colors, COLOR_MAP};
