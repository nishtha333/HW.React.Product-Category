const db = require('../db');
const express = require('express');
const router = express.Router();

module.exports = router;

/*Data Validation should be in model for Post/Put; i.e. when the data comes in
No validation in routes */
router.get('/', (req, res, next) => {
    db.getAllCategories()
      .then(categories => res.send(categories))
      .catch(next); //IMPORTANT!
});

router.get('/:id', (req, res, next) => {
    db.getCategoryById(req.params.id)
      .then(category => res.send(category))
      .catch(next); //IMPORTANT!
});

/*Routes with Post and Put (need body-parser)
POST - Need new object in body
PUT - Need the Id in the URL and updates in body
*/
router.post('/', (req, res, next) => {
  Category.create(req.body)
          .then(cat => res.send(cat))
          .catch(next);
});

router.put('/:id', (req, res, next) => {
  /*Put can be done 3 ways: using update method and get the data and update/saving it */
  //First way: However, doesn't give the entire object; just # rows updated
  Category.update(req.body, {where: {id: req.params.id}})

  //Second way
  Category.findById(req.params.id)
          .then(cat => {
            Object.assign(cat, req.body); //Merges new properties to old properties from left to right
            return cat.save();    //Return the promise if part of the promise chain
                                  //No validations on routes. If looking for an empty string:
                                  //  model should have validation and not here (using notEmpty validation on Sequelize)
                                  
          })
          .then(cat => res.send(cat))  //If asking in certain format like: .then(cat => res.send({newFormat: cat}));
          .catch(next);

  //Third way
  Category.findById(req.params.id)
          .then(cat => {
            return cat.update(req.body)
          })
          .then(cat => res.send(cat))  
          .catch(next);
});

router.delete('/:id', (req, res, next) => {
  /*Put can be done 3 ways: using update method and get the data and update/saving it */
  //First way: However, doesn't give the entire object; just # rows updated
  Category.destroy({where: {id: req.params.id}})
          .then(() => res.sendStatus(204))
          .catch(next);
});