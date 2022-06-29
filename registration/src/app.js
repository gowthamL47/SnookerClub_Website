const express = require('express');
const app = express();
const path = require('path');
require('./db/conn')
const Student = require('./models/schema');
const lecturer = require('./models/schemat');
const marks = require('./models/schemam');

const hbs = require('hbs');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const partials_path = path.join(__dirname, "../tamplates/partials");
const template_path = path.join(__dirname, "../tamplates/views");
app.set('view engine', "hbs");
app.set('views', template_path);
hbs.registerPartials(partials_path)


// HOME PAGE

app.get('/', (req, resp) => {
    resp.render('index');
})





// REGISTER FOR STUDENT


app.get('/register/student', (req, resp) => {
    resp.render('Studentregister');
})

app.post('/register/student', async (req, resp) => {

    try {
        const user = new Student(req.body);
        
        const result = await user.save();
        resp.send('thank you for registering');
    }
    catch (err) {
        resp.send("register again")
    }

    console.log(req.body);
}
)



// TEACHER REGISTRATION FORM

app.get('/register/teacher', (req, resp) => {
    resp.render('Teacherregister');
})


app.post('/register/teacher', async (req, resp) => {
    try {
        const Lecturer = new lecturer(req.body);
        const result = await Lecturer.save();
         resp.send('thank you for registering');
    }
    catch (err) {
        resp.send("register again")
    }

})






// TEACHER LOGIN PAGE

app.get('/login/teacher', (req, resp) => {
    resp.render('Teacherlogin');

})

app.post('/login/teacher', async (req, resp) => {

    try {

        userPassword = req.body.password;
        const email = req.body.email;
        const data = await lecturer.findOne({ email: email });

        const dbPassword = data.password;

        if (dbPassword == userPassword) {
            resp.render('tlogin')
            console.log(data);
            console.log(req.body)
        }
        else {
            resp.send('try again');
        }
    }

    catch {
        resp.send("something went wrong")
    }
})

//student makrs entry

app.get('/student/marks', (req,resp) => {
resp.render('smarks');
})

app.post('/student/marks',async (req,resp) => {
    try {
        const user = new marks (req.body);
        

        const result = await user.save();
        resp.send('thank you for registering');
       
    }
    catch (err) {
        resp.send("register again")
    }

    console.log(req.body);
    })
    




app.listen(port, () => {
    console.log('server is running');
})


