import React from 'react';
import {useState, useEffect} from 'react'
import Axios from 'axios';
import './App.css';
import {Pokemon, PokemonDetail} from './interface'
import {PokemonCard} from './Components/PokemonCard/PokemonCard';
import { PokemonCardDetail } from './Components/PokemonCardDetail/PokemonCardDetail';

const App :React.FC = ()=> {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('')
  const [isShown, setIsShown] = useState<boolean>(false)
  const [selectedPoke, setSelectedPoke] = useState<PokemonDetail>({ 
      id:-1,
      sprites: {front_default: 'null'},
      abilities:[],
      isShown:false,
      setIsShown:()=>{},
      name: 'null',
   })

  useEffect(()=> {
    try{
      const getPokemonList= async()=>{
        const res = await Axios({
          method: 'GET',
          url:'https://pokeapi.co/api/v2/pokemon?limit=16&offset=10'
        })
        setNextUrl(res.data.next)
        res.data.results.forEach( async(poke : Pokemon) => {
          const pokeDetail = await Axios({
            method: 'GET',
            url:`https://pokeapi.co/api/v2/pokemon/${poke.name}`
          })
          setPokemonList((prev)=> [...prev,pokeDetail.data])
        })
      }
      getPokemonList()
    }catch(err){
      console.log(err)
    }
  },[])
  
  const renderPokemonList =()=> {
    return (
      <>
        <div >
            {isShown ? (
              <div className="overlay">
                <PokemonCardDetail 
                    name={selectedPoke.name} 
                    id={selectedPoke.id}
                    sprites={selectedPoke.sprites}
                    abilities={selectedPoke.abilities}
                    isShown={selectedPoke.isShown}
                    setIsShown={selectedPoke.setIsShown}
                />
              </div>
            ): ( 
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {pokemonList?.map((po,index)=> (
              <div 
                    key={index} className='pokemon-list-container'
                    onClick={()=> {
                      setIsShown(true)
                      setSelectedPoke({
                        name:po.name ,
                        id:po.id,
                        sprites:po.sprites,
                        abilities:po.abilities,
                        isShown:isShown,
                        setIsShown:setIsShown,
                      })
                    }}
              >
                <PokemonCard  name={po.name} 
                              id={po.id}
                              sprites={po.sprites}
                              abilities={po.abilities}
                              isShown={isShown}
                              setIsShown={setIsShown}
                />
              </div>
              ))}
            </div>
            )}
        </div>
      </>
    )
    
  }
  const handleClick=() => {
  //click button Load more
   const getNextList=async() =>{
    const res = await Axios({
      method: 'GET',
      url: `${nextUrl}`,
    })
    //after loading data, nextUrl needs to update with the new nextUrl
    setNextUrl(res.data.next)
    res.data.results.forEach(async(poke:Pokemon)=> {
      const pokeDetail = await Axios({
        method: 'GET',
        url:`https://pokeapi.co/api/v2/pokemon/${poke.name}`
      })
      setPokemonList((prev)=> [...prev,pokeDetail.data])
    })
   }
   getNextList()
  }
  
  return (
    <div className="App">
      <div className="container">
        <header className='pokemon-header'>POKEMON</header>
          {renderPokemonList()}
        <div>
          {isShown? '': <button onClick={()=> handleClick()}>Load more...</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
