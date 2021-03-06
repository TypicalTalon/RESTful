
const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());


const courses = [
{id: 1, name: 'courses1'},
{id: 2, name: 'courses2'},
{id: 3, name: 'courses3'}]
app.get('/',(req,res)=>{
    res.send('Hello World!!!')
});


app.get('/api/courses', (req,res)=>{
res.send(courses);
});

// /api/courses/1

app.post('/api/courses',(req,res)=>{
    const schema = {
        name: Joi.string().min(3).required()
    };

   const result = Joi.validate(req.body, schema);
    console.log(result);

    if(!req.body.name ||req.body.name.length < 3){
        //400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 character!');
        return;
    }
const course = {
     id: courses.length +1,
     name: req.body.name
};
courses.push(course);
res.send(course);
});

app.get('/api/courses/:id', (req, res)=>{
let course = courses.find(c =>c.id===parseInt(req.params.id))
if(!course){
    res.status(404).send('The course with the given ID was not found');
}
else{
    res.send(course);
}
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`)
});

