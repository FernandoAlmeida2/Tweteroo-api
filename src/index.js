import express, { application } from "express";
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

/* app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/users', function(req, res) {
    const user_id = req.body.id;
    const token = req.body.token;
    const geo = req.body.geo;
  
    res.send({
      'user_id': user_id,
      'token': token,
      'geo': geo
    });
  }); */

app.get("/tweets", (req, res) => {
  const lastTenTweets = [];
  for (let i = 1; i <= 10; i++) {
    if (tweets.length - i < 0) {
      break;
    }
    lastTenTweets.unshift({
      username: tweets[tweets.length - i].username,
      avatar: users.filter(
        (u) => u.username === tweets[tweets.length - i].username
      )[0].avatar,
      tweet: tweets[tweets.length - i].tweet,
    });
  }
  res.send(lastTenTweets);
});

app.listen(5000);
