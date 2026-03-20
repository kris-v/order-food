import { useEffect } from "react";

const Meals = () => {
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const apiUrl = `${window.location.origin
                    .replace("-3000.", "-3001.")
                    .replace(":3000", ":3001")}/meals`;
                const response = await fetch(apiUrl);
                const meals = await response.json();
                console.log(meals);
            } catch (err) {
                console.error("Fetching meals failed", err);
            }
        };

        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            { 
                // list of meals
            }
        </ul>
    )
}

export default Meals