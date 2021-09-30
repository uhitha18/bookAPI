const mongoose=require("mongoose")
const BookSchema=mongoose.Schema({
    ISBN:String,
    title:String,
    authors:[Number],
    language:String,
    pubDate:String,
    numOfPage:Number,
    category:[String],
    publications:Number,

});

//Create a book model


const BookModel=mongoose.model(BookSchema)

module.exports=BookModel;