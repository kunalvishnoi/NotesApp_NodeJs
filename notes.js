var fs = require("fs");
var chalk = require("chalk");

const readNote = titile => {
  const notes = loadNotes();
  const note = notes.find(element => element.title === titile);
  if (!note) {
    console.log(chalk.red("Note not found"));
  } else {
    console.log(chalk.blue(note.title + ": ") + chalk.green(note.body));
  }
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  let duplicate = false;
  notes.map(note => {
    if (note.title === title) {
      duplicate = true;
    }
  });
  if (duplicate) {
    console.log("Note title already taken...");
  } else {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log("New note added");
  }
};

const saveNotes = notes => {
  const saveData = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", saveData);
};

const removeNotes = title => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);
  if (notes.length === newNotes.length) {
    console.log(chalk.red("Note Not found!"));
  } else {
    saveNotes(newNotes);
    console.log(chalk.green("Note Deleted...."));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
module.exports = {
  readNote: readNote,
  loadNotes: loadNotes,
  addNotes: addNotes,
  removeNotes: removeNotes
};
