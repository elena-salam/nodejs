const fs = require('fs');
const {promises: fsPromises} = fs;
const path = require('path');



 const contactsPath = path.join(__dirname, './db/contacts.json');
 

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fsPromises.readFile(contactsPath, 'utf-8');
  const parsedData = JSON.parse(data)
  console.table(parsedData);
  return parsedData;
  }
  
async function getContactById(contactId) {
  const parsedData = await listContacts();
  const specificUser = parsedData.find(user => user.id === contactId);
  console.table(specificUser);
  return specificUser;
  }
  
async function removeContact(contactId) {
  const parsedData = await listContacts();
  const filteredUsers = parsedData.filter(user => user.id !==contactId);
  const newUsersToString = JSON.stringify(filteredUsers);
  
  await fsPromises.writeFile(contactsPath, newUsersToString);
  
  }
  
async function addContact(name, email, phone) {
  
  const parsedUsers = await listContacts();
  const arrayOfId = parsedUsers.map(el => el.id);
  const maxId = Math.max(...arrayOfId);
  const newContact = {
    id: maxId + 1,
    name,
    email,
    phone,
  };
  const newContacts = [...parsedUsers, newContact];
  const newContactsToString = JSON.stringify(newContacts);

  await fsPromises.writeFile(contactsPath, newContactsToString);
  
}

  module.exports={
      listContacts,
      getContactById,
      removeContact,
      addContact
  }