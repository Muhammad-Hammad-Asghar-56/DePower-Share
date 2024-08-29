import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import metamaskLog from "../assets/metamask.svg";
import { useUserContext } from '../Context/UserContext'; // Adjust path as needed
import {useContractContext} from "../Context/ContractContext";


const NavBar = () => {
  const navigator=useNavigate();
  const { data, setData } = useUserContext();
  const [isRequesting, setIsRequesting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {userRegistoryContractManager} = useContractContext();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const cryptoButton = async () => {
    const { ethereum } = window;
    if (!ethereum || !ethereum.isMetaMask) {
      alert("MetaMask is not installed");
      return;
    }

    if (isRequesting) {
      alert("Already processing a request. Please wait.");
      return;
    }

    setIsRequesting(true);

    try {
      await ethereum.request({ method: "eth_requestAccounts" });

      
      await userRegistoryContractManager.setSigner();
      
      let data = await userRegistoryContractManager.registerUser(); // Register the user
      const { walletAddress, loyalityPoints, personalCoupons, houses } = data;
      const userDataBody={
        walletAddress:walletAddress,
        loyalityPoints: loyalityPoints? loyalityPoints:0,
        personalCoupons:personalCoupons,
        houses:houses
      }
      
      Cookies.set('userData', JSON.stringify(userDataBody), { expires: 1, path: '/' });
      setData(userDataBody);

      alert("User Login");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    Cookies.remove('userData');
    setData(null); // Clear user data context
    setIsDropdownOpen(false);
    navigator("/")
  };

  return (
    <div className="fixed px-16 top-0 left-0 right-0 bg-white shadow-sm">
      <div className='flex flex-row mr-10 gap-2 py-4 items-center justify-between w-full'>
        <div className='flex flex-row gap-10 items-center justify-center'>
          <p className='text-xl font-semibold'>
            <span className='text-lightOrange'>De</span>Power
          </p>
          <Link to="/dashboard" className='hover:text-lightOrange hover:scale-105 transition-transform duration-300'>
            Dashboard
          </Link>
          <Link to="/marketplace" className='hover:text-lightOrange hover:scale-105 transition-transform duration-300'>
            Properties
          </Link>
        </div>

        <div className='relative'>
          {data ? (
            <>
              <button
                id="dropdownDefaultButton"
                type="button"
                onClick={toggleDropdown}
                className="text-white bg-lightOrange hover:bg-lightOrangeDark focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <img src={metamaskLog} width={20} height={20} alt="MetaMask" />
                <span className='ml-3'>{data?.walletAddress?.substring(0, 10)}...</span>
              </button>

              {isDropdownOpen && (
                <div id="dropdown" className="absolute right-0 z-5000 bg-white divide-y divide-gray-100 rounded-lg shadow w-40">
                  <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 w-full text-left hover:bg-gray-100">My Profile</Link>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 w-full text-left hover:bg-gray-100">Settings</a>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Sign out</button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={cryptoButton}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:lightOrange focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
