import { useState } from 'react'

const useInput = (initialState: string = '') => {
    const [value, setValue] = useState(initialState)

    const onChangeText = (text: string) => {
        setValue(text)
    }

    return [value, onChangeText]
}

export default useInput
