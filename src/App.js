import { useReducer, useState } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import Modal from './components/UI/Modal';
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
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddItem = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContextProvider items={cartState.items} addItem={handleAddItem}>
      <Header onOpenCart={handleOpenCart} />
      <Meals />
      <Modal open={isCartOpen} onClose={handleCloseCart}>
        <div className="cart">
          <h2>Your Cart</h2>
          {cartState.items.length === 0 && <p>No items selected yet.</p>}
          {cartState.items.length > 0 && (
            <ul>
              {cartState.items.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          )}
          <form method="dialog" className="modal-actions">
            <button className="text-button" onClick={handleCloseCart}>Close</button>
          </form>
        </div>
      </Modal>
    </CartContextProvider>
  );
};

export default App;
