export const fragment =`
precision mediump float;
varying vec2 vUv;
varying float vWave;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);
uniform float time; 

void main() {
  // "Normalizing" with an arbitrary value
  // We'll see a cleaner technique later :)   
  vec2 normalizedPixel = gl_FragCoord.xy * vWave * vUv;
  vec3 color = mix(colorA, colorB, sin(vWave/2.));

  gl_FragColor = vec4(color,1.0);
}

`