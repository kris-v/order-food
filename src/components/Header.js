import logo from '../assets/logo.jpg'
import { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

const Header = ({ onOpenCart }) => {
    const cartCtx = useContext(CartContext);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo}/>
                <h1>React Food Order App</h1>
            </div>
            <nav>
            <Button textOnly onClick={onOpenCart}>Cart ({cartCtx.cartItemsCount})</Button>
            </nav>
        </header>
    )
}

export default Header