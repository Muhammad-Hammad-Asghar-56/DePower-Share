const express = require('express');
const router = express.Router();
const Ad = require('../Models/Ad');
const mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User=require("../Models/User");
// POST route to save an ad
router.post('/add', async (req, res) => {
    const { id, consumer, houseAddress, demandUnits, arrangedUnits, date, pricePerUnit, status } = req.body;

    try {
        const ad = new Ad({
            id,
            consumer,
            houseAddress,
            demandUnits,
            arrangedUnits,
            date,
            pricePerUnit,
            status
        });

        await ad.save();
        res.status(201).json({ message: 'Ad saved successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route to retrieve all ads
router.get('/all', async (req, res) => {
    try {
        const ads = await Ad.find();
        res.json(ads);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route to retrieve a single ad by id
router.get('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const ad = await Ad.findById(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        // Retrieve the house associated with the ad
        const house = await getHouse(ad.consumer, ad.houseAddress);
        console.log(house);
        const responseBody = {
            ad,
            house
        };

        res.json(responseBody);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getHouse=async(wallet,houseId)=>{

    try {
        const user = await User.findOne({ walletAddress:wallet });
        // throw exception("User is not present");

        const house = user.houses.find(house => house.id === houseId);
        return house;        
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;
