import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
let post = [];
let category = "Business";
// const post = [...Array(9)]; //for copying each index of array and pasting it in the post array.
post.push({
  postTitle: "Manga",
  day: "19",
  month: "9",
  year: "2024",
  longDescription:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  id: "0",
  category: "Business",
});
app.post("/submit", (req, res) => {
  const postTitle = req.body.postTitle;
  const category = req.body.category;
  const d = new Date();
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  let longDescription = req.body.description;
  let id = post.length;
  let updateFlag = false;
  post.push({
    postTitle,
    day,
    month,
    year,
    longDescription,
    id,
    category,
    updateFlag,
  });
  let selectedCategory = post.category;
  console.log(category);
  res.redirect(`/post/${category}`);
});

app.get("/viewPost/:category/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  let selectedPost = post[id];
  res.render("viewPost.ejs", { post: selectedPost });
});

app.get("/post/:category", (req, res) => {
  let requiredCategory = [];
  let { category } = req.params;
  requiredCategory = post.filter((item) => {
    //post.filter loops the entire array and selects only items that meets the condition
    return item.category === category;
  });
  res.render("index.ejs", { post: requiredCategory, category: category });
});

app.put("/updatePost", (req, res) => {
  console.log("Before update: ");
  console.log(post);
  let selectedPost = post[req.body.id];
  const postTitle = req.body.postTitle;
  const category = req.body.category;
  let id = req.body.id;
  const d = new Date();
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  let longDescription = req.body.description;
  let updateFlag = false;
  selectedPost = {
    postTitle,
    day,
    month,
    year,
    longDescription,
    id,
    category,
    updateFlag,
  };
  post.splice(req.body.id, 1, selectedPost);
  console.log("After Update: ");
  console.log(post);
  res.redirect(`/post/${category}`);
});

app.get("/updatePost/:category/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  let selectedPost = post[id];
  selectedPost.updateFlag = true;
  res.render("form.ejs", { post: selectedPost });
});

app.delete("/deletePost/:category/:id", (req, res) => {
  let { id } = req.params;
  let { category } = req.params;
  id = Number(id);
  post.splice(id, 1);
  res.redirect(`/post/${category}`);
});

app.get("/createPost", (req, res) => {
  res.render("form.ejs", { post: post });
});

app.get("/", (req, res) => {
  res.render("index.ejs", { post: post, category: category });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
