import { useReducer } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './store/CartContext';

const initialCartState = {
  items: [],
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const itemToAdd = action.item;
    const existingItem = state.items.find((item) => item.id === itemToAdd.id);

    if (existingItem) {
      const updatedItems = state.items.map((item) =>
        item.id === itemToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        items: updatedItems,
      };
    }

    return {
      ...state,
      items: [...state.items, { ...itemToAdd, quantity: 1 }],
    };
  }

  return state;
};

const App = () => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState);

  const handleAddItem = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };

  return (
    <CartContextProvider items={cartState.items} addItem={handleAddItem}>
      <Header />
      <Meals />
    </CartContextProvider>
  );
};

export default App;
