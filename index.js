import pg from "pg"
import express from "express"
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

let books=[{id: 1, title: "Can't Hurt Me", author: "David Goggins", rating: 5, review: "If you're someone who strives to master your mind, I highly recommend Can't Hurt Me as a case study in the measures one man took to master his own mind and achieve uncommon levels of excellence.", date_read: '2024-06-18', isbn: '9781544512273'}];

app.get("/", async (req,res)=>{
    res.render("index.ejs", {
        books: books,
    });
});

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});
    
