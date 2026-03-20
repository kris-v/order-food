const MealItem = (props) => {
    const dish = props.meal;

    return (
        <li className="meal-item">
            <article>
                <img src={require(`../assets/${dish.image}`)} alt={dish.name}/>
                <div>
                    <h3>{dish.name}</h3>
                    <p className="meal-item-price">${dish.price}</p>
                    <p className="meal-item-description">{dish.description}</p>
                </div>
                <p className="meal-item-actions">
                    <button >Add to Cart</button>
                </p>
            </article>
        </li>
        
    )
}

export default MealItem