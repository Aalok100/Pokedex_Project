import {useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';

import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){
    const [PokemonList, setPokemonList]= useState([]);
    const [isLoading, setIsLoading]= useState(true);
    const [PokedexUrl, setPokedexUrl]= useState ('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl]= useState('');
    const [prevUrl, setPrevUrl]=useState('');

    async function downloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(PokedexUrl); //This download list of 20 Pokemons
        const pokemonResults=response.data.results;

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);



        const pokemonResultPromise=pokemonResults.map((Pokemon) => axios.get(Pokemon.url));

        const pokemonData=await axios.all(pokemonResultPromise);  //Array of 20 pokemons details

        console.log(pokemonData);

        const pokeListResult=pokemonData.map((pokeData) =>{
            const Pokemon= pokeData.data;
            return{
                id: Pokemon.id,
                name: Pokemon.name,
                image:(Pokemon.sprites.other)? Pokemon.sprites.other.dream_world.front_default:Pokemon.sprites.front_shiny,
                types:Pokemon.types
            }
        });



        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false)
    }

    useEffect (()=>{
        downloadPokemons();
    },[PokedexUrl]);

    return(
        <div className="Pokemon-list-wrapper">
            <div className="Pokemon-wrapper">
                {
                    (isLoading)? 'Loading...': PokemonList.map((P) =><Pokemon name={P.name} image={P.image} key={P.id}/>)
                }
            </div>
            <div className="controls">
                <button disabled={prevUrl==null} onClick={() => setPokedexUrl (prevUrl)}>prev</button>
                <button disabled={nextUrl==null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
            
        </div>
    )



}



export default PokemonList;