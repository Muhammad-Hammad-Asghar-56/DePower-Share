import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Datepicker from "react-tailwindcss-datepicker";
import { useContractContext } from "../Context/ContractContext";
import { useUserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const PlaceDemandPage = ({ close }) => {
  const navigator = useNavigate();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [date, setDate] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState('');
  const { data } = useUserContext();
  const { MarketplaceContractManager } = useContractContext();

  // Watch pricePerUnit and numberOfUnits for changes
  const pricePerUnit = watch('pricePerUnit');
  const numberOfUnits = watch('numberOfUnits');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleHouseChange = (event) => {
    setSelectedHouse(event.target.value);
  };

  useEffect(() => {
    console.log(data);
    if (data && data.houses.length > 0) {
      setSelectedHouse(data.houses[0].houseAddress);
    }
  }, [data]);

  const onSubmit = (submitData) => {
    try {
      const placeDemandCall = async (houseId, demandUnits, pricePerUnit,date) => {
        await MarketplaceContractManager.registerListing(houseId,Number(demandUnits),Number( pricePerUnit),date);
      }

      const house = data?.houses.find((item) => item.houseAddress === selectedHouse);
      
      placeDemandCall(house.id, submitData.numberOfUnits, submitData.pricePerUnit,date.startDate);
    }
    catch(exception) {
        console.log(exception);
        alert(exception);
    }
  };

  const calculateFinalAmount = () => {
    
    if (pricePerUnit && numberOfUnits) {
      const total = parseFloat(pricePerUnit) * parseFloat(numberOfUnits);
      const fee = total * 0.02; // 2% platform fee
      return total + fee;
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
            value={selectedHouse}
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
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
          <div className="relative border border-gray-300 rounded-lg">
            <Datepicker
              value={date}
              useRange={false}
              onChange={handleDateChange}
              showShortcuts={false}
              asSingle={true}
              popoverDirection="down"
            />
          </div>
        </div>
        <div>
          <label htmlFor="pricePerUnit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price per Unit</label>
          <input
            id="pricePerUnit"
            type="number"
            step="0.01"
            {...register('pricePerUnit', { required: 'Price per unit is required' })}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter price per unit"
          />
          {errors.pricePerUnit && <p className="text-red-600 text-sm mt-1">{errors.pricePerUnit.message}</p>}
        </div>

        <div>
          <label htmlFor="numberOfUnits" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Units</label>
          <input
            id="numberOfUnits"
            type="number"
            {...register('numberOfUnits', { required: 'Number of units is required' })}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter number of units"
          />
          {errors.numberOfUnits && <p className="text-red-600 text-sm mt-1">{errors.numberOfUnits.message}</p>}
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
          Place Demand{calculateFinalAmount().toFixed(2) > 0 ? `- Total: ${calculateFinalAmount().toFixed(2)}` : ""}
        </button>
      </form>
    </div>
  );
};

export default PlaceDemandPage;
