import { MuiThemeProvider, TextField, createTheme } from "@material-ui/core";
import useDebouncer from "@renderer/common/hooks/useDebouncer";
import { useNoteContext } from "@renderer/context";
import useMainMenu from "@renderer/layout/Sidebar/hooks/useMainMenu";
import { useEffect } from "react";

interface Props {
  className?: string;
}
function SearchBar(props: Props): JSX.Element {
  const { state } = useNoteContext();
  const { handleSearchNote, handleSortNote } = useMainMenu();

  const debouncedValue = useDebouncer(state.searchValue, 300);

  useEffect(() => {
    handleSortNote(debouncedValue);
  }, [debouncedValue]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#E6E6E6"
      }
    },
    overrides: {
      MuiInput: {
        underline: {
          "&:before": {
            borderBottomColor: "#C0C0C0"
          },
          "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottomColor: "#E4E4E4"
          }
        },
        input: {
          color: "#FDFDFD",
          "&::placeholder": {
            color: "white",
            opacity: 0.6,
            fontSize: "0.9rem"
          },
          fontSize: "0.9rem"
        }
      }
    }
  });

  return (
    <div className={props.className}>
      <div className="border rounded-md bg-zinc-700/90 p-1 px-2">
        <MuiThemeProvider theme={theme}>
          <TextField
            value={state.searchValue || ""}
            onChange={(e) => handleSearchNote(e.target.value)}
            spellCheck="false"
            placeholder="Search Note..."
            autoFocus
            // className="bg-transparent placeholder:text-gray-300 pt-2 px-1 focus:outline-none text-sm text-white"
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
}

export default SearchBar;
