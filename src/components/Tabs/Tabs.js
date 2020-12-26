import React from 'react';

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

    return (
        <div style={{
            display: 'flex',
            flexDirection:'column'
        }}>
            <div
                style={{position: 'relative'}}
            >
                {tabs && tabs.length > 0 && tabs.map((tab, index) => (
                    <h4
                        id={index === tabIndex ? 'selected-tab' : 'tab'}
                        key={tab}
                        style={{
                            padding: '15px 30px',
                            margin: 0,
                            float: 'left',
                            cursor: 'pointer'
                        }}
                        onClick={(e) => {
                            setTabIndex(index)
                            setTabMark({left: e.target.offsetLeft, width: e.target.offsetWidth, top: e.target.offsetHeight + e.target.offsetTop})
                            if (onClickTab)
                                onClickTab(tab, index)
                        }}
                    >
                        {tab}
                    </h4>
                ))}
                {tabMark && (
                    <div style={{
                        position: 'absolute',
                        bottom:0,
                        border: '1px solid black',
                        transition: '.3s',
                        left: tabMark.left,
                        width: tabMark.width,
                        top: tabMark.top,
                        height: 0
                    }} />
                )}
            </div>
            <div style={{marginTop: 20}}>
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