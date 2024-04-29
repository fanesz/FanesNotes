import Content from "./layout/Content";
import Sidebar from "./layout/Sidebar";
import { NotesProvider } from "./context";
import { MuiThemeProvider } from "@material-ui/core";
import fanesNotesTheme from "./theme";

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={fanesNotesTheme}>
      <NotesProvider>
        <div className="h-full flex">
          <Sidebar />
          <Content />
        </div>
      </NotesProvider>
    </MuiThemeProvider>
  );
}

export default App;
