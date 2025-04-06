const express = require('express');
const router = express.Router();
const empController = require('../controllers/empCtrl');
const { body } = require('express-validator');

router.get('/add', empController.getAddForm);
router.post('/add', [
    body('eid').isNumeric().withMessage('Employee ID must be a number'),
    body('ename').notEmpty().withMessage('Name is required'),
    body('desig').notEmpty().withMessage('Designation is required'),
    body('basic').isNumeric().withMessage('Basic salary must be a number')
], empController.createEmployee);

router.get('/show', empController.getEmployees);

router.get('/edit/:id', empController.editForm);
router.post('/update/:id', [
    body('eid').isNumeric().withMessage('Employee ID must be a number'),
    body('ename').notEmpty().withMessage('Name is required'),
    body('desig').notEmpty().withMessage('Designation is required'),
    body('basic').isNumeric().withMessage('Basic salary must be a number')
], empController.updateEmployee);

router.get('/delete/:id', empController.deleteEmployee);

router.get('/srh', empController.searchEmployee);

module.exports = router;
