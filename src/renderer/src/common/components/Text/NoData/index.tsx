interface Props {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
}
function NoData(props: Props): JSX.Element {
  const { message } = props;

  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg"
  };

  return (
    <span
      className={`text-white text-opacity-45 ${textSize[props.size || "md"]}`}
    >
      {message || "No Data"}
    </span>
  );
}

export default NoData;
