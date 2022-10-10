import { useState, useCallback, useEffect } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [error, setError] = useState(null);
  const [LOADED_DUMMY_MOVIES, setLOADED_DUMMY_MOVIES] = useState([]);
  const fetchAvailableMeals = useCallback(async () => {
    try {
      const response = await fetch(
        "https://meals-react-1047a-default-rtdb.europe-west1.firebasedatabase.app/DUMMY_MEALS.json"
      );
      if (!response.ok) {
        throw new Error("NO DUMMY ITEMS FOUND");
      }
      const DUMMY_ITEMS2 = await response.json();
      console.log(DUMMY_ITEMS2);
      const responseArray = [];
      for (const key in DUMMY_ITEMS2) {
        responseArray.push({
          key: DUMMY_ITEMS2[key].id,
          id: DUMMY_ITEMS2[key].id,
          name: DUMMY_ITEMS2[key].name,
          description: DUMMY_ITEMS2[key].description,
          price: DUMMY_ITEMS2[key].price,
        });
      }
      setLOADED_DUMMY_MOVIES(responseArray);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchAvailableMeals();
  }, [fetchAvailableMeals]);

  const mealsList = LOADED_DUMMY_MOVIES.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
