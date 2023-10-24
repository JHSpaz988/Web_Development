import PropTypes from "prop-types";

const Note = ({ id, title, content, deleteItem }) => (
  <>
    <div className="note" id={id}>
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => deleteItem(id)}>Delete</button>
    </div>
  </>
);

Note.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default Note;
