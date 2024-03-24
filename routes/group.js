const express= require('express');
const routes=express.Router();

const userAuthenticate=require('../middleware/authentication');
const Groupcontrollers=require('../controllers/group');

routes.post('/groups',userAuthenticate.authenticate,Groupcontrollers.createNewGroup);
routes.get('/groups',userAuthenticate.authenticate,Groupcontrollers.getAllGroups);
routes.post('/groups/addmembers',userAuthenticate.authenticate,Groupcontrollers.addMemberGroup);
routes.post('/groups/removemembers',userAuthenticate.authenticate,Groupcontrollers.removeMemberinGroup);
routes.patch('/groups/changeAdmin',userAuthenticate.authenticate,Groupcontrollers.changeAdminGroup);
routes.delete('/groups/deletegroup/:id',userAuthenticate.authenticate,Groupcontrollers.deletGroup)


module.exports=routes;