import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import './styles.css'

const Header = ({
    location,
    ...props
}) => {
    const [tabMark, setTabMark] = React.useState(null)
    const [linkPosition, setLinkPosition] = React.useState(null)

    React.useEffect(() => {
        document.body.onscroll = (e) => {
            const measures = e.target.body.getBoundingClientRect()
            setLinkPosition(measures.top < -50 ? 50 : -measures.top)
        }
    }, [])

    React.useEffect(() => {
        const tab = document.getElementById(location.pathname.split('/')[1])
        if (tab) {
            setTabMark({
                left: tab.offsetLeft, 
                width: tab.offsetWidth,
                top: tab.offsetHeight + tab.offsetTop + 5
            })
        }
    }, [location.pathname])


    const getStyle = () => {
        return {
            left: tabMark.left,
            width: tabMark.width,
            top: tabMark.top,
        }
    }

    return (
        <header className="header">
            <div
                style={{paddingBottom : linkPosition}}
                className="header-content"
            >
                <Link
                    id="pokemons"
                    to="/pokemons"
                    className="link"
                >
                    Pokemons
                </Link>
                <Link
                    id="my-pokemons"
                    to="/my-pokemons"
                    className="link"
                >
                    My Pokemons
                </Link>
                {tabMark && (
                    <div
                        className="tab-mark"
                        style={getStyle()}
                    />
                )}
            </div>
        </header>
    )
}

export default withRouter(Header)