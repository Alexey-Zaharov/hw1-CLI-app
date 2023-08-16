const fs = require("fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

function listContacts() {
  return fs
    .readFile(contactsPath)
    .then((data) => {
      console.table(JSON.parse(data));
      return JSON.parse(data);
    })
    .catch((err) => {
      return err.message;
    });
}

function getContactById(contactId) {
  listContacts()
    .then((data) => {
      console.log(data.find((item) => item.id === contactId) || null);
      return data.find((contact) => contact.id === contactId) || null;
    })
    .catch((err) => {
      return err.message;
    });
}

function removeContact(contactId) {
  listContacts()
    .then((data) => {
      return {
        list: data,
        contact: data.find((contact) => contact.id === contactId) || null,
      };
    })
    .then(({ list, contact }) => {
      if (contact) {
        const index = list.map((item) => item.id).indexOf(contact.id);
        list.splice(index, 1);
        fs.writeFile(contactsPath, JSON.stringify(list, null, 2)).catch((err) =>
          console.alert(err)
        );

        console.log(contact);
        return contact;
      }

      console.log(contact);
      return contact;
    })
    .catch((err) => {
      return err.message;
    });
}

function addContact(name, email, phone) {
  const contactToAdd = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  listContacts().then((data) => {
    const list = data;
    list.push(contactToAdd);
    fs.writeFile(contactsPath, JSON.stringify(list, null, 2)).catch((err) =>
      console.alert(err)
    );
  });

  console.log(contactToAdd);
  return contactToAdd;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
