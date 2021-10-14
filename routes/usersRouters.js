const express = require('express');

const userService = require('../services/usersService');

const router = express.Router();

const Users = new userService();

router.get('/', (req, res) => {

  const users = Users.find();

  res.status(200).json(users);

});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const user = Users.findOne(id);

  if(!user){
    res.status(404).json({
      message: `Usuario con id ${id} no encontrado`
    });
  } else {
    res.status(200).json({
      user
    });
  }
});



module.exports = router;
