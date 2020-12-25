import React from 'react'
import { withRouter } from 'react-router-dom'
import Tabs from '../../components/Tabs/Tabs'
import AverageColor from '../../utils/average-color'
import Axios from '../../utils/axios'

import './styles.css'

const PokemonDetail = ({
    history,
    match,
    ...props
}) => {

    const [loading, setLoading] = React.useState(false)
    const [detail, setDetail] = React.useState(null)
    const [activeTab, setActiveTab] = React.useState(null)
    const [background, setBackground] = React.useState({})

    const [abilities, setAbilities] = React.useState(null)
    const [moves, setMoves] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        Axios.get(`/pokemon/${match.params.id}`)
            .then((result) => {
                setDetail(result.data)
            })
    }, [])

    React.useEffect(() => {
        switch(activeTab) {
            case 'General Informations' :
                break;
            case 'Abilities' :
                Promise.all(detail.abilities.map(abilityObj => (
                    Axios.get(abilityObj.ability.url)
                ))).then(result => {
                    setAbilities(result.map(r => r.data))
                })
                break;
            case 'Moves' :
                Promise.all(detail.moves.map(moveObj => (
                    Axios.get(moveObj.move.url)
                ))).then(result => {
                    setMoves(result.map(r => r.data))
                })
                break;
        }
    }, [activeTab])

    const handleOnLoad = (e) => {
        AverageColor(e.target).then(colorObj => {
            setBackground(colorObj)
            setLoading(false)
        })
    }

    return (
        <div className="pokemon-detail" style={{
            minHeight: '100%',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            background: 'white',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        }}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    borderRadius: 25,
                }}>
                    Loading
                </div>
            )}
            {!detail ? (
                <div>Error</div>
            ) : (
                <React.Fragment>
                    <div style={{
                        height: 200,
                        width: '100%',
                        background: `rgb(${background.r},${background.g},${background.b}, .9)`,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        position: 'relative',
                        display: 'flex'
                    }}>
                        <img
                            style={{
                                width: 150,
                                margin: 'auto',
                                marginRight: 0,
                                float: 'right'
                            }}
                            src={detail.sprites.front_default}
                            onLoad={handleOnLoad}
                        />
                        <h1
                            style={{
                                position: 'absolute',
                                top: 'calc(100% - 50px)',
                                left: 30,
                                margin: 0,
                                color: 'white'
                            }}
                        >
                            {detail.name}
                        </h1>
                    </div>
                    <div style={{
                        width: '100%',
                        flex: 1
                    }}>
                        <Tabs
                            tabs={['General Informations', 'Abilities', 'Moves', 'Stats']}
                            onClickTab={(tab) => {
                                setActiveTab(tab)
                            }}
                        >
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '15px 30px'
                                }}>
                                    <div>
                                        ID
                                    </div>
                                    <div>
                                        {detail.id}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '15px 30px'
                                }}>
                                    <div>
                                        Height
                                    </div>
                                    <div>
                                        {detail.height}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '15px 30px'
                                }}>
                                    <div>
                                        Weight
                                    </div>
                                    <div>
                                        {detail.weight}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '15px 30px'
                                }}>
                                    <div>
                                        Base Experience
                                    </div>
                                    <div>
                                        {detail.base_experience}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {abilities && abilities.length > 0 && abilities.map(ability => (
                                    <div key={ability.name} style={{
                                        padding: '15px 30px'
                                    }}>
                                        <h4 style={{
                                            margin: 0,
                                            marginBottom: 10
                                        }}>
                                            {ability.names.find(name => name.language.name === 'en').name}
                                            <span style={{opacity: .3, marginLeft: 10}}>
                                                {ability.effect_entries.find(entry => entry.language.name === 'en').short_effect}
                                            </span>
                                        </h4>
                                        <p>
                                            {ability.effect_entries.find(entry => entry.language.name === 'en').effect}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {moves && moves.length > 0 && moves.map(move => (
                                    <div key={move.name} style={{
                                        padding: '15px 30px'
                                    }}>
                                        <h4 style={{
                                            margin: 0,
                                            marginBottom: 10
                                        }}>
                                            {move.name}
                                        </h4>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Accuracy
                                            </div>
                                            <div>
                                                {move.accuracy || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Ailment
                                            </div>
                                            <div>
                                                {move.meta.ailment.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Category
                                            </div>
                                            <div>
                                                {move.meta.category.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Critical Rate
                                            </div>
                                            <div>
                                                {move.meta.crit_rate || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Drain
                                            </div>
                                            <div>
                                                {move.meta.drain || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Flinch Chance
                                            </div>
                                            <div>
                                                {move.meta.flinch_chance || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Hits
                                            </div>
                                            <div>
                                                {(move.meta.min_hits || 'N/A') + " - " + (move.meta.max_hits || 'N/A')}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Turns
                                            </div>
                                            <div>
                                                {(move.meta.min_turns || 'N/A') + " - " + (move.meta.max_turns || 'N/A')}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Turns
                                            </div>
                                            <div>
                                                {move.meta.stat_chance || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Healing
                                            </div>
                                            <div>
                                                {move.meta.healing || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Power Points
                                            </div>
                                            <div>
                                                {move.pp || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Target
                                            </div>
                                            <div>
                                                {move.target.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Type
                                            </div>
                                            <div>
                                                {move.type.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Contest Type
                                            </div>
                                            <div>
                                                {move.contest_type && move.contest_type.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Effect Entries
                                            </div>
                                            <ul style={{margin: '5px 0px'}}>
                                                {move.effect_entries.map(entry => (
                                                    <li key={entry.short_effect}>
                                                        <p style={{margin: 0}}>
                                                            {entry.short_effect.indexOf('$effect_chance') > 0 ? 
                                                                entry.short_effect.replace('$effect_chance', move.effect_chance) :
                                                                entry.short_effect
                                                            }
                                                        </p>
                                                        <p style={{margin: 0, opacity: .5, fontSize: 13}}>
                                                            {entry.effect.indexOf('$effect_chance') > 0 ? 
                                                                entry.effect.replace('$effect_chance', move.effect_chance) :
                                                                entry.effect
                                                            }
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {detail.stats && detail.stats.length > 0 && detail.stats.map(statObj => (
                                    <div key={statObj.stat.name} style={{
                                        padding: '15px 30px'
                                    }}>
                                        <h4 style={{
                                            margin: 0,
                                            marginBottom: 10
                                        }}>
                                            {statObj.stat.name}
                                        </h4>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Base Stat
                                            </div>
                                            <div>
                                                {statObj.base_stat || 'N/A'}
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                Effort
                                            </div>
                                            <div>
                                                {statObj.effort}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tabs>
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}

export default withRouter(PokemonDetail)