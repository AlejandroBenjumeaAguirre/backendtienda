const express = require('express');

const CategoriesService = require('../services/categoriesService');

const router = express.Router();

const Categories = new CategoriesService();

router.get('/', (req, res) => {
  const categories = Categories.find();

  res.status(200).json({
    categories
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const categorie = Categories.findOne(id);

  if(!categorie){
    res.status(404).json({
      message: `La categoria con id ${id} no se encontro`
    });
  }else {
    res.status(200).json({
      categorie
    });
  }
});

router.get('/:idcaategorie/products/:idproducts', (req, res) => {
  const { idcaategorie, idproducts} = req.params;

  res.json({
    idcaategorie,
    idproducts
  });

});

module.exports = router;
