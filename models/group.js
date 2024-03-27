const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Group=sequelize.define('group',{
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    name:Sequelize.STRING,
    createdBy:Sequelize.INTEGER
});

module.exports=Group;