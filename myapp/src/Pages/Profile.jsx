import React, { useEffect, useState } from 'react';
import HouseTable from '../Components/HouseTable';
import add_home from '../assets/add-home.svg';
import Modal from '../Components/Modal';
import { useUserContext } from '../Context/UserContext'; 
import {useContractContext} from "../Context/ContractContext";

const containerStyle = {
    width: '100%',
    height: '400px'
};

const Profile = () => {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [numUnits, setNumUnits] = useState('');
    const {data, setData} = useUserContext();
    const {userRegistoryContractManager} = useContractContext();

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    }


    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleNumUnitsChange = (e) => {
        setNumUnits(e.target.value);
    };

    const addHouse = (e) => {
        e.preventDefault();
        console.log('House Address:', address);
        const updateHouses = async (address) => {
            try {
                await ethereum.request({ method: "eth_requestAccounts" });
                
                const newHouse = await userRegistoryContractManager.addHouse(address); // Register the user
                debugger;
                console.log(newHouse);
                const newHouses = [...data.houses, newHouse];
                
                console.log(newHouses);
                setData({
                    ...data,
                    houses: newHouses
                });
            } catch (error) {
                console.error(error);
                alert("An error occurred. Please try again.");
            }
        }

        updateHouses(address);
    };

    return (
        <div className="p-4 mt-20">
            <div className="flex justify-between items-center mb-4 z-0">
                <div className="flex items-center space-x-4 w-full ">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        type="button"
                        className="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        <img src={add_home} alt="Add Home" className="w-8 h-6 mr-2" />
                        <span className='text-nowrap mr-5'>Add new House</span>
                    </button>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />

                </div>
            </div>
            <HouseTable />

            <Modal isOpen={open} onClose={toggleOpen} title={"Create New House"}>
                <form onSubmit={addHouse}>
                    <div className="mx-2 mb-5 text-left">
                        <label htmlFor="num-units" className="block text-lg font-normal text-gray-700">Enter House Address</label>
                        <input
                            id="num-units"
                            type="text"
                            placeholder="1234 Elm Street Apt 56, Springfield, USA"
                            value={address}
                            onChange={handleAddressChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default Profile;
