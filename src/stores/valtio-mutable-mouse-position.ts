import { Vector2, Vector3,  } from 'three'
import { proxy } from 'valtio'

export const mousePositionSnapshot = proxy({  
  mousePosition: new Vector3(0,0,0),
  domMousePosition: new Vector2 (0,0),
  clicked: 0,
 })