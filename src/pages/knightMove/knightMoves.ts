import type { IPosition } from "./interfaces/knightMovesInterface.ts";
import knightMovesUtils from "./utils/knightMovesUtils.ts";

const knightMoves = (startPosition: IPosition, targetPosition: IPosition) => {
  return knightMovesUtils.levelOrderTraversal(startPosition, targetPosition);
};

export default knightMoves;
