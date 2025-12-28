import React from "react";
import { Defs, LinearGradient, RadialGradient, Stop } from "react-native-svg";

export const Filters: React.FC = () => (
  <Defs>
    {/* Sombras exteriores */}
    <LinearGradient id="sombraDerecha" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0.5} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </LinearGradient>

    <LinearGradient id="sombraIzquierda" x1="1" y1="0" x2="0" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0.5} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </LinearGradient>
    <LinearGradient id="sombraIzquierda2" x1="1" y1="0" x2="0" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={1} />
      <Stop offset="100%" stopColor="black" stopOpacity={0.2} />
    </LinearGradient>

    <LinearGradient id="sombraSuperior" x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0%" stopColor="black" stopOpacity={0.5} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </LinearGradient>

    <LinearGradient id="sombraInferior" x1="0" y1="1" x2="0" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0.5} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </LinearGradient>

    {/* Sombras interiores */}
    <LinearGradient id="sombraInteriorDerecha" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0} />
      <Stop offset="100%" stopColor="black" stopOpacity={0.5} />
    </LinearGradient>

    <LinearGradient id="sombraInteriorIzquierda" x1="1" y1="0" x2="0" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0} />
      <Stop offset="100%" stopColor="black" stopOpacity={0.5} />
    </LinearGradient>

    <LinearGradient id="sombraInteriorSuperior" x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0%" stopColor="black" stopOpacity={0} />
      <Stop offset="100%" stopColor="black" stopOpacity={0.5} />
    </LinearGradient>

    <LinearGradient id="sombraInteriorInferior" x1="0" y1="1" x2="0" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0} />
      <Stop offset="100%" stopColor="black" stopOpacity={0.5} />
    </LinearGradient>

    {/* Gradientes radiales */}
    <RadialGradient id="sombraRadial" cx="50%" cy="50%" r="50%">
      <Stop offset="0%" stopColor="black" stopOpacity={0.3} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </RadialGradient>

    <RadialGradient id="sombraRadialInterior" cx="50%" cy="50%" r="50%">
      <Stop offset="0%" stopColor="black" stopOpacity={0} />
      <Stop offset="100%" stopColor="black" stopOpacity={0.3} />
    </RadialGradient>

    {/* Gradientes centro */}
    <LinearGradient id="sombraCentroVertical" x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0%" stopColor="black" stopOpacity={0} />
      <Stop offset="50%" stopColor="black" stopOpacity={0.5} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </LinearGradient>

    <LinearGradient id="sombraCentroHorizontal" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0} />
      <Stop offset="50%" stopColor="black" stopOpacity={0.5} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </LinearGradient>

    <LinearGradient id="sombraCentroHorizontal2" x1="1" y1="0" x2="0" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0.8} />
      <Stop offset="50%" stopColor="black" stopOpacity={0.4} />
      <Stop offset="100%" stopColor="black" stopOpacity={0.8} />
    </LinearGradient>

    {/* Gradiente adicional cintura */}
    <LinearGradient id="cinturaIzquierda" x1="0" y1="1" x2="0" y2="0">
      <Stop offset="0%" stopColor="black" stopOpacity={0.5} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </LinearGradient>

    {/* Radiales personalizados */}
    <RadialGradient
      id="sombraCentroRadial"
      cx="0%"
      cy="50%"
      r="50%"
      fx="0%"
      fy="50%"
      gradientUnits="objectBoundingBox"
      gradientTransform="scale(1.5, 1.5)"
    >
      <Stop offset="0%" stopColor="black" stopOpacity={0.8} />
      <Stop offset="40%" stopColor="black" stopOpacity={0.4} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </RadialGradient>

    <RadialGradient
      id="sombraInferiorIzquierda"
      cx="100%"
      cy="100%"
      r="100%"
      fx="100%"
      fy="100%"
      gradientUnits="objectBoundingBox"
      gradientTransform="scale(1,1)"
    >
      <Stop offset="0%" stopColor="black" stopOpacity={0.5} />
      <Stop offset="50%" stopColor="black" stopOpacity={0.3} />
      <Stop offset="100%" stopColor="black" stopOpacity={0} />
    </RadialGradient>

    {/* Metallic Silver Gradient */}
    <LinearGradient id="metallicSilver" x1="0%" y1="0%" x2="100%" y2="0%">
      <Stop offset="0%" stopColor="#e6e6e6" />
      <Stop offset="20%" stopColor="#c9c9c9" />
      <Stop offset="40%" stopColor="#f5f5f5" />
      <Stop offset="60%" stopColor="#b0b0b0" />
      <Stop offset="80%" stopColor="#dcdcdc" />
      <Stop offset="100%" stopColor="#f2f2f2" />
    </LinearGradient>
  </Defs>
);
