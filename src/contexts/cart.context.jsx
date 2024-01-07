import { createContext, useState } from 'react';
/* */
const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd 
    // (track whether or not the item matches one that we're trying to add)
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

    // if found, increment quantity and return new array of products; otherwise skip
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
            /// ...cartItem --> spreading thru all properties of the cartItem
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    // return new array with modified cartItems/ new cart item
    // ... means all items
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addItemToCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};