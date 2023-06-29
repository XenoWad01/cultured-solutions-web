import { lerp } from "three/src/math/MathUtils";

export const computePageLerp = (from: number, to: number, progressToNextPage: number, isActive:boolean, isNext: boolean,) => isActive ? lerp(from, to, 1-progressToNextPage) : isNext ? lerp(from, to, progressToNextPage) : from