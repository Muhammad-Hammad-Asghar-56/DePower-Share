import React from 'react';

const DiscountCoupon = ({ text, num, imgSrc }) => {
    return (
        <div className="relative">
            <div className="bg-white border border-gray-200 py-4 pt-8 px-2 h-full flex flex-col items-center justify-between rounded-lg shadow-md overflow-hidden">
                <img src={imgSrc} alt="Discount Coupon" className="object-cover" width={80} height={80} />
                <div className="p-4">
                    <h2 className="text-lg font-bold">{text}</h2>
                </div>
            </div>
            { (
                <div className="absolute top-1 right-1 bg-red-500 text-white rounded-lg w-8 h-8 flex items-center justify-center text-sm font-bold">
                    x{num}
                </div>
            )}
        </div>
    );
};

export default DiscountCoupon;
