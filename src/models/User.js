// 4. Editar la info de un usuario - Falta

const { timeStamp } = require('console');
const { json } = require('express');
const fs = require('fs');
const path = require('path');


let dbUsers = path.resolve(__dirname, "../data/users.json")

function OpenUsers(){
    let users = fs.readFileSync(dbUsers)
    let usersJson= JSON.parse(users)
    return usersJson;
}

function WriteUsers(users){
    let userString = JSON.stringify(users);
    fs.writeFileSync(dbUsers, userString);
}

const User = {
    getData: function(){
        users = OpenUsers();
        return users;
    },
    // 3. Buscar a un usuario por su ID
    
    findAll: function(){
        return this.getData();
    },
    generateID: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
            return lastUser.id + 1;
        } else {
            return 1;
        }
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id );
        return userFound;
    },
// 2. Buscar al usuario que se quiere logear por Email

    findByField: function(field,text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text );
        return userFound;
    },
// 1. Guardar usuario en DB

    create: function (userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateID(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(dbUsers, JSON.stringify(allUsers, null, ''));
        return newUser;
    
    },
// 5. Eliminar a un usuario de la DB

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(dbUsers, JSON.stringify(finalUsers, null, ''));
        return true;
    }
}

module.exports = User;