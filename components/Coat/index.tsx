import React from "react";
import { Svg, Path, Defs, Image as SvgImage } from "react-native-svg";
import { getSacoPaths } from "./CoatPaths/sacoPaths2";
import { Textures } from "../Textura/textura";
import { Filters } from "../Filtros/filters";
import boton2 from "../../assets/botones/boton2.png";

interface CoatProps {
  coatLength: number;
  chest: number;
  waist: number;
  sleeveLength: number;
  shoulder: number;
  selectedOptions?: Record<string, number>; // ⚡ antes venía de Redux
  fillColor?: string;
  strokeColor?: string;
  selectedFabric?: { name: string };
}

const Coat: React.FC<CoatProps> = ({
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
  const fill3 = useTexture ? "url(#textura3)" : fillColor;
  const stroke = useTexture ? "url(#textura)" : strokeColor;

  const escala = 8;
  const longitud = (escala / 2) * 1.5;

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

      <Path d={paths.INTERIOR} fill={fill3} stroke={stroke} />
      <Path
        d={paths.INTERIOR}
        fill="url(#sombraCentroHorizontal)"
        stroke={stroke}
      />

      <Path
        d={paths.PECHOIZQUIERDO}
        fill={fill}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path d={paths.PECHOIZQUIERDO} fill="url(#sombraDerecha)" opacity={0.4} />

      <Path
        d={paths.CUELLOIZQUIERDOARRIBA}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path
        d={paths.CUELLOIZQUIERDOARRIBA}
        fill="url(#sombraInferior)"
        opacity={0.6}
      />

      <Path
        d={paths.CUELLOIZQUIERDOABAJO}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path
        d={paths.CUELLOIZQUIERDOABAJO}
        fill="url(#sombraSuperior)"
        opacity={0.6}
      />

      <Path d={paths.BRAZOIZQUIERDO} fill={fill2} stroke={stroke} />
      <Path
        d={paths.BRAZOIZQUIERDO}
        fill="url(#sombraIzquierda)"
        opacity={0.4}
      />

      <Path
        d={paths.BOLSILLOIZQUIERDO}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path
        d={paths.BOLSILLOIZQUIERDO}
        fill="url(#sombraDerecha)"
        opacity={0.8}
      />

      <Path
        d={paths.PECHODERECHO}
        transform="translate(-10,5)"
        fill="url(#sombraDerecha)"
        opacity={0.8}
      />
      <Path
        d={paths.PECHODERECHO}
        fill={fill}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path d={paths.PECHODERECHO} fill="url(#sombraIzquierda)" opacity={0.5} />

      <Path d={paths.BRAZODERECHO} fill={fill2} stroke={stroke} />
      <Path d={paths.BRAZODERECHO} fill="url(#sombraDerecha)" opacity={0.4} />

      <Path
        d={paths.BOLSILLOSUPERIOR}
        transform="translate(5,5)"
        fill="url(#sombraInferiorIzquierda)"
        opacity={0.2}
      />
      <Path
        d={paths.BOLSILLOSUPERIOR}
        fill={fill2}
        stroke="#000"
        strokeWidth={2}
        strokeOpacity={0.1}
      />
      <Path
        d={paths.BOLSILLOSUPERIOR}
        fill="url(#sombraIzquierda)"
        opacity={0.8}
      />

      <Path
        d={paths.BOLSILLODERECHO}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path
        d={paths.BOLSILLODERECHO}
        fill="url(#sombraIzquierda)"
        opacity={0.8}
      />

      <Path
        d={paths.CUELLOMEDIO}
        fill={fill}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path d={paths.CUELLOMEDIO} fill="url(#sombraSuperior)" opacity={0.3} />

      <Path
        d={paths.CUELLODERECHOABAJO}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path
        d={paths.CUELLODERECHOABAJO}
        fill="url(#sombraSuperior)"
        opacity={0.6}
      />

      <Path
        d={paths.CUELLODERECHOARRIBA}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path
        d={paths.CUELLODERECHOARRIBA}
        fill="url(#sombraInferior)"
        opacity={0.6}
      />

      {/* Ojal y botones */}
      <Path
        d={paths.OJALES}
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeOpacity={0.6}
      />
      {paths.OJALES_COORDS.map(({ x, y }, i) => (
        <SvgImage
          key={`boton-${i}`}
          href={boton2}
          x={x - longitud / 2}
          y={y - escala / 2}
          width={escala}
          height={escala}
          opacity={1}
          preserveAspectRatio="xMidYMid meet"
        />
      ))}
    </Svg>
  );
};

export default Coat;
