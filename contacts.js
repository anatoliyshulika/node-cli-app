import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.filter(
      (contact) => contact.id === String(contactId)
    );
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactsAfterRemov = contacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterRemov, null, 2),
      "utf-8"
    );
    return contactsAfterRemov;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.push(contact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

export { listContacts, getContactById, removeContact, addContact };
