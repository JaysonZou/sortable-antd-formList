import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Input, Button, Form } from "antd";

const SForm2 = (props) => {
  const [data, setData] = useState([
    "Write a cool JS library",
    "Make it generic enough",
    "Write README",
  ]);

  return <QuoteList quotes={data} setData={setData} />;
};

function Quote({ quote, index }) {
  return (
    <div>
      <span>{quote.name}</span>
      <Form.Item name="text" {...quote}>
        <Input />
      </Form.Item>
    </div>
  );
}

const QuoteList = ({ quotes, setData }) => {
  return (
    <Form.List name="array" initialValue={quotes}>
      {(fields, { add, move }) => {
        console.log("f", fields);
        return (
          <Form.Item>
            <ReactSortable
              list={fields}
              setList={setData}
              onEnd={({ newIndex, oldIndex }) => {
                move(oldIndex, newIndex);
              }}
            >
              {fields.map((field, i) => (
                <Quote quote={field} index={i} key={field.fieldKey} />
              ))}
            </ReactSortable>

            <Form.Item>
              <Button onClick={() => add()}>Add</Button>
            </Form.Item>
          </Form.Item>
        );
      }}
    </Form.List>
  );
};

export default SForm2;
