const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');
const User = require("../Models/User");
const Ad = require("../Models/Ad");
// Route to get all orders
router.get('/get', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  const { orderId, _consumer, _producer, houseId, discountPercentage, numOfUnits, adId } = req.body;

  const newOrder = new Order({
    orderId,
    _consumer,
    _producer,
    discountPercentage,
    numOfUnits,
    adId
  });

  try {
    console.log("----------------------------------------------------------------------------");

    let supplier = await User.findOne({ walletAddress: _producer });
    let consumer = await User.findOne({ walletAddress: _consumer });

    let ad = await Ad.findOne({ id: adId });

    if (!(supplier) || !(consumer)) {
      return res.status(404).json({ message: 'Invalid Wallet Address' });
    }

    // Find the house in the supplier's houses array by houseId
    let house = supplier.houses.find(h => h.id === houseId);
    let consumerHouse = consumer.houses.find(h => h.id == ad.houseAddress);
    
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    if (house.powerUnits < numOfUnits) {  // check if the supplier have the units
      return res.status(400).json({ message: 'Not enough power units' });
    }
    house.powerUnits -= numOfUnits;           //  deduct the num of units from supplier

    consumerHouse.powerUnits+=numOfUnits;     //    Add units into the new house
    ad.arrangedUnits+=numOfUnits;             //    Update the Ad
    supplier.loyalityPoints += numOfUnits;    //    Give the loyality points to supplier


    if(ad.arrangedUnits === ad.demandUnits){ // update the ad status
      ad.status='Sold';
    }

    // Save the updated Supplier Consumer & Ad
    await supplier.save();
    await consumer.save();
    await ad.save();

    const savedOrder = await newOrder.save(); // list down the order
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;