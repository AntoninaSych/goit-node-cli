#!/usr/bin/env node
const { program } = require("commander");
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require("./contacts");

program
    .option("-a, --action <type>", "choose action: list, get, add, remove")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list": {
            const contacts = await listContacts();
            console.table(contacts);
            break;
        }

        case "get": {
            const contact = await getContactById(id);
            console.log(contact);
            break;
        }

        case "add": {
            const newContact = await addContact(name, email, phone);
            console.log(newContact);
            break;
        }

        case "remove": {
            const removedContact = await removeContact(id);
            console.log(removedContact);
            break;
        }

        default:
            console.warn("\x1B[31m Не передано правильну дію: ", action);
    }
}


invokeAction(argv);
