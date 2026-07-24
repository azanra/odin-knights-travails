import knightMovesUtils from "./utils/knightMovesUtils.ts";

const knightMoves = (startPosition: number[], targetPosition: number[]) => {
  return knightMovesUtils.levelOrderTraversal(startPosition, targetPosition);
};

export default knightMoves;
