// controllers/empCtrl.js
const EmpModel = require('../models/EmpModel');
const { validationResult } = require('express-validator');

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ eid: 1 });
        res.render('show', {
            data: employees,
            title: 'All Employees'
        });
    } catch (err) {
        res.status(500).render('error', { title: 'Error', message: 'Server Error', error: err });
    }
};

exports.getAddPage = (req, res) => {
    res.render('addEmp', {
        msg: '',
        title: 'Add Employee',
        employee: {}
    });
};

exports.createEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('addEmp', {
            msg: errors.array()[0].msg,
            title: 'Add Employee',
            employee: req.body
        });
    }
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.render('addEmp', {
            msg: 'Employee Saved Successfully',
            title: 'Add Employee',
            employee: {}
        });
    } catch (err) {
        res.render('addEmp', {
            msg: 'Error saving employee',
            title: 'Add Employee',
            employee: req.body
        });
    }
};

exports.editForm = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).render('error', { title: 'Not Found', message: 'Employee not found', error: {} });
        }
        res.render('addEmp', {
            msg: '',
            title: 'Edit Employee',
            employee
        });
    } catch (err) {
        res.status(500).render('error', { title: 'Error', message: 'Server Error', error: err });
    }
};

exports.updateEmployee = async (req, res) => {
    const errors = validationResult(req);
    const employeeId = req.params.id;

    if (!errors.isEmpty()) {
        return res.render('addEmp', {
            msg: errors.array()[0].msg,
            title: 'Edit Employee',
            employee: { ...req.body, _id: employeeId }
        });
    }

    try {
        const updated = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });
        if (!updated) {
            return res.status(404).render('error', { title: 'Not Found', message: 'Employee not found', error: {} });
        }

        res.render('addEmp', {
            msg: 'Employee Updated Successfully',
            title: 'Edit Employee',
            employee: updated
        });
    } catch (err) {
        res.render('addEmp', {
            msg: 'Error updating employee',
            title: 'Edit Employee',
            employee: { ...req.body, _id: employeeId }
        });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndRemove(req.params.id);
        res.redirect('/emp/show');
    } catch (err) {
        res.status(500).render('error', { title: 'Error', message: 'Error deleting employee', error: err });
    }
};

exports.searchEmployee = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.render('search', {
                employees: [],
                title: 'Search Employees'
            });
        }

        const employees = await Employee.find({
            $or: [
                { ename: { $regex: query, $options: 'i' } },
                { eid: query }
            ]
        });

        res.render('search', {
            employees,
            title: 'Search Results',
            query
        });
    } catch (err) {
        res.status(500).render('error', { title: 'Error', message: 'Server Error', error: err });
    }
};
