import { TextareaAutosize, Tooltip } from "@material-ui/core";
import { Check, Error, FileCopy } from "@material-ui/icons";
import useCopyable from "@renderer/layout/Content/hooks/useCopyable";
import { Copyable } from "@renderer/common/type";

interface Props {
  className?: string;
  copyable: Copyable;
}
function CopyableItem(props: Props): JSX.Element {
  const {
    copying,
    handleInputCopyable,
    handleCopyToClipboard,
    handleDeleteCopyable
  } = useCopyable();
  const { className, copyable } = props;

  const copyIconByState = {
    Copy: <FileCopy style={{ fontSize: "1rem" }} />,
    Copied: <Check style={{ fontSize: "1rem" }} />,
    Failed: <Error style={{ fontSize: "1rem" }} />
  };

  return (
    <div className={"flex me-3 mb-3 " + className}>
      <div className="relative w-full my-auto flex">
        <TextareaAutosize
          minRows={2}
          className="w-full bg-transparent border rounded-md p-1 px-2 focus:outline-none resize-none text-sm"
          value={copyable.content}
          onChange={(e) =>
            handleInputCopyable(copyable.id, e.target.value || "")
          }
          onKeyDown={(e) => handleDeleteCopyable(e.key, copyable.id)}
        />
        <div
          className="absolute right-0 -top-1"
          onClick={() => handleCopyToClipboard(copyable.content)}
        >
          <Tooltip title={copying} placement="top" className="cursor-pointer">
            {copyIconByState[copying]}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default CopyableItem;
