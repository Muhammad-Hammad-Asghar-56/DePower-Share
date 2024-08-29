import React from 'react';
import { motion } from 'framer-motion';
import imageSrc from '../assets/heroImg.jpg';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const HeroPage = () => {
  return (
    <div className="w-full mt-36 flex items-center justify-center mx-auto overflow-hidden">
      <div className="flex flex-col items-start max-w-[44rem]">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-[3.5rem] font-semibold">
            DePower<span className="text-lightOrange"> Share</span>
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mt-[.5rem] text-[1rem]">
            Decentralized Power Shared Grid
          </h2>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mt-[1.5rem]">
            <p>
              Register, manage houses, deposit and withdraw power units, and buy coupons. <br />
              Marketplace for users to place bids and sell power units. <br />
              Smart contracts handle user registration, house management, power unit transactions, and coupon purchases.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <button className="mt-[1.6rem] bg-lightOrange text-white py-2 px-4 rounded-lg hover:bg-lightOrangeDark transition-colors duration-300">
            Explore
          </button>
        </motion.div>
      </div>

      {/* Right side image */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-shrink-0 ml-8"
      >
        <img src={imageSrc} alt="DePower Share" className="w-[300px] rounded-lg h-auto object-cover" />
      </motion.div>
    </div>
  );
};

export default HeroPage;
