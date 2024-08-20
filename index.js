const express = require('express')
const app = express()
const notesRoutes = require("./src/routes/notesRoutes")
const errorHandler = require("./src/middleware/validateNoteInput")

 
app.use(express.json());
app.use("/notes", notesRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});