import { useEffect, useState } from "react";
import MealItem from "./MealItem";

const Meals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const apiUrl = `${window.location.origin
                    .replace("-3000.", "-3001.")
                    .replace(":3000", ":3001")}/meals`;
                const response = await fetch(apiUrl);
                const loadedMeals = await response.json();
                setMeals(loadedMeals);
            } catch (err) {
                console.error("Fetching meals failed", err);
            }
        };

        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            {meals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}

export default Meals