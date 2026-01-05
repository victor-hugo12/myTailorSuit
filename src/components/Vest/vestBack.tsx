import React from "react";
import { Svg, Defs, G, Path } from "react-native-svg";
import { Textures } from "../Textura/textura";
import { Filters } from "../Filtros/filters";
import { getVestPaths } from "./VestPaths/chalecoPaths2";

interface VestBackProps {
  vestLength: number;
  chest: number;
  waist: number;
  shoulderWidth: number;
  selectedOptions?: Record<string, number>; // opcional
  fillColor?: string;
  strokeColor?: string;
  selectedFabric?: { name: string };
}

const VestBack: React.FC<VestBackProps> = ({
  vestLength,
  chest,
  waist,
  shoulderWidth,
  selectedOptions = {},
  fillColor = "#B0BEC5",
  strokeColor = "#263238",
  selectedFabric,
}) => {
  const paths = getVestPaths(
    { vestLength, chest, waist, shoulderWidth },
    selectedOptions
  );
  const liningId = selectedOptions["Lining"];

  const fill = "url(#textura)";
  const fill2 = "url(#textura2)";
  let fill3 = "url(#textura4)";
  let fill4 = "url(#textura5)";
  const stroke = "url(#textura)";

  switch (liningId) {
    case 240: // Full Lining
      fill3 = "url(#textura5)";
      fill4 = "url(#textura5)";
      break;
    case 241: // Half Lining
      fill3 = "url(#textura)";
      fill4 = "url(#textura)";
      break;
    case 242: // Unstructured (No Lining)
      fill3 = "url(#textura)";
      fill4 = "url(#textura)";
      break;
  }

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
          fill={fill}
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
          fill={fill}
          stroke="#000"
          strokeOpacity={0.1}
        />
        <Path
          d={paths.CUELLOIZQUIERDOABAJO}
          fill="url(#sombraSuperior)"
          opacity={0.3}
        />
        <Path
          d={paths.CUELLODERECHOABAJO}
          fill={fill2}
          stroke="#000"
          strokeOpacity={0.1}
        />
        <Path
          d={paths.CUELLODERECHOABAJO}
          fill="url(#sombraSuperior)"
          opacity={0.3}
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
          fill={fill3}
          stroke="#000"
          strokeWidth={0.05}
        />
        <Path
          d={paths.ESPALDADERECHA}
          fill="url(#sombraDerecha)"
          opacity={0.4}
        />
        <Path
          d={paths.ESPALDAIZQUIERDA}
          fill={fill3}
          stroke="#000"
          strokeWidth={0.05}
        />
        <Path
          d={paths.ESPALDAIZQUIERDA}
          fill="url(#sombraIzquierda)"
          opacity={0.4}
        />
        <Path
          d={paths.BACKBELT1}
          fill={fill3}
          stroke="#000"
          strokeOpacity={0.2}
          strokeWidth={3}
        />
        <Path
          d={paths.BACKBELT2}
          fill={fill3}
          stroke="#000"
          strokeOpacity={0.2}
          strokeWidth={1}
        />
        <Path
          d={paths.HEBILLA}
          fill="url(#metallicSilver)"
          stroke="#fbf6f6ff"
          strokeWidth={0.8}
          strokeOpacity={0.8}
          fillRule="evenodd"
        />
      </G>
    </Svg>
  );
};

export default VestBack;
