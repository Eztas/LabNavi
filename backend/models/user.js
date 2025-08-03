const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

const readUsers = () => {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data).users;
};

const writeUsers = (users) => {
    fs.writeFileSync(dbPath, JSON.stringify({ users }, null, 2));
};

const User = {
    findOne: async ({ email }) => {
        const users = readUsers();
        return users.find(user => user.email === email);
    },
    create: async (userData) => {
        const users = readUsers();
        const newUser = { ...userData, id: Date.now().toString() };
        users.push(newUser);
        writeUsers(users);
        return newUser;
    }
};

module.exports = User;
