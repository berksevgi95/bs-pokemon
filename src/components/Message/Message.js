import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const Message = React.forwardRef(({
    ...props
}, ref) => {

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
    
    
    return show && (
        <div className="message" style={{
            background: '#15cbca',
            padding: '10px 15px',
            position: 'fixed',
            width: 250,
            zIndex: 10,
            borderRadius: 15,
            left: show.element.getBoundingClientRect().x - (250 / 3),
            top: show.element.getBoundingClientRect().y + show.element.getBoundingClientRect().height + 25,
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            display: 'flex',
            alignItems: 'center'
        }}>
            <h5 style={{
                margin: 0,
                color: 'white'
            }}>
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