//frame work
const { response } = require("express");
const express=require("express")
//Database
const database = require("./database/index");
//Initializing express
const shapeai=express();

//configurations

shapeai.use(express.json());

/* 
Route      /
Description   get all books
Access        public
Parameters    NULL
Method        get
*/

shapeai.get("/",(req,res) =>{
  return res.json({books: database.books});
});
/* 
Route         /
Description   get specific book based on isbn
Access        public
Parameters    isbn
Method        get
*/
shapeai.get("/is/:isbn",(req,res)=>{
  const getSpecificBook = database.books.filter((book) => book.ISBN===req.params.isbn);
  if(getSpecificBook.length===0){
    return res.json({error:`No book found for the ISBN of ${req.params.isbn}`,
    
  });
}
  return res.json({book:getSpecificBook});
})
/* 
Route         /c
Description   get specific book based on category
Access        public
Parameters    category
Method        get
*/
shapeai.get("/c/:category",(req,res) =>{
  const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category));
  if(getSpecificBooks.length===0){
    return res.json({error:`No book found for the category of ${req.params.category}`,
    
  });
}
  return res.json({book:getSpecificBooks});
})
/* 
Route         /author
Description   get all authors
Access        public
Parameters    category
Method        get
*/
shapeai.get("/author",(req,res) =>{
  return res.json({authors: database.authors});
});
/* 
Route         /author
Description   get list of authors based on book isbn
Access        public
Parameters    isbn 
Method        get
*/
shapeai.get("/author/:isbn",(req,res)=>
{
  const getSpecificAuthors = database.authors.filter((author) =>author.books.includes(req.params.isbn)
  );
  if(getSpecificAuthors.length==0){
    return res.json({
      error:`No author found for the book ${req.params.isbn}`,
    });
  }
  return res.json({authors: getSpecificAuthors});
});

/* 
Route         /book/new
Description   add new book
Access        public
Parameters    none
Method        POST
*/

shapeai.post("/book/new",(req,res) => {
  const { newBook }   = req.body;

  database.books.push(newBook);
  return res.json({books: database.books, message:"book was added"});
});
/* 
Route         /author/new
Description   add new author
Access        public
Parameters    none
Method        POST
*/

shapeai.post("/author/new",(req,res)=>{
  const { newAuthor } =req.body;
  database.authors.push(newAuthor);
  return res.json({authors: database.authors, message:"Author was added"});
});

/* 
Route         /book/update/:title
Description   update title of a book
Access        public
Parameters    isbn
Method        PUT
*/

shapeai.put("/book/update/:isbn",(req,res) =>{
  // forEach directly modifies the array
  database.books.forEach((book) => {
    if(book.ISBN=== req.params.isbn){
      book.title=req.body.bookTitle;
      return;
    }
  });



  return res.json({books: database.books});
  //map => new array => replace
})

/* 
Route        /book/author/update/:isbn
Description   add/update new author
Access        public
Parameters    none
Method        PUT
*/
shapeai.put("/book/author/update/:isbn", (req,res) =>{
  //update book database
database.books.forEach((book) => {
   if(book.ISBN === req.params.isbn)
   return book.authors.push(req.body.newAuthor);
});
 //update author database
database.authors.forEach((author) =>{
  if(author.id===req.body.newAuthor)
  return database.authors.books.push(req.params.isbn);
});

return res.json({
  books:databasbooks, authors:database.authors, message:"New author was added"
});

});
/* 
Route        /publication/update/book
Description   update/add new book to a publication
Access        public
Parameters    none
Method        PUT
*/
shapeai.put("/publication/update/book/:isbn",(req,res)=> {
  //update the publication database
  database.publications.forEach((publication) => {
    if(publication.id=== req.body.pubId){
   return publication.books.push(req.params.isbn);
    }

  });
  //update the book database

  database.books.forEach((book) =>{
    if(book.ISBN === req.params.isbn){
      book.publication=req.body.pubId;
      return;
    }
  });
  return res.json({books: database.books, publications: database.publications,
  message:"Successfully updated publication",
  });
})
shapeai.listen(3000,()=> console.log("Server is running"));
