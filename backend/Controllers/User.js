const User=require("../Models/User");

const registerUser = async (req, res) => {
    const { walletAddress, loyaltyPoints, personalCoupons, houses } = req.body;

    try {
        let user = await User.findOne({ walletAddress });

        if (!user) {
            // Create a new user with initial data
            user = new User({
                walletAddress,
                loyalityPoints: loyaltyPoints,
                personalCoupons: personalCoupons.reduce((acc, coupon) => {
                    const couponKey = `Coupon${coupon.disc}`;
                    acc[couponKey] = {
                        disc: coupon.disc,
                        numOfCoupons: coupon.numOfCoupons
                    };
                    return acc;
                }, {}),
                houses
            });

            await user.save();
        } else {
            // Update existing user
            user.loyalityPoints = loyaltyPoints;
            
            // Update coupons
            if (coupons) {
                user.personalCoupons = coupons.reduce((acc, coupon) => {
                    const couponKey = `Coupon${coupon.disc}`;
                    acc[couponKey] = {
                        disc: coupon.disc,
                        numOfCoupons: coupon.numOfCoupons
                    };
                    return acc;
                }, user.personalCoupons);
            }

            // Update houses
            if (houses) {
                user.houses = houses;
            }

            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserByWallet = async (req, res) => {
    try {
        const user = await User.findOne({ walletAddress: req.params.walletAddress });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const depositUnits = async (req, res) => {
    const { walletAddress, houseId, noOfUnits } = req.body;

    try {
        const user = await User.findOne({ walletAddress });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the house within the user's houses array
        const house = user.houses.find(house => house.id === houseId);
        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }

        house.powerUnits += noOfUnits;
        await user.save();

        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const addHouse = async (req, res) => {
    const { walletAddress, house } = req.body;

    try {
        const user = await User.findOne({ walletAddress });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the house already exists in the user's houses
        const existingHouse = user.houses.find(h => h.id === house.id);
        if (existingHouse) {
            return res.status(400).json({ message: 'House already exists' });
        }

        // Add the new house
        user.houses.push(house);
        await user.save();

        res.status(201).json(house);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const findHouse=async (req, res)=>{
    const { walletAddress } = req.params;
    const { houseAddress } = req.body;

    try {
        // Find the user by wallet address
        console.log(walletAddress);
        const user = await User.findOne({ walletAddress });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the house exists in the user's houses array
        const houseExists = user.houses.some(house => house.houseAddress === houseAddress);
        if (houseExists) {
            return res.status(200).json({ message: 'House exists' });
        } else {
            return res.status(404).json({ message: 'House not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={registerUser,addHouse,depositUnits,getUserByWallet,findHouse}