import { Popover as MUIPopover } from "@material-ui/core";
import { useState } from "react";

interface Props {
  renderButton?: () => JSX.Element;
  buttonComponent?: JSX.Element;
  children: JSX.Element;
  position: "bottom" | "right";
}
function Popover(props: Props): JSX.Element {
  const { renderButton, children, buttonComponent, position } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "date-range-v2-popover" : undefined;

  const anchorPosition: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  } =
    position === "bottom"
      ? {
          vertical: "bottom",
          horizontal: "left"
        }
      : {
          vertical: "top",
          horizontal: "right"
        };

  return (
    <div>
      <div aria-describedby={id} onClick={handleClick}>
        {(renderButton && renderButton()) || buttonComponent}
      </div>
      <MUIPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorPosition.vertical,
          horizontal: anchorPosition.horizontal
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent"
          }
        }}
      >
        {children}
      </MUIPopover>
    </div>
  );
}

export default Popover;
