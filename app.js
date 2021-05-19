const { response } = require("express");
const express = require ("express");
const mongoose = require ("mongoose");
const expressLayouts = require ("express-ejs-layouts");
const Project = require("./models/project");

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

app.get("/projects", (request,response) => {
    Project.find()
        .then(result => {
            console.log(result)
            response.render("projects", {projects : result});
            })
        .catch(err => console.log(err));
    // response.render("projects");
});

app.get("/projects/create", (request,response) => {
    response.render("projects/create");
});

app.get("/projects/update", (request,response) => {
    response.render("projects/update");
});

app.post("/projects/create", (request,response) => {
    console.log(request.body);
    // response.redirect("/projects");

    Project.create(request.body)
        .then(() => response.redirect("/projects"))
        .catch(err => console.log(err));
});
app.get("/projects/update/:id", (request,response) => {
    const id = request.params.id;
    console.log(id);
    Project.findById(id)
        .then(project => {
            console.log(project);
            response.render("projects/update", project)
        })
        .catch(err => console.log(err));
    // response.render("projects/update");
});