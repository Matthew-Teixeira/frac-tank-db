const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { formatDate, formatTime } = require('./public/js/dates.js');

const Volume = require('./models/volume');

const tanks = ["1A", "1B", "2A", "2B", "3A", "3B"];
const zones = [1, 2, 3]

mongoose.connect('mongodb://localhost:27017/fracTank')
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch((e) => {
        console.log("Oh No, Mongo Error Dude")
        console.log(e)
    })

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method')); 

//Home Page
app.get('/', async (req, res) => {
    const volumes = await Volume.find({});    
    res.render('home', { volumes });
})

//Read all volumes
app.get('/volumes', async (req, res) => {   
    const volumes = await Volume.find({}); 
    res.render('tanks/index', { volumes });
})

//Read volumes by zone
app.get('/volumes/:zones/view', async (req, res) => {
    const {zones} = req.params;
    const volumes = await Volume.find({zone: zones})
    res.render('tanks/view', { volumes, formatDate, formatTime })
})
 
//Go to volume add page
app.get('/volumes/:zone/new', (req, res) => { 
    const { zone } = req.params;
    if(zone == 1){
        res.render(`tanks/zone1`, { tanks, zones });
    }
    else if(zone == 2){
        res.render(`tanks/zone2`, { tanks, zones });
    }
    else if(zone == 3){
        res.render(`tanks/zone3`, { tanks, zones });
    }
 
})
 
//Post new data
app.post('/volumes', async (req, res) => {
    const newVolume = new Volume(req.body);
    await newVolume.save(); //Saved to db
    res.redirect(`/volumes/${newVolume.zone}/view`);   
})

//Edit an entry 
app.get('/volumes/:id/edit', async (req, res) => {
    const { id } = req.params
    const foundVolume = await Volume.findById(id);
    res.render('tanks/edit', { foundVolume, tanks, zones });
})

app.put('/volumes/:id', async (req, res) => {
    const { id } = req.params;
    const volume = await Volume.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/volumes/${volume.zone}/view`);
})

app.delete('/volumes/:id', async (req, res) => {
    const { id } = req.params;
    const deletedVolume = await Volume.findByIdAndDelete(id);
    res.redirect(`/volumes/${deletedVolume.zone}/view`);
})

app.listen(3000, (req, res) => {
    console.log("Connected to 3000")
}) 