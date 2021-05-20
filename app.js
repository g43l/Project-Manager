
const express = require ("express");
const mongoose = require ("mongoose");
const expressLayouts = require ("express-ejs-layouts");
// const Project = require("./models/project");
const projectRoutes = require("./routes/projectRoutes");
const userStoryRoutes = require("./routes/userStoryRoutes");

const app = express();
const dbUri ="mongodb://localhost:27017/project-management-node";

mongoose.connect(dbUri, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => app.listen(4000))
    .catch(err => console.log(err));

///// Middleware  /////////////
    app.use(express.static("public"));
    app.use(expressLayouts);
    app.set("view engine", "ejs");    
    app.use(express.urlencoded({extended: true})); // Permet de prendre les extensions de l'Url


/////// Routes ///////////
app.get("/", (request,response) => {
    response.redirect("/projects");
});
// app.get("/", (request,response) => {
//     response.redirect("/userStories");
// });
app.use("/projects", projectRoutes);
app.use("/userStories", userStoryRoutes);