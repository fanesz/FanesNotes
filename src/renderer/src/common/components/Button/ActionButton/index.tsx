import { Button, CircularProgress } from "@material-ui/core";

interface Props {
  onClick: () => void;
  disabledLoading?: boolean;
  submitLoading?: boolean;
  icon?: React.ReactNode;
  label: string;
  variant?: "contained" | "outlined";
  size?: "small" | "medium" | "large";
  color?: "primary" | "default" | "inherit" | "secondary";
  className?: string;
  autoFocus?: boolean;
}
function ActionButton(props: Props): JSX.Element {
  const {
    onClick,
    disabledLoading,
    submitLoading,
    icon,
    label,
    variant,
    size,
    color,
    className,
    autoFocus
  } = props;

  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabledLoading || submitLoading}
      size={size || "small"}
      className={"focus:ring-2 focus:ring-white " + className}
      autoFocus={autoFocus || false}
      disableRipple
    >
      {submitLoading ? (
        <CircularProgress size={20} />
      ) : (
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
      )}
    </Button>
  );
}

export default ActionButton;
