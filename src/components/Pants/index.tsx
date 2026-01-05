import React from "react";
import { Svg, Defs, Path, Image as SvgImage } from "react-native-svg";
import { getPantPaths } from "./PantPaths/pantPaths2";
import { Textures } from "../Textura/textura";
import { Filters } from "../Filtros/filters";
import boton2 from "../../../assets/botones/boton2.png";

interface PantsProps {
  waist: number;
  thigh: number;
  knee: number;
  boot: number;
  length: number;
  inseam: number;
  selectedOptions?: Record<string, number>; // Opcional
  fillColor?: string;
  strokeColor?: string;
  useTexture?: boolean;
  selectedFabric?: { name: string };
}

export const Pants: React.FC<PantsProps> = ({
  waist,
  thigh,
  knee,
  boot,
  length,
  inseam,
  selectedOptions = {},
  fillColor = "#B0BEC5",
  strokeColor = "#263238",
  useTexture = true,
  selectedFabric,
}) => {
  const paths = getPantPaths(
    { waist, thigh, knee, boot, length, inseam },
    selectedOptions
  );

  const buttonPos = paths.FLYCOORDSCIERRE?.cierre || { x: 0, y: 0 };
  const fill = useTexture ? "url(#textura)" : fillColor;
  const fill2 = useTexture ? "url(#textura2)" : fillColor;
  const fill3 = useTexture ? "url(#textura6)" : fillColor;
  const fill4 = useTexture ? "url(#textura7)" : fillColor;
  const stroke = useTexture ? "url(#textura)" : strokeColor;
  const stroke2 = useTexture ? "url(#textura2)" : strokeColor;

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 500 600"
      preserveAspectRatio="xMidYMid meet"
      style={{ backgroundColor: "#f8f8f8" }}
    >
      <Defs>
        <Textures selectedFabric={selectedFabric} />
        <Filters />
      </Defs>

      <Path
        d={paths.PIERNASUPERIORIZQUIERDA}
        fill={fill}
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.2}
      />
      <Path
        d={paths.PIERNASUPERIORIZQUIERDA}
        fill="url(#sombraSuperior)"
        stroke="url(#sombraInferior)"
        opacity={0.2}
      />
      <Path
        d={paths.CINTURAIZQUIERDA}
        fill={fill2}
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.5}
      />
      <Path
        d={paths.CINTURAIZQUIERDA}
        fill="url(#sombraInferior)"
        opacity={0.3}
      />
      <Path
        d={paths.PASADORIZQUIERDO}
        fill={fill}
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.5}
      />
      <Path
        d={paths.PASADORIZQUIERDO}
        fill="url(#sombraCentroVertical)"
        opacity={0.5}
      />
      <Path d={paths.MEDSUPERIORIZQUIERDA} fill="none" stroke={stroke} />

      <Path
        d={paths.PIERNAINFERIORIZQUIERDA}
        fill={fill4}
        stroke={fill4}
        strokeWidth={0.5}
        strokeOpacity={1}
      />
      <Path
        d={paths.PIERNAINFERIORIZQUIERDA}
        fill="url(#sombraCentroVertical)"
        stroke="url(#sombraCentroVertical)"
        fillOpacity={0.2}
        strokeOpacity={0.3}
      />
      <Path
        d={paths.PIERNAINFERIORIZQUIERDA2}
        fill={fill3}
        stroke={fill3}
        strokeWidth={0.5}
        strokeOpacity={1}
      />
      <Path
        d={paths.PIERNAINFERIORIZQUIERDA2}
        fill="url(#sombraCentroVertical)"
        stroke="url(#sombraCentroVertical)"
        fillOpacity={0.2}
        strokeOpacity={0.3}
      />

      <Path
        d={paths.PIERNASUPERIORDERECHA}
        fill={fill}
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.4}
      />
      <Path
        d={paths.PIERNASUPERIORDERECHA}
        fill="url(#sombraSuperior)"
        stroke="url(#sombraInferior)"
        opacity={0.2}
      />
      <Path
        d={paths.CINTURADERECHA}
        fill={fill}
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.5}
      />

      <Path
        d={paths.CINTURADERECHA}
        fill="url(#sombraDerecha)"
        transform="translate(0, 4)"
        opacity={0.4}
      />
      <Path
        d={paths.PASADORDERECHO}
        fill={fill2}
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.5}
      />
      <Path
        d={paths.PASADORDERECHO}
        fill="url(#sombraCentroVertical)"
        opacity={0.5}
      />

      <Path d={paths.MEDSUPERIORDERECHA} fill="none" stroke={stroke} />
      <Path
        d={paths.MEDSUPERIORDERECHA}
        fill="none"
        stroke="url(#sombraSuperior)"
        strokeWidth={1}
        strokeOpacity={0.4}
      />

      <Path
        d={paths.ZIPPER}
        transform="translate(-2.5, 0)"
        fill="url(#sombraDerecha)"
        opacity={0.6}
      />
      <Path
        d={paths.ZIPPER}
        fill={fill2}
        stroke="black"
        strokeWidth={0.5}
        strokeOpacity={0.5}
      />

      <Path
        d={paths.PIERNAINFERIORDERECHA}
        fill={fill3}
        stroke={fill3}
        strokeWidth={0.5}
        strokeOpacity={1}
      />
      <Path
        d={paths.PIERNAINFERIORDERECHA}
        fill="url(#sombraCentroVertical)"
        stroke="none"
        fillOpacity={0.2}
      />
      <Path
        d={paths.PIERNAINFERIORDERECHA2}
        fill={fill4}
        stroke={fill4}
        strokeWidth={0.5}
        strokeOpacity={1}
      />
      <Path
        d={paths.PIERNAINFERIORDERECHA2}
        fill="url(#sombraCentroVertical)"
        stroke="url(#sombraCentroVertical)"
        fillOpacity={0.2}
        strokeWidth={0.5}
        strokeOpacity={0.2}
      />

      <Path
        d={paths.BOLSILLODELANTERODERECHO}
        fill="#000"
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.8}
        fillOpacity={0.2}
      />
      <Path
        d={paths.BOLSILLODELANTERODERECHO}
        fill="#000"
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.8}
        fillOpacity={0.2}
        transform="translate(0, -2)"
      />
      <Path
        d={paths.BOLSILLODELANTEROIZQUIERDO}
        fill="#000"
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.8}
        fillOpacity={0.2}
      />
      <Path
        d={paths.BOLSILLODELANTEROIZQUIERDO}
        fill="#000"
        stroke="#000"
        strokeWidth={0.5}
        strokeOpacity={0.8}
        fillOpacity={0.2}
        transform="translate(0, -2)"
      />

      <Path
        d={paths.CIERRE}
        fill="none"
        stroke="#000"
        strokeWidth={2}
        strokeOpacity={0.6}
      />
      <Path
        d={paths.PLIEGUEIZQUIERDA}
        fill={fill4}
        stroke="#000"
        fillOpacity={1}
        strokeWidth={0.5}
        strokeOpacity={0.2}
      />
      <Path
        d={paths.PLIEGUEDERECHA}
        fill={fill3}
        stroke="none"
        fillOpacity={1}
        strokeWidth={0.5}
        strokeOpacity={0.2}
      />

      {paths.FLYCOORDSCIERRE?.cierre && (
        <SvgImage
          href={boton2}
          x={buttonPos.x}
          y={buttonPos.y - 4}
          width="8"
          height="8"
        />
      )}
    </Svg>
  );
};
