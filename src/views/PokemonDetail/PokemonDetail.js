import React from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'

import Tabs from '../../components/Tabs/Tabs'
import Axios from '../../utils/axios'
import {Context} from '../../utils/context'

import './styles.css'

const PokemonDetail = ({
    match,
}) => {

    const { isAdded, addRemoveMyPokemonsList } = React.useContext(Context)

    const [loading, setLoading] = React.useState(false)
    const [detail, setDetail] = React.useState(null)
    const [activeTab, setActiveTab] = React.useState(null)
    const [abilities, setAbilities] = React.useState(null)
    const [moves, setMoves] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        Axios.get(`/pokemon/${match.params.id}`)
            .then((result) => {
                setDetail(result.data)
                setLoading(false)
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

    const handleClickLikeButton = () => {
        addRemoveMyPokemonsList(detail)
    }

    const handleSelectTab = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className="pokemon-detail-container">
            {loading && (
                <div className="loading-container">
                    <h3>Loading...</h3>
                </div>
            )}
            {!detail ? (
                <div>Error</div>
            ) : (
                <div>
                    <div className="pokemon-detail-header">
                        <img
                            className="pokemon-detail-image"
                            src={detail.sprites.front_default}
                        />
                        <div className="pokemon-detail-title"> 
                            <h1>
                                {detail.name}
                            </h1>
                            <button
                                className="pokemon-detail-like-button" 
                                onClick={handleClickLikeButton}
                            >
                                {!isAdded(detail) ? (
                                    <FontAwesomeIcon
                                        className="pokemon-detail-icon"
                                        size="2x"
                                        icon={RegularIcons.faHeart}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        className="pokemon-detail-icon"
                                        size="2x"
                                        icon={SolidIcons.faHeart}
                                    />
                                )}
                            </button>
                        </div>
                        
                    </div>
                    <div className="pokemon-detail-content">
                        <Tabs
                            tabs={['General Informations', 'Abilities', 'Moves', 'Stats']}
                            onClickTab={handleSelectTab}
                        >
                            <div>
                                <div className="pokemon-detail-row">
                                    <div>
                                        ID
                                    </div>
                                    <div>
                                        {detail.id}
                                    </div>
                                </div>
                                <div className="pokemon-detail-row">
                                    <div>
                                        Height
                                    </div>
                                    <div>
                                        {detail.height}
                                    </div>
                                </div>
                                <div className="pokemon-detail-row">
                                    <div>
                                        Weight
                                    </div>
                                    <div>
                                        {detail.weight}
                                    </div>
                                </div>
                                <div className="pokemon-detail-row">
                                    <div>
                                        Base Experience
                                    </div>
                                    <div>
                                        {detail.base_experience}
                                    </div>
                                </div>
                                <div className="pokemon-detail-row">
                                    <div>
                                        Types
                                    </div>
                                    <div className="pokemon-detail-type-container">
                                        {detail.types && detail.types.length > 0 && detail.types.map(typeObj => (
                                            <h5
                                                key={typeObj.type.name}
                                                className="pokemon-detail-type"
                                            >
                                                {typeObj.type.name}
                                            </h5>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {abilities && abilities.length > 0 && abilities.map(ability => (
                                    <div
                                        key={ability.name}
                                        className="pokemon-detail-cell"
                                    >
                                        <h4 className="pokemon-detail-cell-title">
                                            {ability.names.find(name => name.language.name === 'en').name}
                                            <span>
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
                                    <div
                                        key={move.name}
                                        className="pokemon-detail-cell"
                                    >
                                        <h4 className="pokemon-detail-cell-title">
                                            {move.name}
                                        </h4>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Accuracy
                                            </div>
                                            <div>
                                                {move.accuracy || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Ailment
                                            </div>
                                            <div>
                                                {move.meta.ailment.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Category
                                            </div>
                                            <div>
                                                {move.meta.category.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Critical Rate
                                            </div>
                                            <div>
                                                {move.meta.crit_rate || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Drain
                                            </div>
                                            <div>
                                                {move.meta.drain || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Flinch Chance
                                            </div>
                                            <div>
                                                {move.meta.flinch_chance || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Hits
                                            </div>
                                            <div>
                                                {(move.meta.min_hits || 'N/A') + " - " + (move.meta.max_hits || 'N/A')}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Turns
                                            </div>
                                            <div>
                                                {(move.meta.min_turns || 'N/A') + " - " + (move.meta.max_turns || 'N/A')}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Turns
                                            </div>
                                            <div>
                                                {move.meta.stat_chance || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Healing
                                            </div>
                                            <div>
                                                {move.meta.healing || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Power Points
                                            </div>
                                            <div>
                                                {move.pp || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Target
                                            </div>
                                            <div>
                                                {move.target.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Type
                                            </div>
                                            <div>
                                                {move.type.name || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
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
                                            <ul className="pokemon-detail-move-list">
                                                {move.effect_entries.map(entry => (
                                                    <li key={entry.short_effect}>
                                                        <p className="pokemon-detail-move-list-title">
                                                            {entry.short_effect.indexOf('$effect_chance') > 0 ? 
                                                                entry.short_effect.replace('$effect_chance', move.effect_chance) :
                                                                entry.short_effect
                                                            }
                                                        </p>
                                                        <p className="pokemon-detail-move-list-description">
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
                                    <div
                                        key={statObj.stat.name}
                                        className="pokemon-detail-cell"
                                    >
                                        <h4 className="pokemon-detail-cell-title">
                                            {statObj.stat.name}
                                        </h4>
                                        <div className="pokemon-detail-move-row">
                                            <div>
                                                Base Stat
                                            </div>
                                            <div>
                                                {statObj.base_stat || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="pokemon-detail-move-row">
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
                </div>
            )}
        </div>
    )
}

export default withRouter(PokemonDetail)