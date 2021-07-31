const books=[{
    ISBN:"12345ONE",
    title:"Getting started with MERN",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfPage:225,
    category:["fiction","programming","tech","web dev"],
    publications:1



},
{
    ISBN:"12345TWO",
    title:"Getting started with MERN",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfPage:225,
    category:["fiction","programming","tech","web dev"],
    publications:1

}];

const authors=[{
    id:1,
    name:"uhitha",
    books:"12345ONE"
},
{
    id:2,
    name:"venu",
    books:"12345ONE",
}];

const publications=[{
    id:1,
    name:"uhitha",
    books:"12345ONE"
},
{
    id:2,
    name:"Venu gopal",
    books:[]
}];

module.exports={books,authors,publications};