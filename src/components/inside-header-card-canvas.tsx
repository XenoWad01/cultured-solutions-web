import { useFrame } from "@react-three/fiber";

export const InsideHeaderCardCanvas = ({ ballRef, noiseAmp, noiseFreq }) => {
  useFrame((state) => {
    if (ballRef.current.material) {
      (ballRef.current.material).uniforms.time.value = state.clock.elapsedTime;
      (ballRef.current.material).uniforms.noiseFreq.value = noiseFreq.get();
      (ballRef.current.material).uniforms.noiseAmp.value = noiseAmp.get();

      ballRef.current.rotateX += state.clock.elapsedTime
    }
  });
  return <>
  
  </>
}