const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../data/db.json");
let db = require(dbPath);

const validateNoteInput = require('../middleware/validateNoteInput');

const notesInDB = () => {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  };
  
  const getAllNotes = (req, res) => {
    res.status(200).json(db.notes);
  };
  
  const getNotesById = (req, res) => {
    const notes = db.notes.find((notes) => notes.id == req.params.id);
    if (notes) {
      res.status(200).json(notes);
    } else {
      res.status(404).json({ message: "Notes not found" });
    }
  };
  
  const createNotes = [
    validateNoteInput,
    (req, res) => {
      const newNote = req.body;
      newNote.id = db.notes.length + 1;
      db.notes.push(newNote);
      notesInDB();
      res.status(201).json(newNote);
    }
  ];
  
  const updateNotes = (req, res) => {
    const index = db.notes.findIndex((note) => note.id == req.params.id);
    if (index !== -1) {
      db.notes[index] = req.body;
      db.notes[index].id = req.params.id;
      notesInDB();
      res.status(200).json(db.notes[index]);
    } else {
      res.status(404).json({ message: "Notes not found" });
    }
  };
  
  const deleteNotes = (req, res) => {
    const id = parseInt(req.params.id);
    // Check if the note exists
    const noteExists = db.notes.some(note => note.id === id);
    if (!noteExists) {
      return res.status(404).json({ error: 'Note not found' });
    }
    // Filter out the note with the given id
    db.notes = db.notes.filter((note) => note.id !== id);
    // Update the database
    notesInDB();
    // Send a successful response
    res.status(200).json({ message: 'Note deleted successfully' });
  };
  

  module.exports = {
    getAllNotes,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes,
  };