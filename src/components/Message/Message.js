import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const Message = React.forwardRef(({}, ref) => {

    const [show, setShow] = React.useState(null)

    React.useImperativeHandle(ref, () => ({
        fire: (element, message) => {
            setShow({element, message})
        }
    }), [])

    React.useEffect(() => {
        if (show) {
            let index = 0
            let counter = setInterval(() => {
                if (index !== 2)
                    index ++
                else {
                    setShow(null)
                    clearInterval(counter)
                }
            }, 1000)
        }
    }, [show])

    const getStyle = () => {
        const measures = show.element.getBoundingClientRect()
        return {
            left: measures.x - (250 / 3),
            top: measures.y + measures.height + 25,
        }
    }
    
    return show && (
        <div
            className="message"
            style={getStyle()}
        >
            <h5 className="title">
                {show.message}
            </h5>
            <FontAwesomeIcon
                icon={faCheck}
                color="#fff"
                size="lg"
            />
        </div>
    )
})

export default Message;