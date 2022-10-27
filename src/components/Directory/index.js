import React from "react";
import Diapo from "./../../assets/diapo.jpg";
import './styles.scss'

const Directory = props => {
  return (
    <div className="directory">
        <h3>Je réalise des dessins depuis des années pour moi. J'ai créé cette entreprise pour développer ma marque et mes œuvres uniques. Pas de copie. Mon entreprise utilise un mode de copie appelé "Flocage de sublimation". Les couleurs des dessins sont transférées sur la fibre du textile. Ce qui leur permet de résister au lavage à basse température et dure bien plus longtemps.</h3>
        <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${Diapo})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Directory;
