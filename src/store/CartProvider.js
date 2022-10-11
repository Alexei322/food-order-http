import { useState, useReducer, useCallback, useEffect } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "SET") {
    return {
      items: action.items,
      totalAmount: action.totalAmount,
    };
  }
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [LOADED_DUMMY_MOVIES, setLOADED_DUMMY_MOVIES] = useState([]);

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const fetchAvailableMeals = useCallback(async () => {
    try {
      const response = await fetch(
        "https://meals-react-1047a-default-rtdb.europe-west1.firebasedatabase.app/DUMMY_MEALS.json"
      );
      if (!response.ok) {
        throw new Error("NO DUMMY ITEMS FOUND");
      }
      const DUMMY_ITEMS2 = await response.json();
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
      console.log(error.message);
    }
  }, []);

  const sendOrder = useCallback(async () => {
    try {
      const response = await fetch(
        "https://meals-react-1047a-default-rtdb.europe-west1.firebasedatabase.app/order.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartState)
        }
      );
      if (!response.ok) {
        throw new Error("Connection failed");
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }, [cartState]);

  useEffect(() => {
    fetchAvailableMeals();
  }, [fetchAvailableMeals]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    dummy_movies: LOADED_DUMMY_MOVIES,
    sendOrder: sendOrder,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
