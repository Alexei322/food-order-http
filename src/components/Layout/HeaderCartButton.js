import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
    const [btnIsHighLighted, setBtnIsHighlighted] = useState(false)
    const ctx = useContext(CartContext);

    const {items} = ctx

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    

    const btnClasses = `${styles.button} ${btnIsHighLighted ? styles.bump : ''}`;

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }

    },[items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton