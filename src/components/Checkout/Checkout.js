import Modal from "../UI/Modal";
import styles from "./Checkout.module.css";
import InputHook from "../../hooks/InputHook";
const Checkout = (props) => {
  const {
    value: enteredFirstName,
    setValue: setFirstName,
    setAsTouched: setFirstNameTouched,
    isValid: firstNameValid,
    hasError: firstNameError,
    reset: firstNameReset,
  } = InputHook((value) => value.trim().length !== 0);

  const {
    value: enteredlastName,
    setValue: setLastName,
    setAsTouched: setLastNameTouched,
    isValid: lastNameValid,
    hasError: lastNameError,
    reset: lastNameReset,
  } = InputHook((value) => value.trim().length !== 0);

  const {
    value: enteredAddressOne,
    setValue: setAddressOne,
    setAsTouched: setAddressOneTouched,
    isValid: addressOneValid,
    hasError: addressOneError,
    reset: addressOneReset,
  } = InputHook((value) => value.trim().length > 5);

  const {
    value: enteredAddressTwo,
    setValue: setAddressTwo,
    setAsTouched: setAddressTwoTouched,
    isValid: addressTwoValid,
    hasError: addressTwoError,
    reset: addressTwoReset,
  } = InputHook((value) => value.trim().length > 5);

  const {
    value: enteredPostcode,
    setValue: setPostcode,
    setAsTouched: setPostcodeTouched,
    isValid: postcodeValid,
    hasError: postcodeError,
    reset: postcodeReset,
  } = InputHook((value) => value.trim().length > 3);

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      !(
        firstNameValid ||
        lastNameValid ||
        addressOneValid ||
        addressTwoValid ||
        postcodeValid
      )
    ) {
      return;
    }
    firstNameReset();
    lastNameReset();
    addressOneReset();
    addressTwoReset();
    postcodeReset();
    props.onClose();
  };

  const firstNameInputClasses = firstNameError
    ? styles["invalid"]
    : "checkout-form";

  const lastNameInputClasses = lastNameError
    ? styles["invalid"]
    : "checkout-form";

  const addressOneInputClasses = addressOneError
    ? styles["invalid"]
    : "checkout-form";

  const addressTwoInputClasses = addressTwoError
    ? styles["invalid"]
    : "checkout-form";

  const postcodeInputClasses = postcodeError
    ? styles["invalid"]
    : "checkout-form";

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler} className={styles["checkout-form"]}>
        <label htmlFor="first-name">First name</label>
        <div className={firstNameInputClasses}>
          <input
            onChange={setFirstName}
            onBlur={setFirstNameTouched}
            value={enteredFirstName}
            name="first-name"
            type="text"
          ></input>
          {firstNameError && (
            <p className={styles["error-text"]}>
              Please enter a valid first name
            </p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="last-name">Last name</label>
          <input
            onChange={setLastName}
            onBlur={setLastNameTouched}
            value={enteredlastName}
            name="last-name"
            type="text"
          ></input>
          {lastNameError && (
            <p className={styles["error-text"]}>
              Please enter a valid last name
            </p>
          )}
        </div>
        <label htmlFor="address-line-one">Address line one</label>
        <div className={addressOneInputClasses}>
          <input
            onChange={setAddressOne}
            onBlur={setAddressOneTouched}
            value={enteredAddressOne}
            name="address-line-one"
            type="text"
          ></input>
          {addressOneError && (
            <p className={styles["error-text"]}>Please enter a valid address</p>
          )}
        </div>
        <label htmlFor="address-line-two">Address line two</label>
        <div className={addressTwoInputClasses}>
          <input
            onChange={setAddressTwo}
            onBlur={setAddressTwoTouched}
            value={enteredAddressTwo}
            name="address-line-two"
            type="text"
          ></input>
          {addressTwoError && (
            <p className={styles["error-text"]}>Please enter a valid address</p>
          )}
        </div>
        <label htmlFor="postcode">Postcode</label>
        <div className={postcodeInputClasses}>
          <input
            onChange={setPostcode}
            onBlur={setPostcodeTouched}
            value={enteredPostcode}
            name="postcode"
            type="text"
          ></input>
          {postcodeError && (
            <p className={styles["error-text"]}>
              Please enter a valid postcode
            </p>
          )}
        </div>
        <button type="submit">Order!</button>
      </form>
      <button onClick={props.onClose} className={styles["close-button"]}>
        Close
      </button>
    </Modal>
  );
};

export default Checkout;
