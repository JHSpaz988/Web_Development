import PropTypes from "prop-types";
import { useState } from "react";

const Form = ({ addItems }) => {
  const [inputText, setInputText] = useState({ title: "", note: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputText({ ...inputText, [name]: value });
  };

  return (
    <div className="note input">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={inputText.title}
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="note"
        placeholder="Take a note..."
        value={inputText.note}
        onChange={handleChange}
      ></input>
      <button
        onClick={() => {
          const newItem = {
            id: Date.now(),
            title: inputText.title,
            content: inputText.note,
          };
          addItems(newItem);
          setInputText({ title: "", note: "" });
        }}
      >
        Add
      </button>
    </div>
  );
};

Form.propTypes = {
  addItems: PropTypes.func.isRequired,
};

export default Form;
