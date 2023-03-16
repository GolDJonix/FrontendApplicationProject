import { useState,useEffect,useCallback } from "react"

let render = 0

const Demo = () => {
    const [count, setCount] = useState(0)

    const click = useCallback(() => {
        setCount(count+1)
        console.log(count)
    }, [count])
    

    console.log('render', render++)
    return (
        <>
            <p>{count}</p>
            <button onClick={click}>Press</button>
        </>
    )
}

export default Demo