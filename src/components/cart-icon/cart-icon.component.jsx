import { useContext } from 'react';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  
    return (
      <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon' />
        <ItemCount>{cartCount}</ItemCount>
      </CartIconContainer>
    );
  };

/*const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'></ShoppingIcon>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
};*/

export default CartIcon;