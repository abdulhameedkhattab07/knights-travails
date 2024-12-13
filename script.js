// Factory function to represent a board position
const Position = (x, y, path = []) => {
  return { x, y, path };
};

// // Factory function for the chessboard
const KnightMoves = () => {
  // All possible moves a knight can make
  const moves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  // Check if a position is valid on the board
  const isValid = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

  // Breadth-First Search to find the shortest path
  const findShortestPath = (start, target) => {
    const queue = [];
    const visited = new Set();

    // Initialize the queue with the starting position
    queue.push(Position(start[0], start[1], [start]));
    visited.add(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
      const current = queue.shift();

      // If the target is reached, return the path
      if (current.x === target[0] && current.y === target[1]) {
        return current.path;
      }

      // Explore all valid knight moves
      for (const [dx, dy] of moves) {
        const newX = current.x + dx;
        const newY = current.y + dy;

        if (isValid(newX, newY) && !visited.has(`${newX},${newY}`)) {
          visited.add(`${newX},${newY}`);
          queue.push(Position(newX, newY, [...current.path, [newX, newY]]));
        }
      }
    }

    // Return null if no path is found (should not happen in this case)
    return null;
  };

  return { findShortestPath };
};

// Example Usage
const knight = KnightMoves();
const start = [3, 3];
const target = [4, 3];
const path = knight.findShortestPath(start, target);

console.log(`Shortest path from ${start} to ${target}:`);
console.log(path);
