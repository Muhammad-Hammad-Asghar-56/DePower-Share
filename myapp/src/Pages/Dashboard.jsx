import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import copyLogo from "../assets/copy.svg";
import tick from "../assets/tick.svg";
import trophy from "../assets/trophy.svg";
import DiscountCoupon from "../Components/DiscountCoupon";
import { Timeline, TimelineChild } from '../Components/Timeline';
import Modal from '../Components/Modal';
import RadeemCouponsOption from '../Components/RadeemCouponsOption';
import SimpleImg from "../assets/SimpleDiscountCoupon.svg";
import MediumImg from "../assets/MediumDiscountCoupon.svg";
import PremiumImg from "../assets/PremiumDiscountCoupon.svg";

import { useUserContext } from '../Context/UserContext'; // Adjust path as needed
const Dashboard = () => {
  const { data, setData } = useUserContext();
  const [copyStatus, setCopyStatus] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const couponsLogo = [SimpleImg,MediumImg,PremiumImg]
  
  
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const copyToClipboard = () => {
    if (data?.walletAddress) {  // Changed to data?.walletAddress
      navigator.clipboard.writeText(data.walletAddress)
        .then(() => {
          setCopyStatus(true);  // Set the status to true on success
          setTimeout(() => {
            setCopyStatus(false);  // Revert back to false after 3 seconds
          }, 3000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };
  
  useEffect(()=>{
    console.log(data);
  },[data])


  return (
    <div>
      <div className='text-lg mt-20 flex items-center pt-4'>
        <span className='font-semibold text-lightOrangeDark'>User Id :</span>
        <span className='ml-2 text-gray-400'>{data?.walletAddress.substring(0, 10)}....</span>
        <img
          onClick={copyToClipboard}
          src={copyStatus ? tick : copyLogo}
          alt="Copy"
          width={20}
          height={20}
          className="ml-2 cursor-pointer"
        />
      </div>
      <div className='flex flex-row mt-3 gap-5'>
        <div className="max-w-sm p-6 bg-white border flex flex-row gap-3 items-start border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <img src={trophy} alt="abc" width={30} height={30} />
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Loyality</h5>
            <p className="font-normal text-xl text-lightOrange">{data?.loyalityPoints} XP</p>
            <p className='text-sm text-gray-400'>
              Convert your loyalty points into coupons and redeem discounts on buying
            </p>
            <div className='flex flex-row justify-end h-full mt-2'>
              <button onClick={openDialog} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">Redeem Coupons</button>
            </div>
          </div>
        </div>
        <DiscountCoupon key={0} num={  data?.personalCoupons?.Coupon2.numOfCoupons} text={`${  data?.personalCoupons?.Coupon2.disc}% Coupon`} imgSrc={couponsLogo[0]} />
        <DiscountCoupon key={0} num={  data?.personalCoupons?.Coupon5.numOfCoupons} text={`${  data?.personalCoupons?.Coupon5.disc}% Coupon`} imgSrc={couponsLogo[1]} />
        <DiscountCoupon key={0} num={  data?.personalCoupons?.Coupon10.numOfCoupons} text={`${  data?.personalCoupons?.Coupon10.disc}% Coupon`} imgSrc={couponsLogo[2]} />
      </div>
      <div className='my-5 w-full'>
        <Timeline>
          <TimelineChild timeLinetext="1">
            <div className='border border-orange rounded-lg px-6 py-4'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Verification</h5>
              {/* <p className='text-sm py-1 text-gray-400'>
          To start using our Smart Solar service, you need to verify your identity. This step ensures that your account is secure and compliant with our service requirements.
        </p> */}
              <p className='text-sm py-1 text-gray-400'>
                Connect your ID with Smart Solar to access the service. This verification process is quick and straightforward, and it will provide you with the necessary access to manage your solar assets.
              </p>
              <div className='flex flex-row justify-end h-full mt-2'>
                <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-dark-900 hover:border-lightOrange focus:z-10 focus:ring-4">Verify</button>
              </div>
            </div>
          </TimelineChild>
          <TimelineChild timeLinetext="2">
            <div className='border border-orange rounded-lg px-6 py-4'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Deposit / Trade</h5>
              {/* <p className='text-sm py-3 text-gray-400'>
          Once your identity is verified, you can deposit the units you want to trade. This step involves transferring your solar energy units into our system for tokenization.
        </p> */}
              <p className='text-sm py-1 text-gray-400'>
                This process converts your energy units into digital tokens that can be traded or sold on our marketplace. Ensure you deposit the correct amount of units to facilitate smooth transactions.
              </p>
              <div className='flex flex-row justify-end h-full mt-2'>
                <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-dark-900 hover:border-lightOrange focus:z-10 focus:ring-4">Tokenization</button>
              </div>
            </div>
          </TimelineChild>
          <TimelineChild timeLinetext="3">
            <div className='border border-orange rounded-lg px-6 py-4'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Market</h5>
              {/* <p className='text-sm py-3 text-gray-400'>
          With your units tokenized, you can now engage in the marketplace. This is where you can buy and sell power tokens with other users.
        </p> */}
              <p className='text-sm py-1 text-gray-400'>
                Monitor the market to make strategic decisions on when to buy or sell. Our marketplace offers a range of features to help you maximize your trade opportunities.
              </p>
              <div className='flex flex-row justify-end h-full mt-2'>
                <Link to="/marketplace">
                  <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-dark-900 hover:border-lightOrange focus:z-10 focus:ring-4">Marketplace</button>
                </Link>
              </div>
            </div>
          </TimelineChild>
        </Timeline>
      </div>

      <Modal title={"Coupons"} isOpen={isDialogOpen} onClose={closeDialog}>
        <RadeemCouponsOption />
      </Modal>
    </div>
  );
};

export default Dashboard;