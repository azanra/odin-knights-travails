import NEXT_MOVE from "../constants/knightMovesConst.ts";
import type { INextMove } from "../interfaces/knightMovesInterface.ts";

const knightMovesUtils = (() => {
  const levelOrderTraversal = (
    startPosition: number[],
    targetPosition: number[],
  ) => {
    const queue = [];
    queue.push(startPosition);

    while (queue.length !== 0) {
      const firstItem = queue[0];
      const validMove = getValidMove(startPosition);
    }
  };

  const getValidMove = (startPosition: number[]) => {
    const possibleMove = NEXT_MOVE.map((move) => [
      ...getNextMove(startPosition, move),
    ]);

    console.log(possibleMove);
  };

  const getNextMove = (position: number[], nextMove: INextMove) => {
    const [x, y] = position;

    if (x === undefined || y === undefined) return [null, null];

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
