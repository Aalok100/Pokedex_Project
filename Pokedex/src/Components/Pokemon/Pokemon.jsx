import { Link } from 'react-router-dom';
import './Pokemon.css';



function Pokemon({name,image,id}){
    return(
        <div className='Pokemon'>
            <Link to={`/Pokemon/${id}`} >
            <div className="Pokemon-name">{name}</div>
            <img className='Pokemon-image' src={image} />
            </Link>
            
        </div>
      
    )
}
export default Pokemon;