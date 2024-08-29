import React from 'react';
import { useUserContext } from '../Context/UserContext';
import { useContractContext } from "../Context/ContractContext";

const HouseTable = () => {
  const { data, setData } = useUserContext();
  const { userRegistoryContractManager } = useContractContext();

  const handleDelete = (houseId) => {
    const deleteHouse = async (houseId) => {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        
        debugger;
        const status = await userRegistoryContractManager.deleteHouse(houseId);

        setData(prevData => {
          const newHouses = prevData.houses.filter(house => house.id !== houseId);

          return {
            ...prevData,
            houses: newHouses
          };
        });

      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again.");
      }
    }

    deleteHouse(houseId);
  };

  const updateUnits = (houseId) => {
    const updateHouseUnits = async (unitId) => {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        debugger;
        const units = await userRegistoryContractManager.updatePowerUnits(houseId); // Register the user


        // Update local state
        setData(prevData => {
          const newHouses = prevData.houses.map(house =>
            house.id === houseId
              ? { ...house, powerUnits: house.powerUnits + units }
              : house
          );

          console.log(newHouses);

          return {
            ...prevData,
            houses: newHouses
          };
        });

        debugger;
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again.");
      }
    }

    updateHouseUnits(houseId);
  }

  return (
    <div className="py-4">
      <table className="min-w-full bg-white border-y border-gray-200">
        <thead>
          <tr className="w-full bg-gray-50 text-gray-800 text-left">
            <th className="py-2 px-4 border-b">House Address</th>
            <th className="py-2 px-4 border-b">Number of Units</th>
            <th className="py-2 px-4 border-b">SolarNet Unit Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.houses?.map((house, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{house.houseAddress}</td>
              <td className="py-2 px-4 border-b">{house.powerUnits} kwh</td>

              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => updateUnits(house.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  Update
                </button>
              </td>

              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(house.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HouseTable;
