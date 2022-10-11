import Modal from "../UI/Modal";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler} className={styles["checkout-form"]}>
        <label htmlFor="first-name">First name</label>
        <input name="first-name" type="text"></input>
        <label htmlFor="last-name">Last name</label>
        <input name="last-name" type="text"></input>
        <label htmlFor="address-line-one">Address line one</label>
        <input name="address-line-one" type="text"></input>
        <label htmlFor="address-line-two">Address line two</label>
        <input name="address-line-two" type="text"></input>
        <label htmlFor="postcode">Postcode</label>
        <input name="postcode" type="text"></input>
        <button type="submit">Order!</button>
      </form>
      <button onClick={props.onClose} className={styles["close-button"]}>Close</button>
    </Modal>
  );
};

export default Checkout;
