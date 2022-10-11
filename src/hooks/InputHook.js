import { useState } from "react"

const InputHook = (validation) => {
    const [enteredValue, setEnteredValue] = useState("")
    const [touched, setTouched] = useState(false)

    const setValue = (event) => {
        setEnteredValue(event.target.value)
    }

    const setAsTouched = () => {
        setTouched(true)
    }

    const isValid = validation(enteredValue)
    const hasError = !isValid && touched

    const reset = () => {
        setEnteredValue('');
        setTouched(false)
    }

    return {
        value: enteredValue,
        setValue,
        setAsTouched,
        isValid,
        hasError,
        reset
    }


}

export default InputHook