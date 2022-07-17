import React from "react";
import { useState } from "react";
import { PokemonDetail } from "../../interface";
import { PokemonCardDetail } from "../PokemonCardDetail/PokemonCardDetail";

export const PokemonCard: React.FC<PokemonDetail> = (props) => {
  const { name,sprites} = props;
  return (
          <div>
            <p style={{textAlign: 'center'}}>{name}</p>
            <img src={sprites.front_default} alt={name} />
          </div>
  );
};
