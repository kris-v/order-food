import { createContext, useEffect } from "react";

const CartContext = createContext({
	items: [],
	cartItemsCount: 0,
	addItem: () => {},
});

export const CartContextProvider = ({ children, items, addItem }) => {
	useEffect(() => {
		console.log("Cart updated:", items);
	}, [items]);

	const cartItemsCount = items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + (item.quantity || 0);
	}, 0);

	return (
		<CartContext.Provider value={{ items, cartItemsCount, addItem }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
