import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvidedDragHandleProps
} from "react-beautiful-dnd";

interface Item {
  id: string;
}

type DragPoint = DraggableProvidedDragHandleProps | null | undefined;

interface Props<T extends Item> {
  items: T[];
  renderItem: (item: T, dragHandleProps: DragPoint) => React.ReactNode;
  onItemDrag: (updatedItems: T[]) => void;
  liClassName?: string;
}

const DraggableList = <T extends Item>(props: Props<T>): JSX.Element => {
  const { items, renderItem, onItemDrag, liClassName } = props;

  const handleOnDragEnd = (result: DropResult): void => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    onItemDrag(updatedItems as T[]);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="genericList">
        {(provided) => (
          <ul
            className="generic-list overflow-y-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <div key={item.id}>
                <Draggable draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      className={liClassName}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      {renderItem(item, provided.dragHandleProps)}
                    </li>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
export type { DragPoint };
