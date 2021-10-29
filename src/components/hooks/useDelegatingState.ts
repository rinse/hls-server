import {useState} from "react";

function useDelegatingState<T>(
    initialValue: T | (() => T),
    propValue?: T,
    propOnChange?: (value: T) => void,
): [T | null, (value: T) => void] {
    const [stateValue, setStateValue] = useState<T>(initialValue)
    const value = propValue !== undefined ? propValue : stateValue
    const setValue = propOnChange !== undefined ? propOnChange : setStateValue
    return [value ?? null, setValue]
}

export default useDelegatingState
