const fs = require("fs").promises;
const path = require("path");
require("colors");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function contactsJSON() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = await JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function listContacts() {
  const contacts = await contactsJSON();
  console.table(contacts);
}

async function getContactById(contactId) {
  try {
    const contacts = await contactsJSON();
    const findContact = contacts.find((item) => item.id === contactId);

    if (!findContact) {
      console.log(
        `Can't find contact with this id: ${contactId}, please try again.`.red
      );
      return;
    }

    console.table(findContact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await contactsJSON();
    const searchContact = contacts.findIndex((item) => item.id === contactId);

    if (searchContact === -1) {
      console.log(
        `Can't find contact with this id: ${contactId}, please try again.`.red
      );
      return;
    }

    contacts.splice(searchContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.table(contacts);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await contactsJSON();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
