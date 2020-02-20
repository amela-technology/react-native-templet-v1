import {useState} from "react"

export default function useInput(initialState = "") {
    const [value, setValue] = useState(initialState)

    function onChangeText(text: string) {
        setValue(text)
    }

    return [value, onChangeText]
}
