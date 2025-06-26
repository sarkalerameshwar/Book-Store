import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

let Books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/books", (req, res) => {
  res.json(Books);
  console.log(Books);
});

app.post("/books", (req, res) => {
  try {
    const { id, title, author } = req.body;
    // if (!id || !title || !author) {
    //   return res.status(400).json({ message: "Please fill all fields" });
    // }
    Books.push({ id, title, author });
    res.send(`Book added successfully`);
  } catch (err) {
    res.status(400).json("Error occured while adding the book.");
  }
});

app.put("/books/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { title, author } = req.body;

    const index = Books.findIndex((book) => book.id == id);
    if (index !== -1) {
      Books[index].title = title;
      Books[index].author = author;
      res.send(`Book updated successfully`);
    }
  } catch (err) {
    res.send("No books are found with this id");
  }
});

app.delete("/books/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = Books.findIndex((book) => book.id == id);
    if (index !== -1) {
      Books.splice(index, 1);
      res.send("Books deleted successfully");
    }
  } catch (err) {
    res.send("No books are found with this id");
  }
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
