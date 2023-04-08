const express = require('express');
const router = express.Router();
var fetchuser = require('./middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require("express-validator");


//Routes 1: Get all the notes using: GET "api/auth/getuser". Login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
    const notes = await Note.find({user: req.user.id})
    res.json(notes)
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
})
//Routes 2: Add a new Note using: PUT "api/notes/addnote". Login required
router.post('/addnote',fetchuser, [
    body("title",'Enter valid name').isLength({ min: 3 }),
    body("description",'description must be at least 5 character').isLength({ min: 5 }),
],async(req,res)=>{
    try {
    const {title, description,tag,} = req.body;
    // If there are errors, Return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,description, tag, user: req.user.id
    })
    const saveNote = await note.save()
    res.json(saveNote)
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
})

//Routes 3: Update an existing note Note using: POST "api/notes/updatenote". Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title, description, tag} = req.body;
    try {  
    //Create a neNote object
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = title}
        if(tag){newNote.tag = title}
    // Find the note bo to updated and updated
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
    res.json({note});
}catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error");
      }
})
//Routes 4: Delete an existing note Note using: DELETE "api/notes/deletetenote". Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title, description, tag} = req.body;
    try {
    // Find the note bo to delete and delete
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    //Allow deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted successfully",note:note});
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
})
module.exports = router