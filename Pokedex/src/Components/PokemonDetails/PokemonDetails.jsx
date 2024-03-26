import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails(){
    const{id}= useParams();
 
    const [Pokemon, setPokemon]= useState({});

    async function downloadPokemon(){

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log("the response is",response)

        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        })
      

      
        


    }



    useEffect (() => {
        downloadPokemon();

    }, []);

    // return(
    //     <> kumar jfuiwerfgui</>
        
    //  );
    return(
        <div className="pokemon-details-wrapper">
            <div className="pokemon-details-name"> <span> {Pokemon.name}</span> </div>
            <img className="pokemon-details-image" src={Pokemon.image}/>
            <div>Height: {Pokemon.height}</div>
            <div>Weight:   {Pokemon.weight}</div>
            <div className="pokemon-details-types">
                {Pokemon.types && Pokemon.types.map ((t) => <div key={t}> {t} </div> )}
            </div>
        </div>
    );


    }

export default PokemonDetails;