import { createContext, useEffect, useState } from "react";

const CartContext = createContext({
	items: [],
	cartItemsCount: 0,
	addItem: () => {},
});

export const CartContextProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		console.log("Cart updated:", cartItems);
	}, [cartItems]);

	const addItem = (item) => {
		setCartItems((prevItems) => {
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

	const cartItemsCount = cartItems.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity;
	}, 0);

	return (
		<CartContext.Provider value={{ items: cartItems, cartItemsCount, addItem }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
