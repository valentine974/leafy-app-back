const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Message = require("../models/Message.model");
const Conversation = require("../models/Conversation.model");


// create a conversation  postman checked
router.post("/create-conversation", (req, res, next) => {
    const { participants, messages } = req.body;
    Conversation.create({
        participants,
        messages,
    })
        .then((conversation) => res.json(conversation))
        .catch((err) => console.log("err in creating the Conversation", err));
});

// get all conversations postman checked
router.get("/conversations", (req, res, next) => {
    Conversation.find()
        .populate("participants messages")
        .then((conversations) => res.json(conversations))
        .catch((err) => console.log("err in retrieving the Conversation", err));
});

// get all conversations of a user postman checked
router.get("/user/:id/conversations", (req, res, next) => {  
    Conversation.find({participants:{$in:[req.params.id]}})
        .populate("participants messages")
        .then((conversations) => res.json(conversations))
        .catch((err) => console.log("err in retrieving the Conversation", err));
});

// get a conversation  postman checked
router.get("/conversation/:id", (req, res, next) => {
    Conversation.findById(req.params.id)
        .populate("participants messages")
        .then((conversation) => res.json(conversation))
        .catch((err) => console.log("err in retrieving the Conversation", err));
});

// add a message to a conversation  postman checked
router.post("/conversation/:id/add-message", (req, res, next) => {
    const { sender, content, attachment } = req.body;
    Message.create({
        sender,
        content,
        attachment,
    }).then((message) => {  
        Conversation.findByIdAndUpdate(
            req.params.id,
            { $push: { messages: message._id } },
            { new: true }
        )
            .populate("participants messages")
            .then((conversation) => res.json(conversation))
            .catch((err) => console.log("err in updating the Conversation", err));
    });
});

// delete a conversation postman checked 
router.delete("/conversation/:id", (req, res, next) => {
    Conversation.findByIdAndDelete(req.params.id)
        .then((conversation) => res.json(conversation))
        .catch((err) => console.log("err in deleting the Conversation", err));
});

// delete a message from a conversation postman checked
router.delete("/conversation/:id/message/:messageId", (req, res, next) => {
    Message.findByIdAndDelete(req.params.messageId)
        .then((message) => { 
            console.log(message)
        })
        .catch((err) => console.log("err in deleting the Message", err));
    Conversation.findByIdAndUpdate(
        req.params.id,
        { $pull: { messages: req.params.messageId } },
        { new: true }
    )
        .populate("participants messages")
        .then((conversation) => res.json(conversation))
        .catch((err) => console.log("err in updating the Conversation", err));
});

// add a participant to a conversation  postman checked
router.post("/conversation/:id/participant", (req, res, next) => {
    const { participant } = req.body;
    Conversation.findByIdAndUpdate(
        req.params.id,
        { $push: { participants: participant } },
        { new: true }
    )
        .populate("participants messages")
        .then((conversation) => res.json(conversation))
        .catch((err) => console.log("err in updating the Conversation", err));
});

// delete a participant from a conversation postman checked
router.delete("/conversation/:id/participant/:participantId", (req, res, next) => {
    Conversation.findByIdAndUpdate(
        req.params.id,
        { $pull: { participants: req.params.participantId } },
        { new: true }
    )
        .populate("participants messages")
        .then((conversation) => res.json(conversation))
        .catch((err) => console.log("err in updating the Conversation", err));
});


module.exports = router;


