import { createTheme } from "@material-ui/core";

const fanesNotesTheme = createTheme({
  palette: {
    primary: {
      main: "#37373784"
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        "&.MuiTooltip-tooltip": {
          "&.MuiTooltip-tooltipPlacementBottom": {
            marginTop: "6px"
          },
          "&.MuiTooltip-tooltipPlacementTop": {
            marginBottom: "6px"
          },
          "&.MuiTooltip-tooltipPlacementLeft": {
            marginRight: "7px"
          },
          "&.MuiTooltip-tooltipPlacementRight": {
            marginLeft: "7px"
          }
        }
      }
    }
  }
});

export default fanesNotesTheme;
