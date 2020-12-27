import React from 'react';

import './styles.css'

const Tabs = ({
    tabs,
    onClickTab,
    children
}) => {

    const [tabIndex, setTabIndex] = React.useState(0)
    const [tabMark, setTabMark] = React.useState(null)

    React.useEffect(() => {
        const tab = document.getElementById('selected-tab')
        setTabMark({left: tab.offsetLeft, width: tab.offsetWidth, top: tab.offsetHeight + tab.offsetTop})
    }, [])

    const handleOnClick = (tab, index) => (e) => {
        setTabIndex(index)
        setTabMark({
            left: e.target.offsetLeft,
            width: e.target.offsetWidth,
            top: e.target.offsetHeight + e.target.offsetTop
        })
        if (onClickTab)
            onClickTab(tab, index)
    }

    const handleOnChange = (e) => {
        const index = tabs.indexOf(e.target.value)
        setTabIndex(index)
        if (onClickTab)
            onClickTab(e.target.value, index)
    }

    const getStyle = () => {
        return {
            left: tabMark.left,
            width: tabMark.width,
            top: tabMark.top,
        }
    }

    return (
        <div className="tabs-container">
            <div className="tabs">
                {tabs && tabs.length > 0 && tabs.map((tab, index) => (
                    <h4
                        id={index === tabIndex ? 'selected-tab' : 'tab'}
                        key={tab}
                        className="tab-title"
                        onClick={handleOnClick(tab, index)}
                    >
                        {tab}
                    </h4>
                ))}
                {tabMark && (
                    <div
                        className="tab-mark"
                        style={getStyle()}
                    />
                )}
            </div>
            <select 
                className="tab-selector"
                onChange={handleOnChange}
            >
                {tabs && tabs.length > 0 && tabs.map(tab => (
                    <option
                        key={tab}
                        value={tab}
                    >
                        {tab}
                    </option>
                ))}
                
            </select>
            <div className="tab-content">
                {children && 
                    children.length > 0 && 
                    children[tabIndex] && 
                    children[tabIndex]
                }
            </div>
        </div>
        
    )
}

export default Tabs;