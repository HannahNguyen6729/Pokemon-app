export interface Pokemon{
    name: string;
  }
  
export interface PokemonDetail extends Pokemon{
    id:number;
    sprites: {
      front_default: string;
    };
    abilities:[];
    isShown:boolean;
    setIsShown:React.Dispatch<React.SetStateAction<boolean>>;
  }

