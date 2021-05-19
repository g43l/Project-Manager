const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.get("/projects", (request,response) => {
    Project.find()
        .then(result => {
            // console.log(result)
            response.render("projects", {projects : result});
            })
        .catch(err => console.log(err));
    // response.render("projects");
});

router.get("/projects/create", (request,response) => {
    response.render("projects/create");
});

router.get("/projects/update", (request,response) => {
    response.render("projects/update");
});

router.post("/projects/create", (request,response) => {
    // console.log(request.body);
    // response.redirect("/projects");

    Project.create(request.body)
        .then(() => response.redirect("/projects"))
        .catch(err => console.log(err));
});

router.post("/projects/update", (request, response) => {
    const project = request.body;
    Project.findByIdAndUpdate(project._id, { name: project.name, description: project.description})
        .then(() => response.redirect("/projects"))
        .catch(err => console.log(err));
});

router.get("/projects/update/:id", (request,response) => {
    const id = request.params.id;
    // console.log(id);
    Project.findById(id)
        .then(project => {
            // console.log(project);
            response.render("projects/update", project)
        })
        .catch(err => console.log(err));
    // response.render("projects/update");
});

router.get("/projects/delete/:id", (request, response) => {
    const id = request.params.id;
    response.render("projects/delete", { _id:id});
});

router.post("/projects/delete", (request, response) => {
    Project.findByIdAndDelete(request.body._id)
        .then(() => response.redirect("/projects"))
        .catch(err => console.log(err));
});

module.exports = router;