const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.error("Помилка при читанні файлу:", error.message);
        return [];
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const result = contacts.find((contact) => contact.id === contactId);
        return result || null;
    } catch (error) {
        console.error("Помилка при пошуку контакту:", error.message);
        return null;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex((contact) => contact.id === contactId);
        if (index === -1) {
            return null;
        }

        const [removedContact] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
        return removedContact;
    } catch (error) {
        console.error("Помилка при видаленні контакту:", error.message);
        return null;
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
        return newContact;
    } catch (error) {
        console.error("Помилка при додаванні контакту:", error.message);
        return null;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
