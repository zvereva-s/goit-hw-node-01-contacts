const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}
async function updContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id == contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id == contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  updContacts(contacts);
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: ObjectID(), name, email, phone };
  contacts.push(newContact);
  updContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
