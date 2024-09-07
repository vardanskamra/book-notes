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
    let result = await db.query("SELECT * FROM library ORDER BY rating DESC");
    books = result.rows;
    res.render("index.ejs", {
        books: books,
    });
});

app.get("/admin-login", async (req,res)=>{
    res.render("admin_login.ejs");
});

app.post("/admin", async (req,res)=>{
    if (req.body.username == process.env.ADMIN_USERNAME && req.body.password == process.env.ADMIN_PASSWORD){
        let result = await db.query("SELECT * FROM library ORDER BY date_read DESC");
        books = result.rows;
        res.render("admin.ejs", {
        books: books,
    });
    } else{
        res.redirect("/admin-login");
    }
});

app.get("/book/:id", async (req, res)=>{

    try{
        const result = await db.query("SELECT * FROM library WHERE id=$1", [parseInt(req.params.id)]);
        if (result.rows.length > 0){
            res.render("book.ejs", {
            book: result.rows[0],
         });
        } else{
            res.redirect("/");
        }
    } catch(err){
        console.log(err);
        res.redirect("/")
    }
});

app.get("/new", (req, res)=>{
    res.render("new.ejs", {
        act: "Add",
    });
});

app.get("/edit/:id", async (req, res)=>{
    try{
        const result = await db.query("SELECT * FROM library WHERE id=$1", [parseInt(req.params.id)]);
        if (result.rows.length > 0){
            res.render("new.ejs", {
                act: "Edit", 
                book: result.rows[0],
            });
        } else{
            res.redirect("/");
        }
    } catch(err){
        console.log(err);
        res.redirect("/");
    }   
});

app.post("/delete/:id", async (req, res)=>{
    try{
        const deleted_title = await db.query("DELETE FROM library WHERE id=$1 RETURNING title", [parseInt(req.params.id)]);
        console.log("Deleted: ", deleted_title.rows[0].title);
        let result = await db.query("SELECT * FROM library");
        books = result.rows;
        res.render("admin.ejs", {
            books: books,
        });
    } catch(err){
        console.log(err);
        res.render("admin.ejs", {
            books: books,
        });
    }
});

app.post("/add", async (req, res)=>{
    
    try{
        await db.query("INSERT INTO library(title, author, rating, review, date_read, isbn) VALUES ($1, $2, $3, $4, $5, $6)", 
            [req.body.title, req.body.author, parseInt(req.body.rating), req.body.review, req.body.date_read, req.body.isbn]);
        let result = await db.query("SELECT * FROM library");
        books = result.rows;
        res.render("admin.ejs", {
            books: books,
        });
    } catch(err){
        console.log(err);
        res.render("admin.ejs", {
            books: books,
        });
    }

});

app.post("/edit", async (req, res)=>{
    console.log(req.body);
    try{
        await db.query("UPDATE library SET (title, author, rating, review, date_read, isbn) = ($1, $2, $3, $4, $5, $6) WHERE id=$7", 
            [req.body.title, req.body.author, parseInt(req.body.rating), req.body.review, req.body.date_read, req.body.isbn, parseInt(req.body.id)]);
        let result = await db.query("SELECT * FROM library");
        books = result.rows;
        res.render("admin.ejs", {
            books: books,
        });
    } catch(err){
        console.log(err);
        res.render("admin.ejs", {
            books: books,
        });
    }

});

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});
    
