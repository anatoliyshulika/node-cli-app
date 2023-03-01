import { Command } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.log(contactsList);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const contactsAfterAdd = await addContact(name, email, phone);
      console.log(contactsAfterAdd);
      break;

    case "remove":
      const contactsAfterRemov = await removeContact(id);
      console.log(contactsAfterRemov);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
}

invokeAction(argv);
