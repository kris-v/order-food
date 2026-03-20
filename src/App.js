import { useReducer, useState } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import Modal from './components/UI/Modal';
import Button from './components/UI/Button';
import { CartContextProvider } from './store/CartContext';

const initialCartState = {
  items: [],
};

const CurrencyFormater = (value) => {
  return new Intl.NumberFormat("et-EE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
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

  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      items: [],
    };
  }

  return state;
};

const App = () => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotal = cartState.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handleAddItem = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };

  const handleOpenCart = () => {
    if (cartState.items.length === 0) {
      return;
    }

    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleClearCart = () => {
    dispatchCartAction({ type: 'CLEAR_CART' });
    handleCloseCart();
  };

  return (
    <CartContextProvider items={cartState.items} addItem={handleAddItem} clearCart={handleClearCart}>
      <Header onOpenCart={handleOpenCart} />
      <Meals />
      <Modal open={isCartOpen} onClose={handleCloseCart}>
        <div className="cart">
          <h2>Your Cart</h2>
          <ul>
            {cartState.items.map((item) => (
              <li key={item.id} className="cart-item">
                <p>
                  {item.name} - {CurrencyFormater(item.price)} x {item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <p className="cart-total">{CurrencyFormater(cartTotal)}</p>
          <p className="modal-actions">
            <Button textOnly onClick={handleClearCart}>Clear Cart</Button>
            <Button textOnly onClick={handleCloseCart}>Close</Button>
          </p>
        </div>
      </Modal>
    </CartContextProvider>
  );
};

export default App;
