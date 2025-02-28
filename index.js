import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

//add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (_, res) => {
  res.send(teaData).status(200);
});

//get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = findTea(req);
  if (!tea) {
    teaNotFound(res);
  }
  res.send(tea).status(200);
});

//update tea

app.put("/teas/:id", (req, res) => {
  const tea = findTea(req);

  if (!tea) {
    teaNotFound(res);
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(tea).status(200);
});

//delete tea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    teaNotFound(res);
  }
  teaData.splice(index, 1);
  return res.send("deleted").status(204);
});

function teaNotFound(response) {
  return response.send("tea not found").status(404);
}

function findTea(request) {
  return teaData.find((t) => t.id === parseInt(request.params.id));
}

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
