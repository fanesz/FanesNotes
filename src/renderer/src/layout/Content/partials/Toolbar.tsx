import { Tooltip } from "@material-ui/core";
import {
  Assignment,
  Delete,
  FormatListBulleted,
  Save
} from "@material-ui/icons";
import ConfirmDeleteDialog from "@renderer/common/components/Dialog/ConfirmDeleteDialog";
import useToolBar from "@renderer/layout/Content/hooks/useToolBar";
import { useNoteContext } from "@renderer/context";
import useNoteList from "@renderer/layout/Sidebar/hooks/useNoteList";

interface Props {
  className?: string;
  selectedNoteId?: string;
}
function ToolBar(props: Props): JSX.Element {
  const { state } = useNoteContext();
  const {
    handleDeleteNote,
    handleAddTodo,
    handleExportNote,
    handleAddCopyable
  } = useToolBar();
  const { handleOpenModal, handleCloseModal } = useNoteList();

  const toolBarList = [
    {
      title: "Delete Note",
      icon: <Delete />,
      onClick: () => handleOpenModal("deleteNoteConfirm")
    },
    {
      title: "Todo List",
      icon: <FormatListBulleted />,
      onClick: () => handleAddTodo()
    },
    {
      title: "Copyable Section",
      icon: <Assignment />,
      onClick: () => handleAddCopyable()
    },
    {
      title: "Export Note",
      icon: <Save />,
      onClick: () => handleExportNote()
    }
  ];

  return (
    <div className={props.className}>
      <div className="flex flex-col gap-2 border border-gray-400/40 rounded-md py-2 bg-zinc-800/50">
        {toolBarList.map((tool, index) => (
          <div className="px-2 text-right" key={index}>
            <Tooltip title={tool.title} placement="left">
              <div className="cursor-pointer" onClick={tool.onClick}>
                {tool.icon}
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
      {state.isModalOpen.deleteNoteConfirm ? (
        <ConfirmDeleteDialog
          open={state.isModalOpen.deleteNoteConfirm}
          onClose={() => handleCloseModal("deleteNoteConfirm")}
          onClickDelete={() => handleDeleteNote(props.selectedNoteId || "")}
        />
      ) : null}
    </div>
  );
}

export default ToolBar;
