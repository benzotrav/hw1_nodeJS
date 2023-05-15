const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (data) => {
    await fs.writeFile(contactsPath, JSON.stringify(data));
}

const allContacts=async() =>{
    const res = await fs.readFile(contactsPath);
    return JSON.parse(res);
}

const getContactById=async(id)=> {
    const contacts = await allContacts();
    const frec = contacts.find((contact) => contact.id == id);
    if (!frec) null;
    return frec;
}

const removeContact = async (id) => {
    const contacts = await allContacts();
    const idx = contacts.findIndex((e) => e.id == id);
    if (idx === -1) {
        return null;
    };
    const [result] = contacts.splice(idx, 1); 
    await updateContacts(contacts);
    return result;
}

const addContact=async(name, email, phone)=> {
    const contacts = await allContacts();
    const {v4 : uuidv4} = require("uuid");
    const id = uuidv4();
        const newContact = {
        id,
        name,
        email,
        phone
    };
    
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

module.exports = {
    getContactById,
    removeContact,
    addContact,
    allContacts
}