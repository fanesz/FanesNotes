import { Checkbox, TextareaAutosize } from "@material-ui/core";
import useTodoList from "@renderer/layout/Content/hooks/useTodoList";
import { Todo } from "@renderer/common/type";

interface Props {
  className?: string;
  todo: Todo;
}
function TodoItem(props: Props): JSX.Element {
  const { handleInputTodos, handleDeleteTodo } = useTodoList();
  const { className, todo } = props;

  return (
    <div className={"flex " + className}>
      <div className="me-1">
        <Checkbox
          size="small"
          color="default"
          style={{ color: "white", paddingTop: 7.5, paddingLeft: 5, paddingRight: 5}}
          value={todo.isCompleted}
          checked={todo.isCompleted}
          onClick={(e) =>
            handleInputTodos(
              "isCompleted",
              todo.id,
              (e.target as HTMLInputElement).checked
            )
          }
        />
      </div>
      <div className="w-full mt-1 flex">
        <TextareaAutosize
          value={todo.content}
          spellCheck={false}
          className={`w-full h-full pb-1.5 pt-1 bg-transparent focus:outline-none resize-none text-sm ${todo.isCompleted ? "line-through text-gray-400" : "text-white"}`}
          onChange={(e) => handleInputTodos("content", todo.id, e.target.value)}
          onKeyDown={(e) => handleDeleteTodo(e.key, todo.id)}
        />
      </div>
    </div>
  );
}

export default TodoItem;
