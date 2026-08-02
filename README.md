# Odin Knight Travails

This is submission for [Odin Knight Travails](https://www.theodinproject.com/lessons/javascript-knights-travails) project.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

### The challenge

Users should be able to:

- Input the starting and target position
- Output it shortest path from starting to target position
- Output the amount of steps path needed from starting to target position

## My process

### Built with

- Typescript and IIFE (Immediately Invoked Function Expression) Module pattern for organizing the code

### What I learned

Graph is tree like data structure, the difference is instead of node, each node will be called vertices (vertex for single item). if vertices is connected to other vertices it's called edge instead of children.

Graph is used for representing data like social network, where each vertices is each of individual people and edge is any of the relationship they have with another people. in this case it will be called undirected graph because the relationship goes both way where if A know B, then B also know A.

Path with the least amount of edge needed to traverse from vertex A to X, it called shortest path.

The problem in this project is chessboard, where we need to use knight to travel from certain point to it target. We need to output the path that it taken with the least of amount of edge (shortest path). That mean each possible position on the chessboard is the vertices (with two main axes x and y)and each possible move from the position is the edge.

To know traverse the board, we used Breadth First Search, where we travel all of the possible of the position (edge) before proceeding to the next position. It will used queue to track which position to to explore next.

This is some problem that we need to tackle.

1. How to know next possible move from the current coordinate?
2. How to know which move (coordinate) to choose from all of the possible moves?
3. Which data structure to use for each multiple move that are possible?
4. Which search algorithm to find the shortest path?
5. How to represent the graph?

Note that this list question is before change to the lesson [here](https://github.com/TheOdinProject/curriculum/pull/31236), Before they remove the confusing hint that tell us to choose which search algorithm to use (which take me long time to figure out...)

To know the next possible move is the valid move that knight can make, they can move in L shaped coordinate. In short it can only move to position with absolute difference of [1, 2] or [2, 1].

We using a constant to use to create next possible move from certain coordinate. Also the possible move will be filtered before proceeding because in chessboard can only happen in range of coordinate from 0 to 7. (there is probably a better way to do this)

```js
const NEXT_MOVE = [
  {
    xOperator: "+",
    xAmount: 1,
    yOperator: "+",
    yAmount: 2,
  },
  {
    xOperator: "+",
    xAmount: 2,
    yOperator: "+",
    yAmount: 1,
  },
  {
    xOperator: "+",
    xAmount: 2,
    yOperator: "-",
    yAmount: 1,
  },
  {
    xOperator: "+",
    xAmount: 1,
    yOperator: "-",
    yAmount: 2,
  },
  {
    xOperator: "-",
    xAmount: 1,
    yOperator: "-",
    yAmount: 2,
  },
  {
    xOperator: "-",
    xAmount: 2,
    yOperator: "-",
    yAmount: 1,
  },
  {
    xOperator: "-",
    xAmount: 2,
    yOperator: "+",
    yAmount: 1,
  },
  {
    xOperator: "-",
    xAmount: 1,
    yOperator: "+",
    yAmount: 2,
  },
];
```

To explore all of the possible move we used queue to track which coordinate to explore next. First it will add the start position into the queue, get the first item in the queue and check if the first item is equal to target, Else it will get the valid move from that position.

To represent the graph we will used edge list. Because from what i've seen this is the only way to represent two dimensional coordinate on the chessboard. And to avoid visiting the same position all over again, we will track the visited position (this is different with queue, where it will used to track discovered vertices on each level)

```js
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

      visited.push(firstItem);
    }

    return {
      edgeList,
    };
  };
```

To get possible move it will loop through the constant of possible move and do the operation on each item to get the possible move.

```js
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
```

To get edge list, it will loop through the valid move to to create coordinate with the current first item.

```js
  const getEdgeList = (firstItem: IPosition, validMove: IPosition[]) =>
    validMove.map((move) => [firstItem, move]);
```

From the edge list that have been created, We will start tracing the shortest path between start and target position. First it will trace which vertex that is connected to target position from the edge list. Remember that the edge list is structured like this,

```
(eg. [[0, 0], [1, 2]])
```

For example the target is

```
[1,2]
```

that mean the connected vertices is

```
[0, 0]
```

To do that it will loop through the edge list to get the current target. It will keep doing that until the current target is equal to target position. Because of that we will add the target position as last item in the array. Because of the current shortest path starting from target to starting position, we will reverse the the array to get the ordered shortest path from start to finish.

```js
  const traceBackEdgeList = (
    targetPosition: IPosition,
    edgeList: IPosition[][],
  ) => {
    const stringTarget = JSON.stringify(targetPosition);

    const currentIndex = edgeList.findIndex((edge) => {
      const stringCurrentEdge = JSON.stringify(edge);
      const currentEdgeIndex = stringCurrentEdge.indexOf(stringTarget);

      return currentEdgeIndex !== -1;
    });

    const currentEdge = edgeList[currentIndex];

    return {
      connectedVertex: currentEdge?.[0],
    };
  };

  const getShortestPath = ({
    startPosition,
    targetPosition,
    edgeList,
  }: {
    startPosition: IPosition;
    targetPosition: IPosition;
    edgeList: IPosition[][];
  }) => {
    const visitedPath: IPosition[] = [];
    let currentTarget = targetPosition;

    while (currentTarget !== startPosition) {
      const { connectedVertex } = traceBackEdgeList(currentTarget, edgeList);
      if (!connectedVertex) break;

      visitedPath.push(currentTarget);
      currentTarget = connectedVertex;
    }

    return {
      shortestPath: [...visitedPath, startPosition].toReversed(),
    };
  };
```

### Useful resources

````

- [Describing Graph](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/describing-graphs) - Explaining the basic on what is graph

- [Representing graphs](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs) - Explaining on how to represent graph as a data in our program

```

```
````
