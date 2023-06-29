import { Material, ShaderMaterial, Vector3 } from "three"
import { vertex } from "./vertex"
import { fragment } from "./fragment"

// uniform float themeFactor;
// uniform vec3 colorA1;
// uniform vec3 colorA2;
// uniform vec3 colorB1;
// uniform vec3 colorB2;

// A -(lerp)-> B based on themeFactor;

export const createMaterialFromColors = (color1, color2) => {

  return new ShaderMaterial({
  uniforms: {
    time: { type: "f", value: 0.0 },
    noiseFreq: { type: 'f', value: 0 },
    noiseAmp: { type: 'f', value: 0 },
    color1: { type: 'vec3', value: color1 },
    color2: { type: 'vec3', value: color2 },
  },
  vertexShader: vertex,
  fragmentShader: fragment
})
}
