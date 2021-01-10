const fs = require('fs');
const {promises: fsPromises} = fs;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fsPromises.readFile(contactsPath, 'utf-8');
  const parsedData = JSON.parse(data)
  // console.table(parsedData);
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
async function updateContact(id, values) {
  const parsedData = await listContacts();
  const newData = parsedData.map(contact =>{
    
      if(contact.id === id){
        contact = {...contact, ...values};
      return contact;
      }
      return contact;
    })

  const newContactToString = JSON.stringify(newData);
  await fsPromises.writeFile(contactsPath, newContactToString);
  // const newContact = await getContactById(id); Mentor: reduce calls to bd if it can be done
  const newContact = newData.find(contact => contact.id === id)

  return newContact;
}


module.exports={
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}