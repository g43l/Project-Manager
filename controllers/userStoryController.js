const { request, response } = require("express");
const UserStory = require("../models/userStory")

const all = (req,res) => {
    UserStory.find()
        .then(userStories => res.render("userStories", { userStories}))
        .catch(err => console.log(err));
};
const allByProject = (request, response) => {
    const projectId = request.params.projectId;
    UserStory.find({projectId})
        .then(userStories => response.render("userStories", { projectId, userStories }))
        .catch(error => console.log(error));
}; 

const createGet = (request, response) => {
    const projectId = request.params.projectId;
    response.render("userStories/create", {projectId});
};

const createPost = (request, response) => {
    UserStory.create(request.body)
        .then(() => response.redirect("/userStories/" + request.body.projectId))
        .then(error => console.log(error));
};

const updatePost = (request, response) => {
    const userStory = request.body;
    UserStory.findByIdAndUpdate(userStory._id, { title: userStory.title, description: userStory.description, acceptanceCriteria: userStory.acceptanceCriteria, priority: userStory.priority})
        .then(() => response.redirect("/userStories"))
        .catch(err => console.log(err));
};
const updateGet = (request, response) => {
    const id = request.params.id;
    UserStory.findById(id)
        .then(userStory => {
            response.render("userStories/update", userStory)
        })
        .catch(err => console.log(err));
};

const deleteGet = (request, response) => {
    const id = request.params.id;
    response.render("userStory/delete", { _id:id});
};

const deletePost = (request, response) => {
    UserStory.findByIdAndDelete(request.body._id)
    .then(() => response.redirect("/userStories"))
    .catch(err => console.log(err));
};

module.exports = {
    all,
    allByProject,
    createGet,
    createPost,
    updateGet,
    updatePost,
    deleteGet,
    deletePost
};