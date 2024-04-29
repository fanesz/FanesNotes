import { Tooltip } from "@material-ui/core";
import { Assignment, Edit } from "@material-ui/icons";
import { Note } from "@renderer/common/type";
import {
  parseDateFromNow,
  parseDateTime
} from "@renderer/common/utils/dateParser";

interface Props {
  selectedNote: Note;
}
function NoteInfo(props: Props): JSX.Element {
  const { selectedNote } = props;

  const noteInfoDetails = [
    {
      title: "Characters",
      value: selectedNote?.content?.match(/[a-zA-Z]/g)?.length || 0
    },
    {
      title: "Words",
      value: selectedNote?.content?.split(/\b[A-Za-z]+\b/g).length - 1 || 0
    },
    {
      title: "Symbols",
      value: selectedNote?.content?.match(/[^a-zA-Z0-9\s]/g)?.length || 0
    },
    { title: "Lines", value: selectedNote?.content?.split("\n").length || 0 },
    { title: "Tasks", value: selectedNote?.todos?.length || 0 },
    { title: "Copyables", value: selectedNote?.copyable?.length || 0 }
  ];

  return (
    <div className="flex me-1">
      <div className="text-xs h-fit text-gray-300">
        <Tooltip
          title={
            <div className="flex flex-col">
              {noteInfoDetails
                .filter((info) => info.value !== 0)
                .map((item, index) => (
                  <span key={index}>
                    {item.value} {item.title}
                  </span>
                ))}
            </div>
          }
        >
          <div className="text-xs h-fit">
            <Assignment
              style={{
                width: 14,
                height: 14,
                color: "gray",
                marginBottom: 2
              }}
            />
            <span className="ms-0.5 text-gray-300">
              {selectedNote?.content?.match(/[a-zA-Z]/g)?.length || 0} Chars
            </span>
          </div>
        </Tooltip>
      </div>
      <span className="mx-2 text-xs">|</span>
      <Tooltip title={parseDateTime(selectedNote?.updatedAt)}>
        <div className="text-xs h-fit">
          <Edit
            style={{
              width: 14,
              height: 14,
              color: "gray",
              marginBottom: 2
            }}
          />
          <span className="ms-1 text-gray-300">
            {parseDateFromNow(selectedNote?.updatedAt)}
          </span>
        </div>
      </Tooltip>
    </div>
  );
}

export default NoteInfo;
