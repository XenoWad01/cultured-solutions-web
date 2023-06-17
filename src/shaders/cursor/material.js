import { ShaderMaterial } from "three"
import { vertex } from "./vertex"
import { fragment } from "./fragment"

export const material = new ShaderMaterial( {
  uniforms: {
    time: { type: "f", value: 0.0 },
    noiseFreq: { type: 'f', value: 0.5 },
    noiseAmp: {type: 'f', value: 0.5}
  },
  
  vertexShader: vertex,
  fragmentShader: fragment
})