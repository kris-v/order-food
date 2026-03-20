// Kas ei oleks parem hoopis siin hoida ostukorvi loogikat, mitte app.js-is?

import { createContext, useEffect } from "react";

const CartContext = createContext({
	items: [],
	cartItemsCount: 0,
	addItem: () => {},
	clearCart: () => {},
});

export const CartContextProvider = ({ children, items, addItem, clearCart }) => {
	useEffect(() => {
		console.log("Cart updated:", items);
	}, [items]);

	const cartItemsCount = items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + (item.quantity || 0);
	}, 0);

	return (
		<CartContext.Provider value={{ items, cartItemsCount, addItem, clearCart }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;