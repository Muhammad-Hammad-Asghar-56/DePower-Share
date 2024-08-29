import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { useContractContext } from "../Context/ContractContext";
import { useUserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
// import { useUserContext } from '../Context/UserContext';
import { getUser } from '../BackendApi/Users';

const PlaceOrder = ({ adId, maxUnits=0, pricePerUnit=100, close }) => {
  const navigator=useNavigate();
  const { register, handleSubmit, watch, formState: { errors },setError } = useForm();
  const [selectedHouse, setSelectedHouse] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState({}); // Initialize with an empty object
  const { data,setData } = useUserContext();
  const { MarketplaceContractManager } = useContractContext();
  const numberOfUnits = watch('numberOfUnits');


  const handleHouseChange = (event) => {
    console.log(selectedHouse);
    setSelectedHouse(data?.houses[event.target.selectedIndex-1]);
  };

  const handleCouponChange = (event) => {
    const selectedIndex = event.target.selectedIndex - 1; // Subtract 1 to adjust for the placeholder option
    const selectedCoupon = coupons[selectedIndex] || {}; // Default to an empty object if no coupon is selected
    setSelectedCoupon(selectedCoupon);
  };

  useEffect(() => {
    console.log(data);
    setCoupons([
        data?.personalCoupons?.Coupon2,
        data?.personalCoupons?.Coupon5,
        data?.personalCoupons?.Coupon10,
    ]);

    if (data && data?.houses.length > 0) {
      setSelectedHouse(data.houses[0]);
    }
  }, [data]);

  const onSubmit = async (submitData) => {
    try {
      if(selectedCoupon.numOfCoupons < 1){
        setError('coupon', {
            type: 'manual',
            message: 'No available coupons for the selected discount.'
          });
        return;
      }
      
      let couponNum=0;
      if(selectedCoupon){
        switch (selectedCoupon.disc) {
            case 2:
                couponNum=1;
                break;
            case 5:
                couponNum=2;
                break;
            case 10:
                couponNum=3;
                break;
            default:
                break;
        }
      }
      const userDetails = await getUser(data.walletAddress);
      console.log(userDetails);
      setData(userDetails);
      if(!selectedHouse){
        alert("Select House before placing an order");
        return;
      }
      await MarketplaceContractManager.placeOrder(adId,selectedHouse?.id,Number(submitData.numberOfUnits), couponNum);
      navigator("/Marketplace");
    } catch (exception) {
      console.log(exception);
      alert(exception);
    }
  };
  const validateUnits = (value) => {
    if (value > selectedHouse.powerUnits) {
      return `Cannot exceed ${selectedHouse.powerUnits} power units available for the selected house.`;
    }
    return true;
  };
  const calculateFinalAmount = () => {
    if (pricePerUnit && numberOfUnits) {
      const total = parseFloat(pricePerUnit) * parseFloat(numberOfUnits);
      const fee = total * 0.02; // 2% platform fee
      const disc = fee * (selectedCoupon.disc || 0) / 100;
      return total + fee - disc;
    }
    return 0;
  };

  return (
    <div className="w-full p-4 z-0">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        <div>
          <label htmlFor="houseAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">House Address</label>
          <select
            id="houseAddress"
            value={selectedHouse.houseAddress}
            onChange={handleHouseChange}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {data?.houses?.map((house) => (
              <option key={house.id} value={house.houseAddress}>
                {house.houseAddress}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="numberOfUnits" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Units</label>
          <input
            id="numberOfUnits"
            type="number"
            {...register('numberOfUnits', { 
                required: 'Number of units is required',
                validate: validateUnits 
              })}
              max={maxUnits}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter number of units"
          />
           {errors.numberOfUnits && <p className="text-red-600 text-sm mt-1">{errors.numberOfUnits.message}</p>}
        </div>

        <div>
          <label htmlFor="coupon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon</label>
          <select
            id="coupon"
            value={selectedCoupon.disc}
            onChange={handleCouponChange}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a coupon</option>
            {coupons?.map((coupon, index) => (
              <option key={index} value={coupon?.disc}>
                {coupon?.disc}% off on Fee
              </option>
            ))}

          </select>
          {errors.coupon && <p className="text-red-600 text-sm mt-1">{errors.coupon.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="terms"
            type="checkbox"
            {...register('terms', { required: 'You must agree to the terms and conditions' })}
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="terms" className="text-sm font-medium text-gray-900 dark:text-white">
            I agree to the <a href="/terms" className="text-blue-500 hover:underline">terms and conditions</a>.
          </label>
          {errors.terms && <p className="text-red-600 text-sm mt-1">{errors.terms.message}</p>}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          A 2% platform fee will be applied to the total amount.
        </p>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Place Demand{calculateFinalAmount().toFixed(2) > 0 ? ` - Total: ${calculateFinalAmount().toFixed(2)}` : ""}
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
