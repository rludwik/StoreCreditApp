 const express = require('express');
const res = require('express/lib/response');
 const router = express.Router();

 // Customer Model
const Customer = require('../../models/Customer');

// @route  GET api/customer
// @desc   Get all customers
// @access Public
router.get('/', (req, res) => {
  Customer.find()
    .sort({date: -1})
    .then(customers => res.json(customers))
});

// @route  POST api/customer
// @desc   Post new customer
// @access Public
router.post('/', (req, res) => {
  const newCustomer = new Customer({
    name: req.body.name
  });

  newCustomer.save().then(customer => res.json(customer));
});

// @route  DELETE api/customer
// @desc   Delete a customer
// @access Public
router.delete('/:id', (req, res) => {
  Customer.findById(req.params.id)
    .then(customer => customer.remove().then(() => res.json({success:true})))
    .catch(err => res.status(404).json({success:false, err:'User not found'}));  
});

module.exports = router;