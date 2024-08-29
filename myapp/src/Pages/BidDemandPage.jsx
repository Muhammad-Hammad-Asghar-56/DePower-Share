import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import powerBattery from "../assets/power-battery.svg";
import { useContractContext } from "../Context/ContractContext";
import Modal from '../Components/Modal';
import PlaceOrder from '../Components/PlaceOrder';

const BidDemandPage = () => {
  const { ad } = useParams();
  const [remainingTime, setRemainingTime] = useState(0);
  const [location, setLocation] = useState([0, 0]);
  const [address, setAddress] = useState("Lahore");
  const [zoomLevel, setZoomLevel] = useState(13);
  const { MarketplaceContractManager } = useContractContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [body, setBody] = useState(null);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    const updateRemainingTime = () => {
      const deadline = new Date(body?.date);
      const now = new Date();
      const timeDifference = deadline - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setRemainingTime('Expired');
      }
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);
    
    return () => clearInterval(timer);
  }, [body?.date]);

  useEffect(() => {
    const getAdDetails = async (adId) => {
      const data = await MarketplaceContractManager.getAdDetails(adId);
      setBody(data.ad);
      setAddress(data?.house.houseAddress)
    }
    getAdDetails(ad);
  }, [ad, MarketplaceContractManager]);

  useEffect(() => {
    const fetchCoordinates = async (address) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: address,
              format: 'json',
              limit: 1
            }
          }
        );
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLocation([parseFloat(lat), parseFloat(lon)]);
          setZoomLevel(15);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    if (body?.houseAddress) {
      fetchCoordinates(body.houseAddress);
    }
  }, [body?.houseAddress]);

  const MapView = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(location, zoomLevel);
    }, [location, zoomLevel, map]);

    return null;
  };

  return (
    <div className="mt-24 mb-20">
      <h1 className="text-2xl font-semibold mb-4">Buyer Demand</h1>
      <div className="mb-4 p-4 border border-gray-300 rounded-lg">
        <div>

        <p className="text-lg mb-2"><strong>Buyer ID:</strong> {body?.consumer}</p>
        <p className="text-lg mb-2"><strong>Address:</strong> {address}</p>
        <p className="text-lg mb-2"><strong>Unit Price:</strong> ${body?.pricePerUnit} / kwh</p>
        <p className="text-lg mb-2"><strong>Remaining Demand:</strong> {body?.demandUnits - body?.arrangedUnits} KW</p>
        <p className="text-lg mb-2"><strong>Total Units:</strong> {body?.demandUnits} KW</p>
        </div>
        {/* <div className='w-1/2'>
          <MapContainer center={location} zoom={zoomLevel} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={location}>
              <Popup>
                {body?.address}
              </Popup>
            </Marker>
            <MapView />
          </MapContainer>
        </div> */}
      </div>

      <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
        <span className="text-xl font-semibold mb-2">Demand will close in </span>
        <span className="text-lg font-bold text-red-600">{remainingTime}</span>
      </div>
      {/* <div className="mt-6 h-48">
        
      </div> */}

      <button
        onClick={openDialog}
        className= {`${body?.arrangedUnits==body?.demandUnits ? "disable":""}  mt-4 py-2 px-4 w-full flex justify-center items-center gap-5 text-lg text-customBlack hover:text-white hover:bg-orange-400 rounded bg-lightOrangeDark`}
      >
        <img src={powerBattery} alt="" className='h-10 w-10' />
        Deliver Power
      </button>
      
      <Modal title={"Coupons"} isOpen={isDialogOpen} onClose={closeDialog}>
        <PlaceOrder adId={body?.id} maxUnits={body?.demandUnits-body?.arrangedUnits}/>
      </Modal>
    </div>
  );
};

export default BidDemandPage;
