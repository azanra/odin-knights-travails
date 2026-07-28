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
    let queue: IPosition[] = [];
    queue.push(startPosition);

    const visited: IPosition[] = [];
    let edgeList: IPosition[][] = [];

    while (queue.length !== 0) {
      const firstItem = queue.shift();
      if (!firstItem) break;

      if (JSON.stringify(firstItem) === JSON.stringify(targetPosition)) {
        visited.push(firstItem);
        break;
      }

      const possibleMove = getNextPossibleMove(firstItem);
      const validMove = getValidMove(possibleMove, visited);

      edgeList = [...edgeList, ...getEdgeList(firstItem, validMove)];
      queue = [...queue, ...validMove];
      console.log("first item:", firstItem);
      console.log("valid move: ", validMove);
      console.log("queue:", queue);
      console.log("visited:", visited);
      console.log("edge list: ", edgeList);
      console.log("=========-======= \n");

      visited.push(firstItem);
    }

    console.log(visited);
    console.log(edgeList);
  };

  const getNextPossibleMove = (startPosition: IPosition): IPosition[] => {
    return NEXT_MOVE.map((move) => [...getNextMove(startPosition, move)]);
  };

  const getNextMove = (position: IPosition, nextMove: INextMove): IPosition => {
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

  const getValidMove = (possibleMove: IPosition[], visited: IPosition[]) => {
    return possibleMove.filter((move) => {
      const [x, y] = move;
      return isValid(x) && isValid(y) && !isVisited(move, visited);
    });
  };

  const isValid = (axes: number) => axes >= 0 && axes <= 7;

  const isVisited = (move: IPosition, visited: IPosition[]) => {
    const stringifiedVisited = JSON.stringify(visited);
    const stringifiedMove = JSON.stringify(move);

    const indexOccurrence = stringifiedVisited.indexOf(stringifiedMove);

    return indexOccurrence !== -1;
  };

  const getEdgeList = (firstItem: IPosition, validMove: IPosition[]) =>
    validMove.map((move) => [firstItem, move]);

  return { levelOrderTraversal };
})();

export default knightMovesUtils;
