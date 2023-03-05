import express from "express";

const app = express();
const PORT = 5100;
const users = [
  {
    name: "Stefan",
    age: 17,
    gender: "male",
  },
  {
    name: "Kristina",
    age: 15,
    gender: "female",
  },
  {
    name: "Anya",
    age: 25,
    gender: "female",
  },
  {
    name: "Elizaveta",
    age: 16,
    gender: "female",
  },
  {
    name: "Kokos",
    age: 20000,
    gender: "mixed",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5100, () => {
  console.log(`Server has started on port: ${PORT}`);
});

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

app.get("/users/:userID", (req, res) => {
  const { userID } = req.params;

  if (+userID > users.length) {
    res.status(404).json({
      message: "Not found",
    });
  } else {
    const user = users[+userID];
    res.status(200).json(user);
  }
});

app.post("/users", (req, res) => {
  const body = req.body;
  if (body.name.length > 2 && body.age >= 0) {
    users.push(body);
    res.status(200).json({
      message: "User Created.",
    });
  } else {
    res.status(418).json({
      message: "ERROR! User name must be > 2 and User age must be >= 0",
    });
  }
});

app.put("/users/:userID", (req, res) => {
  const { userID } = req.params;
  const updatedUser = req.body;

  if (+userID > users.length) {
    res.status(404).json({
      message: "Not found",
    });
  } else {
    users[+userID] = updatedUser;
    res.status(200).json({
      message: "User is updated",
      data: users[+userID],
    });
  }
});

app.delete("/users/:userID", (req, res) => {
  const { userID } = req.params;

  if (+userID > users.length) {
    res.status(404).json({
      message: "Not found",
    });
  } else {
    users.splice(+userID, 1);
    res.status(200).json({
      message: "User has been deleted.",
    });
  }
});
