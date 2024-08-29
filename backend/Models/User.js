const mongoose = require('mongoose');
const houseSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    houseAddress: { type: String, required: true },
    powerUnits: { type: Number, default: 0 },
});
const couponSchema = new mongoose.Schema({
    disc: { type: Number, required: true },
    numOfCoupons: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
    walletAddress: { type: String, unique: true, required: true },
    loyalityPoints: { type: Number, default: 10000 },
    houses: [houseSchema],
    personalCoupons: {
        Coupon2: { type: couponSchema, default: { disc: 2, numOfCoupons: 0 } },
        Coupon5: { type: couponSchema, default: { disc: 5, numOfCoupons: 0 } },
        Coupon10: { type: couponSchema, default: { disc: 10, numOfCoupons: 0 } }
    }
});

module.exports = mongoose.model('User', userSchema);
