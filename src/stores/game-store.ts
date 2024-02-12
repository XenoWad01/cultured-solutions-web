import { create } from "zustand"
import { gameConfig } from "@/components/THREE/config"

type GameApi = {
    gameState: Array<Array<Array<boolean>>>,
    prevGameState: Array<Array<Array<boolean>>>,
    nextGameState: Array<Array<Array<boolean>>>,
    count: number,
    updateGame: () => void,
}


const getNextCellState = (neighbourCount, x,y,z) => {

    // console.log(`input neighbour count: ${neighbourCount} AT (${x},${y},${z})`)

    if(neighbourCount >= 3  && neighbourCount <= 4){
      return true;
    } else {
        return false
    } 
  }  
  
const oneOrZero = (thing: boolean | undefined) => thing === undefined ? 0 : Number(thing)

const getNextGen = (oldState: Array<Array<Array<boolean>>>) => {
    let nextGen: Array<Array<Array<boolean>>> = oldState;
    for( let z = 0; z < gameConfig.side; z++ ) {
      for( let y = 0; y < gameConfig.side; y++ ) {
        for( let x = 0; x < gameConfig.side; x++ ) {

          let neighbourCount = 
          oneOrZero(oldState?.[x - 1]?.[y]?.[z]) +     // Left
          oneOrZero(oldState?.[x + 1]?.[y]?.[z]) +     // Right
          oneOrZero(oldState?.[x]?.[y - 1]?.[z]) +     // Up
          oneOrZero(oldState?.[x]?.[y + 1]?.[z]) +     // Down
          oneOrZero(oldState[x]?.[y]?.[z - 1])   +     // Backward
          oneOrZero(oldState[x]?.[y]?.[z + 1])   +     // Forward
  
          // Diagonal neighbours
          oneOrZero(oldState?.[x - 1]?.[y - 1]?.[z]) + // Up-Left
          oneOrZero(oldState?.[x + 1]?.[y - 1]?.[z]) + // Up-Right
          oneOrZero(oldState?.[x - 1]?.[y + 1]?.[z]) + // Down-Left
          oneOrZero(oldState?.[x + 1]?.[y + 1]?.[z]) + // Down-Right
  
          oneOrZero(oldState?.[x - 1]?.[y]?.[z - 1]) + // Backward-Left
          oneOrZero(oldState?.[x + 1]?.[y]?.[z - 1]) + // Backward-Right
          oneOrZero(oldState?.[x - 1]?.[y]?.[z + 1]) + // Forward-Left
          oneOrZero(oldState?.[x + 1]?.[y]?.[z + 1]) + // Forward-Right
  
          oneOrZero(oldState?.[x]?.[y - 1]?.[z - 1]) + // Up-Backward
          oneOrZero(oldState?.[x]?.[y + 1]?.[z - 1]) + // Down-Backward
          oneOrZero(oldState?.[x]?.[y - 1]?.[z + 1]) + // Up-Forward
          oneOrZero(oldState?.[x]?.[y + 1]?.[z + 1]);  // Down-Forward
  
  
          nextGen[x][y][z] = getNextCellState(neighbourCount,x,y,z)
  
        }
      }
    }

    
    return nextGen
  
}

function generateRandomBooleanMatrix(n) {
    const matrix = [];
  
    for (let z = 0; z < n; z++) {
      const yMatrix = [];
      for (let y = 0; y < n; y++) {
        const xArray = [];
        for (let x = 0; x < n; x++) {
          xArray.push(Math.random() < 0.5); // Randomly set to true or false
        }
        yMatrix.push(xArray);
      }
      matrix.push(yMatrix);
    }
  
    return matrix;
  }
  
  
const defaultPrevGameState = generateRandomBooleanMatrix(gameConfig.side)
const defaultGameState = getNextGen(defaultPrevGameState)
const deafultNextGameState = getNextGen(defaultGameState)


export const useGameStore = create<GameApi>()(
      (set) => ({
        prevGameState: defaultPrevGameState,
        gameState: defaultGameState,
        nextGameState: deafultNextGameState,
        count: 0,
        updateGame: () => {


            set((state) => ({
                prevGameState: state.gameState
            }))
            set((state) => ({
                gameState: state.nextGameState
            }))
            set((state) => ({
                nextGameState: getNextGen(state.gameState)
            }))


        }

      }),
)