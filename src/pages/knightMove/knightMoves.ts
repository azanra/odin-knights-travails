import type { IPosition } from "./interfaces/knightMovesInterface.ts";
import knightMovesUtils from "./utils/knightMovesUtils.ts";

const knightMoves = (startPosition: IPosition, targetPosition: IPosition) => {
  const { edgeList } = knightMovesUtils.levelOrderTraversal(
    startPosition,
    targetPosition,
  );

  const shortestPath = knightMovesUtils.getShortestPath({
    startPosition,
    targetPosition,
    edgeList,
  });

  console.log({ shortestPath });
};

export default knightMoves;
