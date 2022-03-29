const express = require('express');
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync');
const { formatDate, formatTime } = require('../public/js/dates.js');
const Volume = require('../models/volume');
const {isLoggedIn, validateVolumes} = require('../middleware');

const tanks = ["1A", "1B", "2A", "2B", "3A", "3B"];
const zones = [1, 2, 3]

//Read all volumes
router.get('/volumes', isLoggedIn, catchAsync(async (req, res, next) => {   
    const volumes = await Volume.find({}); 
    res.render('tanks/index', { volumes });
}))

//Read volumes by zone
router.get('/:zones/view', isLoggedIn, catchAsync(async (req, res) => {
    const {zone} = req.params;
    const volumes = await Volume.find({zone: zones})
    res.render('tanks/view', { volumes, formatDate, formatTime })
}))
 
//Go to volume add page
router.get('/:zone/new', isLoggedIn, (req, res) => { 
    const { zone } = req.params;
    if(zone == 1){
        res.render(`tanks/zone1`, { tanks, zones, zone });
    }
    else if(zone == 2){
        res.render(`tanks/zone2`, { tanks, zones });
    }
    else if(zone == 3){
        res.render(`tanks/zone3`, { tanks, zones });
    }
 
})
 
//Post new data
router.post('/', isLoggedIn, validateVolumes, catchAsync(async (req, res) => {
    const newVolume = new Volume(req.body);
    await newVolume.save(); //Saved to db
    req.flash('success', "Volume successfully added :)")
    res.redirect(`/volumes/${newVolume.zone}/view`);   
}))

//Edit an entry 
router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params
    const foundVolume = await Volume.findById(id);
    res.render('tanks/edit', { foundVolume, tanks, zones });
}))

router.put('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const volume = await Volume.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    req.flash('success', "Data successfully updated :)")
    res.redirect(`/volumes/${volume.zone}/view`);
}))

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedVolume = await Volume.findByIdAndDelete(id);
    req.flash('success', "Data successfully deleted :)")
    res.redirect(`/volumes/${deletedVolume.zone}/view`);
}))

module.exports = router; 