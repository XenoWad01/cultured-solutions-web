import { Material, ShaderMaterial, Vector3 } from "three"
import { vertex } from "./vertex"
import { fragment } from "./fragment"

// uniform float themeFactor;
// uniform vec3 colorA1;
// uniform vec3 colorA2;
// uniform vec3 colorB1;
// uniform vec3 colorB2;

// A -(lerp)-> B based on themeFactor;

export const createMaterialFromColors = (color) => {

  return new ShaderMaterial({
  uniforms: {
    time: { type: "f", value: 0.0 },
    noiseFreq: { type: 'f', value: 0 },
    noiseAmp: { type: 'f', value: 0 },
    color: { type: 'vec3', value: color },

  },
  vertexShader: vertex,
  fragmentShader: fragment
})
}
