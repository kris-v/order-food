import { createContext, useState } from "react";

const CartContext = createContext({
	items: [],
	cartItemsCount: 0,
	cartTotal: 0,
	addItem: () => {},
	clearCart: () => {},
});

export const CartContextProvider = ({ children }) => {
	const [items, setItems] = useState([]);

	const addItem = (item) => {
		setItems((prevItems) => {
			const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

			if (!existingItem) {
				return [...prevItems, { ...item, quantity: 1 }];
			}

			return prevItems.map((cartItem) =>
				cartItem.id === item.id
					? { ...cartItem, quantity: cartItem.quantity + 1 }
					: cartItem
			);
		});
	};

	const clearCart = () => {
		setItems([]);
	};

	const cartItemsCount = items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + (item.quantity || 0);
	}, 0);

	const cartTotal = items.reduce((sum, item) => {
		return sum + item.price * item.quantity;
	}, 0);

	return (
		<CartContext.Provider value={{ items, cartItemsCount, cartTotal, addItem, clearCart }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;