import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const post = 3000;

let referer = "";

let listHeader = "";

app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const todo1 = new Item({
  name: "Welcome to your todo list",
});
const todo2 = new Item({
  name: "Hit the + button to add a new item",
});
const todo3 = new Item({
  name: "<-- Click this to mark items completed and remove them from list",
});

const defaultItems = [todo1, todo2, todo3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

let navBarList = List.distinct("name").exec();

// Home route
app.get("/", async (req, res) => {
  referer = req.url;
  listHeader = "All tasks:";

  const toDoList = await Item.find({});

  if (toDoList.length === 0) {
    await Item.insertMany(defaultItems);

    res.redirect(referer);
  } else {
    res.render("index.ejs", {
      toDoList: toDoList,
      listHeader: listHeader,
      navBarList: navBarList,
    });
  }
});

// Submit Items route
app.post("/submit", async (req, res) => {
  const newToDo = new Item({
    name: req.body.newToDo,
  });

  if (referer === "/") {
    try {
      await newToDo.save();

      console.log("Item added successfully.");
    } catch (err) {
      console.log("Error while adding item:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    try {
      await List.findOneAndUpdate(
        { name: referer.substring(1) },
        { $push: { items: newToDo } }
      );
      console.log("Item added successfully.");
    } catch (err) {
      console.log("Error while adding item:", err);
      res.status(500).send("Internal Server Error");
    }
  }
  res.redirect(referer);
});

// Delete Items route
app.post("/delete", async (req, res) => {
  if (referer === "/") {
    try {
      if (req.body.checkbox) {
        const result = await Item.deleteOne({ _id: req.body.itemId });
      }
    } catch (err) {
      console.error("Error while deleting item:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    try {
      if (req.body.checkbox) {
        const result = await List.findOneAndUpdate(
          { name: referer.substring(1) },
          { $pull: { items: { _id: req.body.itemId } } }
        );
        console.log(result);
      }
    } catch (err) {
      console.error("Error while deleting item:", err);
      res.status(500).send("Internal Server Error");
    }
  }
  res.redirect(referer);
});

app.get("/:customListName", async (req, res) => {
  referer = req.url;
  const customListName = req.params.customListName;

  try {
    const result = await (async () => {
      let existingList = await List.findOne({ name: customListName });
      if (!existingList) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        await list.save();
        return list;
      }
      return existingList;
    })();
    res.render("index.ejs", {
      toDoList: result.items,
      listHeader: result.name,
      navBarList: await navBarList,
    });
  } catch (err) {
    console.error("Error while searching for list");
    res.status(500).send("Internal Server Error");
  }
});

app.listen(post, () => {
  console.log(`App listening on port ${post}`);
});
