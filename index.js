const operationsWithContacts =require('./contacts.js');
const yargs = require('yargs');


const argv = yargs
  .number('id')
  .string('name')
  .string('email')
  .string('phone')
  .argv;
  

function invokeAction({action, id, name, email, phone }){
    switch (action) {
        case 'list':
            operationsWithContacts.listContacts();
          break;
    
        case 'get':
            operationsWithContacts.getContactById(id);
          break;
    
        case 'add':
            operationsWithContacts.addContact(name, email, phone);
          break;
    
        case 'remove':
            operationsWithContacts.removeContact(id);
          break;
    
        default:
          console.warn('\x1B[31m Unknown action type!');
      }
}

invokeAction(argv);