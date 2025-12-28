// src/components/Textures.tsx
import React from "react";
import { Defs, Image, Pattern } from "react-native-svg";
import { fabricImages } from "screen/OptionsScreen/components/fabricImages";

interface TexturesProps {
  selectedFabric?: { name: string }; // solo necesitas el identificador de la tela
}

export function Textures({ selectedFabric }: TexturesProps) {
  // 🔹 Obtener la imagen seleccionada o fallback
  const textura1 =
    selectedFabric?.name && fabricImages[selectedFabric.name]
      ? fabricImages[selectedFabric.name]
      : fabricImages["Oberon"]; // fallback si no hay selección

  // 🔹 Imagen secundaria (puede ser fija o también dinámica)
  const textura2 = require("../../assets/forros/81_normal.jpg");

  return (
    <Defs>
      {/* Patrones principales */}
      <Pattern
        id="textura"
        patternUnits="userSpaceOnUse"
        width={150}
        height={110}
        patternTransform="scale(0.1)"
      >
        <Image
          href={textura1}
          x={0}
          y={-110}
          width={300}
          height={220}
          preserveAspectRatio="none"
        />
      </Pattern>

      <Pattern
        id="textura2"
        patternUnits="userSpaceOnUse"
        width={150}
        height={110}
        patternTransform="translate(25,30) rotate(10) scale(0.1)"
      >
        <Image
          href={textura1}
          x={0}
          y={-110}
          width={300}
          height={220}
          preserveAspectRatio="none"
        />
      </Pattern>

      <Pattern
        id="textura6"
        patternUnits="userSpaceOnUse"
        width={150}
        height={110}
        patternTransform="translate(0,0) rotate(0.1) scale(0.1)"
      >
        <Image
          href={textura1}
          x={0}
          y={-110}
          width={300}
          height={220}
          preserveAspectRatio="none"
        />
      </Pattern>

      <Pattern
        id="textura7"
        patternUnits="userSpaceOnUse"
        width={150}
        height={110}
        patternTransform="translate(0,0) rotate(0.1) scale(0.1)"
      >
        <Image
          href={textura1}
          x={0}
          y={-110}
          width={300}
          height={220}
          preserveAspectRatio="none"
        />
      </Pattern>

      {/* Patrones secundarios usando textura2 */}
      <Pattern
        id="textura3"
        patternUnits="userSpaceOnUse"
        width="250"
        height="500"
        patternTransform="translate(0,0) scale(0.1)"
      >
        <Image
          href={textura2}
          x="0"
          y="0"
          width="250"
          height="500"
          preserveAspectRatio="none"
        />
      </Pattern>

      <Pattern
        id="textura4"
        patternUnits="userSpaceOnUse"
        width="250"
        height="500"
        patternTransform="translate(0,0) rotate(45) scale(0.1)"
      >
        <Image
          href={textura2}
          x="0"
          y="0"
          width="250"
          height="500"
          preserveAspectRatio="none"
        />
      </Pattern>

      <Pattern
        id="textura5"
        patternUnits="objectBoundingBox"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <Image
          href={textura2}
          width="1"
          height="1"
          preserveAspectRatio="none"
        />
      </Pattern>

      {/* Patrones dinámicos adicionales */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Pattern
          key={`pattern-${i}`}
          id={`pattern-${i}`}
          patternUnits="userSpaceOnUse"
          width="275"
          height="212"
          patternTransform={`translate(${i * 2}, 0) rotate(${
            i * 0.5
          }) scale(0.1)`}
        >
          <Image
            href={textura1}
            x="0"
            y="0"
            width="275"
            height="212"
            preserveAspectRatio="none"
          />
        </Pattern>
      ))}

      {Array.from({ length: 5 }).map((_, i) => (
        <Pattern
          key={`pattern2-${i}`}
          id={`pattern2-${i}`}
          patternUnits="userSpaceOnUse"
          width="275"
          height="212"
          patternTransform={`translate(${i * 2}, 0) rotate(${
            i * 0.5
          }) scale(0.1)`}
        >
          <Image
            href={textura1}
            x="0"
            y="0"
            width="275"
            height="212"
            preserveAspectRatio="none"
          />
        </Pattern>
      ))}
    </Defs>
  );
}
