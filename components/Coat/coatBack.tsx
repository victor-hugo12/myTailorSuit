import React from "react";
import { Svg, Path, Defs, G } from "react-native-svg";
import { getSacoPaths } from "./CoatPaths/sacoPaths2";
import { Textures } from "../Textura/textura";
import { Filters } from "../Filtros/filters";

interface CoatBackProps {
  coatLength: number;
  chest: number;
  waist: number;
  sleeveLength: number;
  shoulder: number;
  selectedOptions?: Record<string, number>; // Opcional, antes venía de Redux
  fillColor?: string;
  strokeColor?: string;
  selectedFabric?: { name: string };
}

const CoatBack: React.FC<CoatBackProps> = ({
  coatLength,
  chest,
  waist,
  sleeveLength,
  shoulder,
  selectedOptions = {},
  fillColor = "#B0BEC5",
  strokeColor = "#263238",
  selectedFabric,
}) => {
  const paths = getSacoPaths(
    { coatLength, chest, waist, sleeveLength, shoulder },
    selectedOptions
  );

  const useTexture = true;
  const fill = useTexture ? "url(#textura)" : fillColor;
  const fill2 = useTexture ? "url(#textura2)" : fillColor;
  const stroke = useTexture ? "url(#textura)" : strokeColor;

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 500 600"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <Textures selectedFabric={selectedFabric} />
        <Filters />
      </Defs>

      <G transform="scale(-1, 1) translate(-500, 0)">
        <Path
          d={paths.CUELLOIZQUIERDOARRIBA}
          fill={fill2}
          stroke="#000"
          strokeOpacity={0.1}
        />
        <Path
          d={paths.CUELLOIZQUIERDOARRIBA}
          fill="url(#sombraInferior)"
          opacity={0.8}
        />

        <Path
          d={paths.CUELLOIZQUIERDOABAJO}
          fill={fill2}
          stroke="#000"
          strokeOpacity={0.1}
        />
        <Path
          d={paths.CUELLOIZQUIERDOABAJO}
          fill="url(#sombraSuperior)"
          opacity={0.7}
        />

        <Path d={paths.BRAZOIZQUIERDO} fill={fill2} stroke={stroke} />
        <Path
          d={paths.BRAZOIZQUIERDO}
          fill="url(#sombraIzquierda)"
          opacity={0.4}
        />

        <Path d={paths.BRAZODERECHO} fill={fill2} stroke={stroke} />
        <Path d={paths.BRAZODERECHO} fill="url(#sombraDerecha)" opacity={0.4} />

        <Path d={paths.CUELLOMEDIO} fill={fill} stroke={stroke} />
        <Path d={paths.CUELLOMEDIO} fill="url(#sombraInferior)" opacity={0.3} />

        <Path
          d={paths.CUELLODERECHOABAJO}
          fill={fill2}
          stroke="#000"
          strokeOpacity={0.1}
        />
        <Path
          d={paths.CUELLODERECHOABAJO}
          fill="url(#sombraInferior)"
          opacity={0.7}
        />

        <Path
          d={paths.CUELLODERECHOARRIBA}
          fill={fill2}
          stroke="#000"
          strokeOpacity={0.2}
        />
        <Path
          d={paths.CUELLODERECHOARRIBA}
          fill="url(#sombraInferior)"
          opacity={0.8}
        />

        <Path
          d={paths.ESPALDADERECHA}
          fill={fill}
          stroke="#000"
          strokeWidth={0.1}
        />
        <Path
          d={paths.ESPALDADERECHA}
          fill="url(#sombraDerecha)"
          opacity={0.4}
        />

        <Path
          d={paths.ESPALDAIZQUIERDA}
          fill={fill}
          stroke="#000"
          strokeWidth={0.1}
        />
        <Path
          d={paths.ESPALDAIZQUIERDA}
          fill="url(#sombraIzquierda)"
          opacity={0.4}
        />
      </G>
    </Svg>
  );
};

export default CoatBack;
