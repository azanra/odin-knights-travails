import NEXT_MOVE from "../constants/knightMovesConst.ts";
import type {
  INextMove,
  IPosition,
} from "../interfaces/knightMovesInterface.ts";

const knightMovesUtils = (() => {
  const levelOrderTraversal = (
    startPosition: IPosition,
    targetPosition: IPosition,
  ) => {
    const queue = [];
    queue.push(startPosition);

    while (queue.length !== 0) {
      const firstItem = queue[0];
      if (!firstItem) break;

      const possibleMove = getNextPossibleMove(firstItem);
    }
  };

  const getNextPossibleMove = (startPosition: IPosition) => {
    return NEXT_MOVE.map((move) => [...getNextMove(startPosition, move)]);
  };

  const getNextMove = (position: IPosition, nextMove: INextMove) => {
    const [x, y] = position;

    return [
      handleNextMove(x, nextMove.xOperator, nextMove.xAmount),
      handleNextMove(y, nextMove.yOperator, nextMove.yAmount),
    ];
  };

  const handleNextMove = (
    axesPosition: number,
    operator: string,
    amount: number,
  ) => {
    return operator === "+" ? axesPosition + amount : axesPosition - amount;
  };

  return { levelOrderTraversal };
})();

export default knightMovesUtils;
