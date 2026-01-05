// src/components/Vest/index.tsx
import React from "react";
import { Svg, Defs, Path, Image as SvgImage } from "react-native-svg";
import { Textures } from "../Textura/textura";
import { Filters } from "../Filtros/filters";
import { getVestPaths } from "./VestPaths/chalecoPaths2";
import boton2 from "../../../assets/botones/boton2.png";

interface VestProps {
  vestLength: number;
  chest: number;
  waist: number;
  shoulderWidth: number;
  selectedOptions?: Record<string, number>; // opcional
  fillColor?: string;
  strokeColor?: string;
  selectedFabric?: { name: string };
}

const Vest: React.FC<VestProps> = ({
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
  let fill3 = "url(#textura3)";
  let fill4 = "url(#textura3)";
  const stroke = "url(#textura)";
  const escala = 8;
  const longitud = (escala / 2) * 1.5;

  switch (liningId) {
    case 240:
      fill3 = "url(#textura)";
      fill4 = "url(#textura)";
      break;
    case 241:
      fill3 = "url(#textura3)";
      fill4 = "url(#textura)";
      break;
    case 242:
      fill3 = "url(#textura3)";
      fill4 = "url(#textura3)";
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

      <Path
        d={paths.ESPALDADERECHA}
        fill={fill4}
        stroke="#000"
        strokeOpacity={0.6}
      />
      <Path
        d={paths.ESPALDADERECHA}
        fill="url(#sombraCentroHorizontal)"
        stroke={stroke}
      />
      <Path
        d={paths.ESPALDAIZQUIERDA}
        fill={fill4}
        stroke="#000"
        strokeOpacity={0.6}
      />
      <Path
        d={paths.ESPALDAIZQUIERDA}
        fill="url(#sombraInferior)"
        opacity={0.4}
      />
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
      <Path d={paths.PECHOIZQUIERDO} fill="url(#sombraDerecha)" opacity={0.5} />

      <Path
        d={paths.CUELLOIZQUIERDOARRIBA}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.2}
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
        strokeOpacity={0.2}
      />
      <Path
        d={paths.CUELLOIZQUIERDOABAJO}
        fill="url(#sombraSuperior)"
        opacity={0.6}
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
        transform="translate(-10,0)"
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
        d={paths.BOLSILLOSUPERIOR}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.05}
      />
      <Path
        d={paths.BOLSILLOSUPERIOR}
        fill="url(#sombraIzquierda)"
        opacity={0.8}
      />

      <Path
        d={paths.CUELLODERECHOABAJO}
        fill={fill2}
        stroke="#000"
        strokeOpacity={0.2}
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
        strokeOpacity={0.2}
      />
      <Path
        d={paths.CUELLODERECHOARRIBA}
        fill="url(#sombraInferior)"
        opacity={0.6}
      />
      <Path
        d={paths.OJALES}
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeOpacity={0.3}
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

export default Vest;
