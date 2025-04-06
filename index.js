const express = require('express');
const app = express();
const empCtrl = require('./controllers/empCtrl');
console.log(empCtrl);

app.get('/add', empCtrl.getAddPage);
app.post('/add', empCtrl.addEmployee);

app.get('/show', empCtrl.showEmployees);

app.get('/search', empCtrl.searchEmployees);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { title: 'Employee Management System' });
});

app.get('/add', (req, res) => {
    res.send('Add Page Works!');
  });

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
