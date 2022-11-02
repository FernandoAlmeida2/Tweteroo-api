import express from "express";
import cors from "cors";

const app = express();
const users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
];
const tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "mentira nem amo",
  },
  {
    username: "bobesponja",
    tweet: "prefiro ser essa metamorfose ambulante",
  },
];

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sign-up", function (req, res) {
  const username = req.body.username;
  const avatar = req.body.avatar;
  if (avatar.length === 0 || username.length === 0) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    users.push({ username, avatar });
    console.log(users);
    res.status(201).send("OK");
  }
});

app.post("/tweets", function (req, res) {
  const username = req.body.username;
  const tweet = req.body.tweet;
  if (tweet.length === 0 || username.length === 0) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweets.push({ username, tweet });
    res.status(201).send("OK");
  }
});

app.get("/tweets", (req, res) => {
  const lastTenTweets = [];
  for (let i = 1; i <= 10; i++) {
    if (tweets.length - i < 0) {
      break;
    }
    lastTenTweets.push({
      username: tweets[tweets.length - i].username,
      avatar: users.filter(
        (u) => u.username === tweets[tweets.length - i].username
      )[0].avatar,
      tweet: tweets[tweets.length - i].tweet,
    });
  }
  res.send(lastTenTweets);
});

app.get("/tweets/:USERNAME", (req, res) => {
  const username = req.params.USERNAME;
  const avatar = users.filter((u) => u.username === username)[0].avatar;
  const allTweetsUser = [];
  tweets.filter((t) => t.username === username);
  tweets.forEach((t) => {
    allTweetsUser.push({
      username: t.username,
      avatar,
      tweet: t.tweet,
    });
  });
  res.send(allTweetsUser);
});

app.listen(5000);
