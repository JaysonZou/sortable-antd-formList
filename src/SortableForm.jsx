import { Input, Button, Form } from "antd";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.fieldKey.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>{quote.name}</span>
          <Form.Item name="text" {...quote}>
            <Input />
          </Form.Item>
        </div>
      )}
    </Draggable>
  );
}

const QuoteList = ({ quotes, setData }) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result, move) {
    if (!result.destination) {
      return;
    }
    move(result.source.index, result.destination.index);
    const newQ = reorder(quotes, result.source.index, result.destination.index);

    console.log(newQ);

    setData({ newQ });
  }

  return (
    <Form.List name="list" initialValue={quotes}>
      {(fields, { add, move }) => {
        console.log("f", fields);
        return (
          <Form.Item>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, move)}>
              <Droppable droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <>
                      {fields.map((field, i) => (
                        <Quote quote={field} index={i} key={field.fieldKey} />
                      ))}
                      <Form.Item>
                        <Button onClick={() => add()}>Add</Button>
                      </Form.Item>
                    </>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Form.Item>
        );
      }}
    </Form.List>
  );
};

const CustomForm = () => {
  const [data, setData] = useState([
    "Write a cool JS library",
    "Make it generic enough",
    "Write README",
  ]);

  return <QuoteList quotes={data} setData={setData} />;
};

export default CustomForm;
