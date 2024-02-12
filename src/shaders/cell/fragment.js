export const fragment =`
precision mediump float;
varying vec2 vUv;
varying float vWave;

uniform float themeFactor;
uniform vec3 color1;
uniform vec3 color2;

uniform float time; 

void main() {
   
  vec2 normalizedPixel = gl_FragCoord.xy * vWave * vUv;


  vec3 color = mix(color1, color2, sin(vWave/1.));

  gl_FragColor = vec4(color,1.0);
}

`