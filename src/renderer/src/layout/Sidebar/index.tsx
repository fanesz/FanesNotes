import NoteCard from "./partials/NoteCard";
import useNoteList from "@renderer/layout/Sidebar/hooks/useNoteList";
import { useNoteContext } from "@renderer/context";
import { Tooltip } from "@material-ui/core";
import {
  Add,
  SaveAlt,
  Search,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import { Note } from "@renderer/common/type";
import SearchBar from "./partials/SearchBar";
import DraggableList, {
  DragPoint
} from "@renderer/common/components/Dragabble";
import Popover from "@renderer/common/components/Popover";
import useMainMenu from "@renderer/layout/Sidebar/hooks/useMainMenu";
import NoData from "@renderer/common/components/Text/NoData";

function Sidebar(): JSX.Element {
  const { state } = useNoteContext();
  const { handleAddNote, handleDragNotes } = useNoteList();
  const { handleShowHideSidebar, handleExportAllNotes } = useMainMenu();

  const renderNotes = (note: Note, dragPoint: DragPoint): JSX.Element => (
    <div {...dragPoint}>
      <NoteCard note={note} selectedNoteId={state.selectedNoteId} />
    </div>
  );

  return (
    <div
      className={`flex flex-col gap-1 h-screen ${state.showSidebar ? "w-1/4" : "w-fit"}`}
    >
      <div className={state.showSidebar ? "px-2 py-1" : "px-1 ps-2 pt-1"}>
        <div
          className={`flex gap-3 py-1 px-2 border border-zinc-600 bg-gray-100/20 rounded-md ${!state.showSidebar && "flex-col"}`}
        >
          <Tooltip
            title={state.showSidebar ? "Hide Sidebar" : "Show Sidebar"}
            placement={state.showSidebar ? "bottom" : "right"}
          >
            <div onClick={handleShowHideSidebar} className="cursor-pointer">
              {state.showSidebar ? <Visibility /> : <VisibilityOff />}
            </div>
          </Tooltip>
          <Popover
            buttonComponent={
              <Tooltip
                title="Search Notes"
                placement={state.showSidebar ? "bottom" : "right"}
              >
                <Search className="cursor-pointer" />
              </Tooltip>
            }
            position={state.showSidebar ? "bottom" : "right"}
          >
            <SearchBar />
          </Popover>
          <Tooltip
            title="Export All Notes"
            placement={state.showSidebar ? "bottom" : "right"}
          >
            <SaveAlt
              className="cursor-pointer"
              onClick={handleExportAllNotes}
            />
          </Tooltip>
          <Tooltip
            title="Add Note"
            placement={state.showSidebar ? "bottom" : "right"}
          >
            <Add className="cursor-pointer" onClick={handleAddNote} />
          </Tooltip>
        </div>
      </div>
      {state.searchValue && state.showSidebar ? (
        <div className="px-2 text-xs">
          Result of{" "}
          <span className="border border-zinc-800/30 rounded bg-gray-700/60 px-0.5 text-gray-200">
            {state.searchValue}
          </span>
          :
        </div>
      ) : null}
      {state.showSidebar ? (
        <div className="px-2 overflow-y-auto max-h-[90vh] h-full">
          {state.searchValue && state.filteredNotes.length === 0 ? (
            <NoData message="No Notes Found..." />
          ) : (
            <DraggableList
              items={
                state.filteredNotes.length !== 0
                  ? state.filteredNotes
                  : state.notes
              }
              renderItem={renderNotes}
              onItemDrag={handleDragNotes}
              liClassName="mb-2"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Sidebar;
