import { useContext, useState } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import Modal from './components/UI/Modal';
import Button from './components/UI/Button';
import CartContext, { CartContextProvider } from './store/CartContext';

const CurrencyFormater = (value) => {
  return new Intl.NumberFormat("et-EE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

const AppContent = () => {
  const cartCtx = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = () => {
    if (cartCtx.items.length === 0) {
      return;
    }

    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleClearCart = () => {
    cartCtx.clearCart();
    handleCloseCart();
  };

  return (
    <>
      <Header onOpenCart={handleOpenCart} />
      <Meals />
      <Modal open={isCartOpen} onClose={handleCloseCart}>
        <div className="cart">
          <h2>Your Cart</h2>
          <ul>
            {cartCtx.items.map((item) => (
              <li key={item.id} className="cart-item">
                <p>
                  {item.name} - {CurrencyFormater(item.price)} x {item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <p className="cart-total">{CurrencyFormater(cartCtx.cartTotal)}</p>
          <p className="modal-actions">
            <Button textOnly onClick={handleClearCart}>Clear Cart</Button>
            <Button textOnly onClick={handleCloseCart}>Close</Button>
          </p>
        </div>
      </Modal>
    </>
  );
};

const App = () => {
  return (
    <CartContextProvider>
      <AppContent />
    </CartContextProvider>
  );
};

export default App;
