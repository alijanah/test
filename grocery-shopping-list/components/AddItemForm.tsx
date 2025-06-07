
import React, { useState } from 'react';

interface AddItemFormProps {
  onAddItem: (name: string) => void;
}

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemName.trim() === '') return;
    onAddItem(itemName.trim());
    setItemName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="E.g., Apples, Milk, Bread..."
        className="flex-grow p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow"
      />
      <button
        type="submit"
        className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        <PlusIcon />
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
    