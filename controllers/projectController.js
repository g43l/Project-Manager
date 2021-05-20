const { request, response } = require("express");
const Project = require("../models/project")

const all = (req,res) => {
    Project.find()
        .then(projects => res.render("projects", { projects}))
        .catch(err => console.log(err));
};
const createGet = (request, response) => {
    response.render("projects/create");
};
const createPost = (request, response) => {
    Project.create(request.body)
        .then(() => response.redirect("/projects"))
        .catch(err => console.log(err));
};

const updatePost = (request, response) => {
    const project = request.body;
    Project.findByIdAndUpdate(project._id, { name: project.name, description: project.description})
        .then(() => response.redirect("/projects"))
        .catch(err => console.log(err));
};
const updateGet = (request, response) => {
    const id = request.params.id;
    Project.findById(id)
        .then(project => {
            response.render("projects/update", project)
        })
        .catch(err => console.log(err));
};

const deleteGet = (request, response) => {
    const id = request.params.id;
    response.render("projects/delete", { _id:id});
};

const deletePost = (request, response) => {
    Project.findByIdAndDelete(request.body._id)
    .then(() => response.redirect("/projects"))
    .catch(err => console.log(err));
};

module.exports = {
    all,
    createGet,
    createPost,
    updateGet,
    updatePost,
    deleteGet,
    deletePost
};