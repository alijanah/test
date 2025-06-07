import React, { useState, useCallback } from 'react';
import { ShoppingItem } from './types';
import { LOCAL_STORAGE_KEYS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import AddItemForm from './components/AddItemForm';
import ItemCard from './components/ItemCard';

// Helper for generating unique IDs
const generateId = (): string => crypto.randomUUID();

const App: React.FC = () => {
  const [toBuyItems, setToBuyItems] = useLocalStorage<ShoppingItem[]>(LOCAL_STORAGE_KEYS.TO_BUY_ITEMS, []);
  const [boughtItems, setBoughtItems] = useLocalStorage<ShoppingItem[]>(LOCAL_STORAGE_KEYS.BOUGHT_ITEMS, []);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddItem = useCallback((name: string) => {
    if (name.trim() === '') return;
    const newItem: ShoppingItem = {
      id: generateId(),
      name: name.trim(),
    };
    setToBuyItems(prevItems => [newItem, ...prevItems]);
  }, [setToBuyItems]);

  const handleToggleItem = useCallback((itemId: string) => {
    const itemInToBuy = toBuyItems.find(item => item.id === itemId);
    if (itemInToBuy) {
      setToBuyItems(prevItems => prevItems.filter(item => item.id !== itemId));
      setBoughtItems(prevItems => [{ ...itemInToBuy, boughtAt: Date.now() }, ...prevItems]);
    } else {
      const itemInBought = boughtItems.find(item => item.id === itemId);
      if (itemInBought) {
        setBoughtItems(prevItems => prevItems.filter(item => item.id !== itemId));
        // When moving back to "To Buy", remove boughtAt or create new object without it
        const { boughtAt, ...restOfItem } = itemInBought;
        setToBuyItems(prevItems => [restOfItem, ...prevItems]);
      }
    }
  }, [toBuyItems, setToBuyItems, boughtItems, setBoughtItems]);

  const handleDeleteItem = useCallback((itemId: string, listType: 'toBuy' | 'bought') => {
    if (listType === 'toBuy') {
      setToBuyItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      setBoughtItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }
  }, [setToBuyItems, setBoughtItems]);

  const filteredToBuyItems = toBuyItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBoughtItems = boughtItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-sky-600 tracking-tight">
            My Grocery List
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Plan your shopping trips with ease.
          </p>
        </header>

        <AddItemForm onAddItem={handleAddItem} />

        <div className="mb-8">
           <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow mb-6"
            aria-label="Search shopping items"
          />
        </div>


        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6 pb-2 border-b-2 border-sky-200">
            To Buy ({filteredToBuyItems.length})
          </h2>
          {filteredToBuyItems.length === 0 ? (
            <p className="text-slate-500 text-center py-4">
              {toBuyItems.length > 0 && searchTerm ? 'No items match your search in the "To Buy" list.' : 'Your shopping list is empty. Add some items!'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredToBuyItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  listType="toBuy"
                  onToggleItem={handleToggleItem}
                  onDeleteItem={(itemId) => handleDeleteItem(itemId, 'toBuy')}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-6 pb-2 border-b-2 border-slate-200">
            Bought ({filteredBoughtItems.length})
          </h2>
          {filteredBoughtItems.length === 0 ? (
            <p className="text-slate-500 text-center py-4">
               {boughtItems.length > 0 && searchTerm ? 'No items match your search in the "Bought" list.' : 'You haven\'t bought anything yet.'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredBoughtItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  listType="bought"
                  onToggleItem={handleToggleItem}
                  onDeleteItem={(itemId) => handleDeleteItem(itemId, 'bought')}
                />
              ))}
            </div>
          )}
        </section>

         <footer className="mt-12 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Shopping List App. Happy Shopping!</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
