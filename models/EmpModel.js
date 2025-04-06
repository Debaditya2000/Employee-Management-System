// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  eid: {
    type: Number,
    required: true,
    unique: true
  },
  ename: {
    type: String,
    required: true
  },
  desig: {
    type: String,
    required: true
  },
  basic: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('EmpModel', employeeSchema);
