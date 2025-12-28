import React from "react";
import { Svg, Defs, G, Image as SvgImage, Path } from "react-native-svg";
import { getPantPaths } from "./PantPaths/pantPaths2";
import { Textures } from "../Textura/textura";
import { Filters } from "../Filtros/filters";
import boton2 from "../../assets/botones/boton2.png";

interface PantsBackProps {
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

export const PantsBack: React.FC<PantsBackProps> = ({
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

  const buttonRightPos = paths.FLYCOORDS?.derecho || { x: 0, y: 0 };
  const buttonLeftPos = paths.FLYCOORDS?.izquierdo || { x: 0, y: 0 };

  const fill = useTexture ? "url(#textura)" : fillColor;
  const fill2 = useTexture ? "url(#textura2)" : fillColor;
  const fill3 = useTexture ? "url(#textura6)" : fillColor;
  const fill4 = useTexture ? "url(#textura7)" : fillColor;
  const stroke = useTexture ? "url(#textura)" : strokeColor;

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

      <G transform="scale(-1, 1) translate(-500, 0)">
        <Path
          d={paths.PIERNASUPERIORIZQUIERDA}
          fill={fill}
          stroke={fill}
          strokeWidth={0.5}
          strokeOpacity={1}
        />
        <Path
          d={paths.PIERNASUPERIORIZQUIERDA}
          fill="url(#sombraSuperior)"
          stroke="url(#sombraInferior)"
          opacity={0.2}
        />
        <Path
          d={paths.CINTURATRACERAIZQUIERDA}
          fill={fill}
          stroke="#000"
          strokeWidth={0.5}
          strokeOpacity={0.5}
        />
        <Path
          d={paths.CINTURATRACERAIZQUIERDA}
          fill="url(#sombraInferior)"
          opacity={0.3}
        />
        <Path
          d={paths.PASADORTRACERAIZQUIERDA}
          fill={fill2}
          stroke="#000"
          strokeWidth={0.5}
          strokeOpacity={0.5}
        />
        <Path
          d={paths.PASADORTRACERAIZQUIERDA}
          fill="url(#sombraCentroVertical)"
          opacity={0.3}
        />

        <Path
          d={paths.BOLSILLOTRASEROIZQUIERDO}
          stroke="#000"
          strokeWidth={3}
          strokeOpacity={0.5}
          fill="none"
        />
        <Path
          d={paths.BOLSILLOTRASEROIZQUIERDO}
          fill={fill2}
          stroke={stroke}
          strokeWidth={1}
          strokeOpacity={0.2}
        />
        <Path
          d={paths.PESTAÑATRASEROIZQUIERDO}
          fill={fill2}
          stroke="#000"
          strokeOpacity={0.5}
          strokeWidth={0.5}
        />

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
          strokeOpacity={0.5}
        />
        <Path
          d={paths.PIERNASUPERIORDERECHA}
          fill="url(#sombraSuperior)"
          stroke="url(#sombraInferior)"
          opacity={0.2}
        />
        <Path
          d={paths.CINTURATRACERADERECHA}
          fill={fill}
          stroke="#000"
          strokeWidth={0.5}
          strokeOpacity={0.5}
        />
        <Path
          d={paths.CINTURATRACERADERECHA}
          fill="url(#sombraDerecha)"
          opacity={0.2}
        />
        <Path
          d={paths.PASADORTRACERADERECHA}
          fill={fill2}
          stroke="#000"
          strokeWidth={0.5}
          strokeOpacity={0.5}
        />
        <Path
          d={paths.PASADORTRACERADERECHA}
          fill="url(#sombraCentroVertical)"
          opacity={0.5}
        />

        <Path
          d={paths.BOLSILLOTRASERODERECHO}
          stroke="black"
          strokeWidth={3}
          strokeOpacity={0.5}
          fill="none"
        />
        <Path
          d={paths.BOLSILLOTRASERODERECHO}
          fill={fill2}
          stroke={stroke}
          strokeWidth={1}
          strokeOpacity={0.1}
        />
        <Path
          d={paths.PESTAÑATRASERODERECHO}
          fill={fill2}
          stroke="#000"
          strokeOpacity={0.5}
          strokeWidth={0.5}
        />

        <Path
          d={paths.PIERNAINFERIORDERECHA}
          fill={fill4}
          stroke={fill4}
          strokeWidth={0.5}
          strokeOpacity={1}
        />
        <Path
          d={paths.PIERNAINFERIORDERECHA}
          fill="url(#sombraCentroVertical)"
          stroke="url(#sombraCentroVertical)"
          fillOpacity={0.2}
          strokeOpacity={0.05}
        />
        <Path
          d={paths.PIERNAINFERIORDERECHA2}
          fill={fill3}
          stroke={fill3}
          strokeWidth={0.5}
          strokeOpacity={1}
        />
        <Path
          d={paths.PIERNAINFERIORDERECHA2}
          fill="url(#sombraCentroVertical)"
          stroke="url(#sombraCentroVertical)"
          strokeWidth={0.5}
          fillOpacity={0.05}
        />

        <Path
          d={paths.OJALDERECHO}
          fill="none"
          stroke="#000"
          strokeWidth={1}
          strokeOpacity={0.6}
        />
        <Path
          d={paths.OJALIZQUIERDO}
          fill="none"
          stroke="#000"
          strokeWidth={1}
          strokeOpacity={0.6}
        />

        <SvgImage
          href={boton2}
          x={buttonRightPos.x - 3}
          y={buttonRightPos.y - 5}
          width="6"
          height="6"
        />
        <SvgImage
          href={boton2}
          x={buttonLeftPos.x - 3}
          y={buttonLeftPos.y - 5}
          width="6"
          height="6"
        />
      </G>
    </Svg>
  );
};
