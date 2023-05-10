const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contacts = require("./db/contacts.js");

const invokeAction=async({ action, id, name, email, phone })=> {
  switch (action) {
    case "list":
          const list = await contacts.allContacts();
          console.log(list);
      break;

    case "get":
      const getCont = await contacts.getContactById(id);
          console.log(getCont);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
          console.log(newContact);
      break;

    case "remove":
      const deleted = await contacts.removeContact(id);
          console.log(deleted);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);