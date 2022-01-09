const mongoose = require('mongoose');
const Volume = require('./models/volume'); //Adds volumes collection

mongoose.connect('mongodb://localhost:27017/fracTank')
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch((e) => {
        console.log("Oh No, Mongo Error Dude")
        console.log(e)
    })

    /*
const v = new Volume ({
    tank: '1A',
    totalV: 6607.20,
    waterV: 4992.40,
    productV: 1614.80
});

v.save()
.then(res => {
    console.log("first volume added to db");
    console.log(res);
})
.catch(e => {
    console.log("Ann error occured trying to make first db entry");
    console.log(e);
})
*/

 //First ran above in node seeds.js to confirm connection
 //ran below next to seed each tank 1A, 1B, 2A, 2B, 3A, 3B

const volumeSeeds = [
    {
        zone: 1,
        tank: '1A',
        totalV: 6607.20,
        waterV: 4992.40,
        productV: 1614.80
    },
    {
        zone: 1,
        tank: '1B',
        totalV: 4931.92,
        waterV: 2954.24,
        productV: 1977.68
    },
    {
        zone: 2,
        tank: '2A',
        totalV: 895.63,
        waterV: 457.70,
        productV: 443.96
    },
    {
        zone: 2,
        tank: '2B',
        totalV: 3750.98,
        waterV: 3548.96,
        productV: 202.02
    },
    {
        zone: 3,
        tank: '3A',
        totalV: 10219.72,
        waterV: 6526.48,
        productV: 3693.24
    },
    {
        zone: 3,
        tank: '3B',
        totalV: 12066.48,
        waterV: 7626.28,
        productV: 4440.20
    }
]

Volume.insertMany(volumeSeeds)
.then(res => {
    console.log("DB seeded");
    console.log(res);
})
.catch(e => {
    console.log("Ann error occured trying to make first db entry");
    console.log(e);
})
