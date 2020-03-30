var notes = require("./notes.js");
var yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Add a new note!",
  builder: {
    title: {
      describe: "Note Title!",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note Description!",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.addNotes(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  describe: "Remove a note!",
  builder: {
    title: {
      describe: "Delete Note",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.removeNotes(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "List your notes!",
  handler: function() {
    notes
      .loadNotes()
      .map(data =>
        console.log(
          chalk.blue("Title: ") +
            chalk.green(data.title) +
            chalk.blue(" Body: ") +
            chalk.red(data.body)
        )
      );
  }
});

yargs.command({
  command: "read",
  describe: "Read a  note!",
  builder: {
    title: {
      describe: "Delete Note",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse();
