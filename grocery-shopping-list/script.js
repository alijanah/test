
const LOCAL_STORAGE_KEYS = {
  TO_BUY_ITEMS: 'groceryShoppingList_toBuyItems_v1_vanilla',
  BOUGHT_ITEMS: 'groceryShoppingList_boughtItems_v1_vanilla',
};

let toBuyItems = [];
let boughtItems = [];
let searchTerm = '';

// DOM Elements
const addItemForm = document.getElementById('addItemForm');
const itemNameInput = document.getElementById('itemNameInput');
const searchInput = document.getElementById('searchInput');
const toBuyListContainer = document.getElementById('toBuyListContainer');
const boughtListContainer = document.getElementById('boughtListContainer');
const toBuyCountEl = document.getElementById('toBuyCount');
const boughtCountEl = document.getElementById('boughtCount');
const toBuyEmptyMessage = document.getElementById('toBuyEmptyMessage');
const boughtEmptyMessage = document.getElementById('boughtEmptyMessage');
const currentYearEl = document.getElementById('currentYear');

// --- Helper Functions ---
const generateId = () => crypto.randomUUID();

const loadFromLocalStorage = () => {
  const storedToBuy = localStorage.getItem(LOCAL_STORAGE_KEYS.TO_BUY_ITEMS);
  const storedBought = localStorage.getItem(LOCAL_STORAGE_KEYS.BOUGHT_ITEMS);
  toBuyItems = storedToBuy ? JSON.parse(storedToBuy) : [];
  boughtItems = storedBought ? JSON.parse(storedBought) : [];
};

const saveToLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TO_BUY_ITEMS, JSON.stringify(toBuyItems));
  localStorage.setItem(LOCAL_STORAGE_KEYS.BOUGHT_ITEMS, JSON.stringify(boughtItems));
};

// --- Icon SVGs ---
const CheckCircleIcon = () => `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>`;

const ArrowUturnLeftIcon = () => `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </svg>`;

const TrashIcon = () => `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.243.032 3.223.096M15 5.79 15 5.25a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v.54A48.11 48.11 0 0 0 3 5.79m12 0H3" />
  </svg>`;

// --- Rendering Functions ---
const createItemCardHTML = (item, listType) => {
  const isBoughtList = listType === 'bought';
  const itemTextStyle = isBoughtList ? 'item-text-bought' : 'text-slate-800';
  const cardBgStyle = isBoughtList ? 'item-card-bought' : 'bg-white';

  let boughtDateHTML = '';
  if (isBoughtList && item.boughtAt) {
    boughtDateHTML = `<p class="text-xs text-slate-400">Bought on: ${new Date(item.boughtAt).toLocaleDateString()}</p>`;
  }

  const toggleButtonTitle = isBoughtList ? 'Buy Again' : 'Mark as Bought';
  const toggleButtonIcon = isBoughtList ? ArrowUturnLeftIcon() : CheckCircleIcon();
  const toggleButtonClasses = `p-2 rounded-full transition-colors duration-150 ease-in-out group focus:outline-none focus:ring-2 focus:ring-offset-2 icon-button ${
    isBoughtList 
      ? 'hover:bg-sky-100 text-sky-500 hover:text-sky-700 focus:ring-sky-500' 
      : 'hover:bg-green-100 text-green-500 hover:text-green-700 focus:ring-green-500'
  }`;

  return `
    <div class="flex items-center justify-between p-4 ${cardBgStyle} shadow-md rounded-lg mb-3 transition-all duration-150 ease-in-out" data-item-id="${item.id}">
      <div class="flex-grow">
        <p class="text-lg font-medium ${itemTextStyle}">${item.name}</p>
        ${boughtDateHTML}
      </div>
      <div class="flex items-center space-x-2">
        <button 
          title="${toggleButtonTitle}" 
          class="${toggleButtonClasses}" 
          data-action="toggle" 
          aria-label="${toggleButtonTitle} ${item.name}"
        >
          ${toggleButtonIcon}
        </button>
        <button 
          title="Delete Item" 
          class="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors duration-150 ease-in-out group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 icon-button" 
          data-action="delete" 
          aria-label="Delete item ${item.name}"
        >
          ${TrashIcon()}
        </button>
      </div>
    </div>
  `;
};

const renderLists = () => {
  // Filter items
  const lcSearchTerm = searchTerm.toLowerCase();
  const filteredToBuy = toBuyItems.filter(item => item.name.toLowerCase().includes(lcSearchTerm));
  const filteredBought = boughtItems.filter(item => item.name.toLowerCase().includes(lcSearchTerm));

  // Render To Buy List
  toBuyListContainer.innerHTML = filteredToBuy.map(item => createItemCardHTML(item, 'toBuy')).join('');
  toBuyCountEl.textContent = filteredToBuy.length;
  if (filteredToBuy.length === 0) {
    toBuyEmptyMessage.textContent = toBuyItems.length > 0 && searchTerm ? 'No items match your search in the "To Buy" list.' : 'Your shopping list is empty. Add some items!';
    toBuyEmptyMessage.style.display = 'block';
  } else {
    toBuyEmptyMessage.style.display = 'none';
  }

  // Render Bought List
  boughtListContainer.innerHTML = filteredBought.map(item => createItemCardHTML(item, 'bought')).join('');
  boughtCountEl.textContent = filteredBought.length;
  if (filteredBought.length === 0) {
    boughtEmptyMessage.textContent = boughtItems.length > 0 && searchTerm ? 'No items match your search in the "Bought" list.' : 'You haven\'t bought anything yet.';
    boughtEmptyMessage.style.display = 'block';
  } else {
    boughtEmptyMessage.style.display = 'none';
  }
};

const renderApp = () => {
  renderLists();
  saveToLocalStorage();
};

// --- Event Handlers ---
const handleAddItem = (e) => {
  e.preventDefault();
  const itemName = itemNameInput.value.trim();
  if (itemName === '') return;

  const newItem = {
    id: generateId(),
    name: itemName,
  };
  toBuyItems.unshift(newItem); // Add to the beginning of the array
  itemNameInput.value = '';
  renderApp();
};

const handleSearch = (e) => {
  searchTerm = e.target.value;
  renderApp();
};

const handleListClick = (e, listType) => {
  const button = e.target.closest('button[data-action]');
  if (!button) return;

  const itemId = button.closest('[data-item-id]')?.dataset.itemId;
  if (!itemId) return;

  const action = button.dataset.action;

  if (action === 'toggle') {
    if (listType === 'toBuy') {
      const itemIndex = toBuyItems.findIndex(item => item.id === itemId);
      if (itemIndex > -1) {
        const [itemToMove] = toBuyItems.splice(itemIndex, 1);
        itemToMove.boughtAt = Date.now();
        boughtItems.unshift(itemToMove);
      }
    } else { // listType === 'bought'
      const itemIndex = boughtItems.findIndex(item => item.id === itemId);
      if (itemIndex > -1) {
        const [itemToMove] = boughtItems.splice(itemIndex, 1);
        delete itemToMove.boughtAt; // Remove boughtAt timestamp
        toBuyItems.unshift(itemToMove);
      }
    }
  } else if (action === 'delete') {
    if (listType === 'toBuy') {
      toBuyItems = toBuyItems.filter(item => item.id !== itemId);
    } else { // listType === 'bought'
      boughtItems = boughtItems.filter(item => item.id !== itemId);
    }
  }
  renderApp();
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  addItemForm.addEventListener('submit', handleAddItem);
  searchInput.addEventListener('input', handleSearch);
  
  toBuyListContainer.addEventListener('click', (e) => handleListClick(e, 'toBuy'));
  boughtListContainer.addEventListener('click', (e) => handleListClick(e, 'bought'));

  renderApp(); // Initial render
});
