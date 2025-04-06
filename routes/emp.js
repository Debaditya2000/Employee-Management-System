const express = require('express');
const router = express.Router();
const Employee = require('../models/Emp'); // ✅ Make sure Employee.js exists

router.get('/', async (req, res) => {
  let query = {};
  if (req.query.name) {
    query.name = new RegExp(req.query.name, 'i');
  }

  const employees = await Employee.find(query);
  res.render('emp/index', { employees, searchName: req.query.name || '' });
});

module.exports = router;
