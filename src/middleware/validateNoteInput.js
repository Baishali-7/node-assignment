module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error occured!" });
  };

const validateNoteInput = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      const { title, content } = req.body;
      next();
    };
}    

module.exports = validateNoteInput;