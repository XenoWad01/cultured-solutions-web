import { Color as ThreeColor, Vector3 } from "three";


export default class Color extends ThreeColor {
  private numToHex(c: number): string {

    const hex = c.toString(16);
  
    return hex.length <= 1 ? `0${hex}` : hex
  
  }
  private rgbToHex(r:number, g:number, b:number): string {
    return`#${this.numToHex(r)}${this.numToHex(g)}${this.numToHex(b)}`;
  }
  
  toRGBString() {
    return `rgb(${Math.floor(this.r * 255)},${Math.floor(this.g * 255)},${Math.floor(this.b * 255)})`
  }
  toVec3() {
    return new Vector3(this.r, this.g, this.b)
  }
  toHexString() {
    return this.rgbToHex(this.r, this.g, this.b)
  }
}
