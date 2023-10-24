import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import Form from "./components/Form";
import { useState } from "react";

export default function App() {
  const [noteItems, setNoteItems] = useState([]);

  const addItems = (newItem) => {
    setNoteItems((prevItems) => {
      return [...prevItems, newItem];
    });
  };

  const deleteItem = (id) => {
    setNoteItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header title="Keeper" />
      <Form addItems={addItems} />
      {noteItems.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          deleteItem={deleteItem}
        />
      ))}
      <Footer />
    </>
  );
}
