import React, { useEffect, useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import PlaceDemandPage from './PlaceDemandPage';
import Modal from '../Components/Modal';
import SortableTable from '../Components/SortableTable';
import {useMarketData} from "../Context/MarketplaceContext";
import {getAllAds} from "../BackendApi/Ads";

const Marketplace = () => {
    const [value, setValue] = React.useState({
        startDate: null,
        endDate: null
    });
    const {list,setList} = useMarketData();


    const handleValueChange = (newValue) => {
        setValue(newValue);
        handleFilter(newValue);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    useEffect(()=>{
        const getMarketPlaceAds = async () => {
            const result = await getAllAds();
            setList(result)
        }
        // Fetch data immediately
        getMarketPlaceAds();
    
        // Poll data every 10 seconds
        const interval = setInterval(() => {
            getMarketPlaceAds();
        }, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    },[])

    return (
        <div className="p-4 mt-20">
            <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4 mb-6">
                <p className="text-2xl font-bold text-gray-800 mb-2">Place Your Demand</p>
                <p className="text-sm text-gray-600 mb-4">
                    Are you searching for specific power types or a particular supplier? Share your requirements with us, and we’ll assist you in finding the perfect match in our marketplace.
                </p>
                <button
                    type="button"
                    onClick={()=>openDialog()}
                    className="py-2.5 px-5 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Place Demand
                </button>
            </div>
            <h1 className='text-3xl font-bold mb-4'>Marketplace</h1>
            <div className="flex flex-row w-full items-center mb-4">
                <div className="relative w-3/4 mr-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="search"
                        className="block w-full px-10 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search for power options..."
                        required
                    />
                </div>
                <div className='w-1/4 border rounded-lg'>
                    <Datepicker
                        value={value}
                        useRange={false}
                        onChange={handleValueChange}
                        showShortcuts={false}
                        asSingle={true}
                        popoverDirection="down" // Ensures the popup opens to the left side            
                    />
                
                </div>
            </div>

            <SortableTable data={list} />
            <Modal title={"Place Demand"} isOpen={isDialogOpen} onClose={closeDialog}>
                <PlaceDemandPage close={closeDialog}/>
            </Modal>
        </div>
    );
};

export default Marketplace;
