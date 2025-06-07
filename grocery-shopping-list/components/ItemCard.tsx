
import React from 'react';
import { ShoppingItem } from '../types';

interface ItemCardProps {
  item: ShoppingItem;
  listType: 'toBuy' | 'bought';
  onToggleItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
}

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const ArrowUturnLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.243.032 3.223.096M15 5.79 15 5.25a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v.54A48.11 48.11 0 0 0 3 5.79m12 0H3" />
  </svg>
);


const ItemCard: React.FC<ItemCardProps> = ({ item, listType, onToggleItem, onDeleteItem }) => {
  const itemTextStyle = listType === 'bought' ? 'line-through text-slate-500' : 'text-slate-800';
  const cardBgStyle = listType === 'bought' ? 'bg-slate-50 opacity-80' : 'bg-white';

  return (
    <div className={`flex items-center justify-between p-4 ${cardBgStyle} shadow-md rounded-lg mb-3 transition-all duration-150 ease-in-out`}>
      <div className="flex-grow">
        <p className={`text-lg font-medium ${itemTextStyle}`}>{item.name}</p>
        {listType === 'bought' && item.boughtAt && (
          <p className="text-xs text-slate-400">
            Bought on: {new Date(item.boughtAt).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleItem(item.id)}
          title={listType === 'toBuy' ? 'Mark as Bought' : 'Buy Again'}
          className={`p-2 rounded-full transition-colors duration-150 ease-in-out group focus:outline-none focus:ring-2 focus:ring-offset-2 
            ${listType === 'toBuy' 
              ? 'hover:bg-green-100 text-green-500 hover:text-green-700 focus:ring-green-500' 
              : 'hover:bg-sky-100 text-sky-500 hover:text-sky-700 focus:ring-sky-500'}`}
        >
          {listType === 'toBuy' ? <CheckCircleIcon /> : <ArrowUturnLeftIcon />}
{/* Fix: Corrected closing tag for button. Was </a<ctrl63> */}
        </button>
        <button
          onClick={() => onDeleteItem(item.id)}
          title="Delete Item"
          className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors duration-150 ease-in-out group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
