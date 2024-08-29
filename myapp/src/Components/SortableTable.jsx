import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SortableTable = ({ data=null }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'asc' });
    const navigate = useNavigate();

    
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        if(!data){
            return;
        }
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const handleButtonClick = (item) => {
        navigate(`/BidDemand/${item._id}`);
    };

    return (
        <div className="overflow-x-auto rounded">
            <table className="min-w-full divide-y divide-gray-200 rounded-t-table">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            onClick={() => requestSort('buyerId')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Buyer ID
                            {sortConfig.key === 'buyerId' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                        </th>
                        <th
                            onClick={() => requestSort('numberOfUnits')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Number of Units
                            {sortConfig.key === 'numberOfUnits' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                        </th>
                        <th
                            onClick={() => requestSort('pricePerUnit')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Price per Unit
                            {sortConfig.key === 'pricePerUnit' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                        </th>

                        <th
                            onClick={() => requestSort('time')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            Time
                            {sortConfig.key === 'time' && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData?.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{item.consumer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.demandUnits}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.pricePerUnit}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.status==="Live"? <button
                                    onClick={() => handleButtonClick(item)}
                                    className="text-blue-500 hover:underline"
                                >
                                    View Details
                                </button>:
                                    item.status
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

SortableTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            numberOfUnits: PropTypes.number.isRequired,
            pricePerUnit: PropTypes.number.isRequired,
            consumer: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SortableTable;
