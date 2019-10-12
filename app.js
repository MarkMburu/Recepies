const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');


mongoose.connect(`mongodb+srv://Mark:SihdcJ6uBqK0ruqi@cluster0-sixpt.mongodb.net/test?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Successfully connected to mongodb atlas");
})
.catch((error)=>{
    console.log("error trying to connect to mongodb atlas")
    console.log(error);
})

const app = express()
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.post('/api/recipes',(req,res)=>{
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        timetoprepare: req.body.timetoprepare,
        difficulty: req.body.difficulty
    });
    recipe.save().then(()=>{
        res.status(201).json({
            message:"post successfully created"
        })
        .catch((error)=>{
            res.status(400).json({
                error:error
            })
        })
    })
})

app.put('/api/recipes/:id',(req,res)=>{
    const recipe = new Recipe({
        _id:req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        timetoprepare: req.body.timetoprepare,
        difficulty: req.body.difficulty
    });
    Recipe.updateOne({
        _id:req.params.id
    },recipe).then(()=>{
        res.status(201).json({
            message:"Recipe successfully updated"
        })
        .catch((error)=>{
            error:error
        })
    })
})

app.delete('/api/recipes/:id',(req,res)=>{
    Recipe.deleteOne({_id:req.params.id}).then(()=>{
        res.status(200).json({
            message:"recipe successfully deleted"
        })
        .catch((error)=>{
            error:error
        })
    })
})

app.get('/api/recipes/:id',(req,res)=>{
    Recipe.findOne({
        _id: req.params.id,
    })
    .then((recipe)=>{
        res.status(200).json(recipe);
    })
    .catch((error)=>{
        res.status(400).json({
            error:error
        })
    })

})



app.get('/api/recipes',(req,res)=>{
    Recipe.find().then((recipes)=>{
        console.log(recipes)
       res.status(200).json(recipes)
    })
    .catch((error)=>{
        res.status(400).json({
            error:error
        })
    })
})



module.exports = app;