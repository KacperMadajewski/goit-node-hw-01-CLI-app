import fs from "node:fs";
import path from "node:path";


const contactsPath = path.dirname('/db/contacts.json');


function listContacts() {
  const data = fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);
}

function getContactById(contactId) {
  // ...twój kod
}

function removeContact(contactId) {
  // ...twój kod
}

function addContact(name, email, phone) {
  // ...twój kod
}