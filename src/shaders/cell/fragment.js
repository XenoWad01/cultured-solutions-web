export const fragment =`
precision mediump float;
varying vec2 vUv;
varying float vWave;

uniform float themeFactor;
uniform vec3 color;


uniform float time; 

void main() {
   
  vec2 normalizedPixel = gl_FragCoord.xy * vWave * vUv;

  gl_FragColor = vec4(color,1.0);
}

`