import React, { useState } from 'react';
import { useUserContext } from '../Context/UserContext'; // Adjust path as needed

const couponDetails = {
  2: { name: "2% Coupon (Bronze)", points: 500 },
  5: { name: "5% Coupon (Diamond)", points: 1500 },
  8: { name: "8% Coupon (Premium)", points: 4000 }
};



const RadeemCouponsOption = () => {

  const {data}=useUserContext();
  // const avia
  const [quantities, setQuantities] = useState({
    2: 0,
    5: 0,
    8: 0
  });

  const [checkedCoupons, setCheckedCoupons] = useState({});

  // Calculate the total points required based on checked coupons
  const calculateBilling = () => {
    let totalPoints = 0;
    Object.entries(quantities).forEach(([couponType, quantity]) => {
      if (checkedCoupons[couponType]) {
        const points = couponDetails[couponType]?.points || 0;
        totalPoints += points * quantity;
      }
    });
    return totalPoints;
  };

  // Determine if "+" button should be disabled for a given coupon type
  const isIncrementDisabled = (couponType) => {
    const pointsRequiredForCoupon = couponDetails[couponType]?.points || 0;
    const currentQuantity = quantities[couponType] || 0;
    const totalPointsRequired = calculateBilling();
    const pointsLeft = data.loyalityPoints- totalPointsRequired;

    // Check if adding one more unit of the coupon would exceed available points
    return pointsLeft < pointsRequiredForCoupon && checkedCoupons[couponType];
  };

  // Handler to update quantity based on input changes
  const handleQuantityChange = (couponType, value) => {
    if (value < 0) return; // Prevent negative input values
    setQuantities(prev => ({ ...prev, [couponType]: Number(value) }));
  };

  return (
    <div className='flex flex-col gap-4 text-left'>
      {Object.entries(couponDetails).map(([couponType, { name }]) => (
        <div key={couponType} className="flex items-center  py-2 px-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id={`checkbox-${couponType}`}
            type="checkbox"
            value={couponType}
            name="coupon-checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={!!checkedCoupons[couponType]}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setCheckedCoupons(prev => ({
                ...prev,
                [couponType]: isChecked
              }));
              if (!isChecked) {
                setQuantities(prev => ({
                  ...prev,
                  [couponType]: 0
                }));
              }
            }}
          />
          <label htmlFor={`checkbox-${couponType}`} className="flex-grow py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {name}
          </label>
          
          <div className="relative flex items-center max-w-[8rem]">
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onClick={() => handleQuantityChange(couponType, Math.max(0, (quantities[couponType] || 0) - 1))}
            >
              <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
              </svg>
            </button>
            <input
              type="text"
              value={quantities[couponType] || 0}
              onChange={(e) => handleQuantityChange(couponType, e.target.value)}
              className="bg-gray-50 border border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-16 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0"
              min="0"
              readOnly
            />
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onClick={() => handleQuantityChange(couponType, (quantities[couponType] || 0) + 1)}
              disabled={isIncrementDisabled(couponType)}
            >
              <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300 text-md font-semibold"><span className='text-green-700 font-normal text-lg'>Remaning:</span> {data.loyalityPoints - calculateBilling()} XP</p>
        <p className="text-gray-700 dark:text-gray-300  font-semibold"><span className='text-red-700  font-normal text-lg'> Spend: </span>{calculateBilling()} XP</p>
      </div>
      <button
        onClick={() => console.log("Selected Coupons:", quantities)}
        className="mt-4 py-2 px-4 text-white bg-customBlack rounded hover:bg-lightOrangeDark"
      >
        🎉 Redeem Coupons 🎉
      </button>
    </div>
  );
};

export default RadeemCouponsOption;

