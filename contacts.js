import fs from "node:fs";
import path from "node:path";

const contactsPath = path.dirname("/db/contacts.json");

function listContacts() {
  const data = fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);
  return parsedData;
}

function getContactById(contactId) {
  const contacts = listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  return findContact;
}

function removeContact(contactId) {
  const contacts = listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  return newContacts;
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = { id: Date.now().toString(), name, email, phone };
  const newContacts = contacts.push(newContact);
  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
