const Sequelize= require("sequelize");

const sequelize= new Sequelize("chatapp", "root", "Ganguly@123", {
    dialect : "mysql",
    host:"localhost",
});

module.exports=sequelize;