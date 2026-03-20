import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const dish = props.meal;
    const FormattedPrice = new Intl.NumberFormat("et-EE", { style: "currency", currency: "EUR" })
        .format(Number(dish.price));

    const handleAddMealToCart = () => {
        cartCtx.addItem(dish);
    };

    return (
        <li className="meal-item">
            <article>
                <img src={require(`../assets/${dish.image}`)} alt={dish.name}/>
                <div>
                    <h3>{dish.name}</h3>
                    <p className="meal-item-price">{FormattedPrice}</p>
                    <p className="meal-item-description">{dish.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
        
    )
}

export default MealItem