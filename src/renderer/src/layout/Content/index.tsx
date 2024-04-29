import { useNoteContext } from "@renderer/context";
import useNoteDetails from "@renderer/layout/Content/hooks/useNoteDetails";
import { useEffect } from "react";
import TodoItem from "./partials/TodoItem";
import { Note, Todo } from "@renderer/common/type";
import CopyableItem from "./partials/CopyableItem";

import DraggableList, {
  DragPoint
} from "@renderer/common/components/Dragabble";
import { DragIndicator } from "@material-ui/icons";
import {
  filterBadNote,
  filterBadState,
  filterDuplicateIDs
} from "@renderer/common/utils/stateFilter";
import { backupOnClose } from "@renderer/common/utils/fileHandler";
import ToolBar from "./partials/Toolbar";
import NoteInfo from "./partials/NoteInfo";
import useTodoList from "./hooks/useTodoList";

function Content(): JSX.Element {
  const { state, setState } = useNoteContext();
  const { handleInputNote, handleKeyDown } = useNoteDetails();
  const { handleDragTodos } = useTodoList();
  const selectedNote =
    state.notes.find((note) => note.id === state.selectedNoteId) ||
    ({} as Note);

  useEffect(() => {
    const previousData = localStorage.getItem("FanesNotes");
    if (previousData) {
      const parsedData = JSON.parse(previousData);
      setState(filterDuplicateIDs(filterBadNote(filterBadState(parsedData))));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("FanesNotes", JSON.stringify(state));
  }, [state]);

  window.addEventListener("beforeunload", () => {
    backupOnClose(state);
  });

  const renderTodos = (todo: Todo, dragPoint: DragPoint): JSX.Element => (
    <div className="flex -ms-1">
      <div {...dragPoint} className="mt-1">
        <DragIndicator fontSize="small" className="text-zinc-600" />
      </div>
      <div className="w-full">
        <TodoItem todo={todo} />
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen bg-zinc-900/50 shadow-[inset_0_-2px_4px_rgba(200,200,200,0.3)] p-3 rounded-md flex flex-col ${state.showSidebar ? "w-3/4" : "w-full"}`}
    >
      <div className="flex justify-between">
        <div className="border-b-2 border-white border-opacity-20 w-4/6">
          <input
            className="focus:outline-none bg-transparent w-full"
            placeholder="Title..."
            value={selectedNote?.title || ""}
            onChange={(e) => handleInputNote("title", e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="mt-auto">
          <NoteInfo selectedNote={selectedNote} />
        </div>
      </div>

      <div className="flex mt-2 h-full overflow-auto ps-1">
        <div className="w-full overflow-y-auto">
          <div className="overflow-y-auto">
            <DraggableList
              items={selectedNote?.todos || []}
              renderItem={renderTodos}
              onItemDrag={handleDragTodos}
            />
          </div>
          <div className="mt-2">
            {selectedNote?.copyable?.map((item) => (
              <CopyableItem key={item.id} copyable={item} />
            ))}
          </div>
          <textarea
            className="h-full w-full bg-transparent text-sm focus:outline-none resize-none"
            placeholder="Start Typing..."
            value={selectedNote?.content || ""}
            onChange={(e) => handleInputNote("content", e.target.value || "")}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoFocus
          />
        </div>
        <div>
          <ToolBar selectedNoteId={selectedNote?.id || ""} />
        </div>
      </div>
    </div>
  );
}

export default Content;
