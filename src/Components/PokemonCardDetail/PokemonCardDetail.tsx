import React from 'react'
import { PokemonDetail } from '../../interface'

interface Obj{
  ability:{
    name:string;
  };
}
export const PokemonCardDetail:React.FC<PokemonDetail>  = (props) => {
  const {name,id,sprites, abilities,isShown, setIsShown} = props;
  console.log(abilities)
  const renderAbilities =() => {
    return abilities.map((abi: Obj, index) => (
      <p key={index}>
        {abi.ability.name}
      </p>
    ))
  }
  return (
    <div className='pokemon-list-detailed'>
      <div className='detail-container'>
        <p 
          onClick={()=> setIsShown(false)}
          className='detail-close'>X</p>
        <div className='detail-info'>
            <img src={sprites.front_default} alt={name} />
            <p className='detail-name'>
              {props.name}
            </p>
        </div>
        <div className="detail-skill">
          <p className='detail-ability'>Abilities: {renderAbilities()}</p>
        </div>
      </div>
    </div>
  )
}
