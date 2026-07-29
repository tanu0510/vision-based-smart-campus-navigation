function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[start] = 0;

  while (unvisited.size > 0) {
    let currentNode = null;

    unvisited.forEach((node) => {
      if (
        currentNode === null ||
        distances[node] < distances[currentNode]
      ) {
        currentNode = node;
      }
    });

    if (currentNode === end) {
      break;
    }

    unvisited.delete(currentNode);

    for (const neighbor in graph[currentNode]) {
      const distance =
        distances[currentNode] + graph[currentNode][neighbor];

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = currentNode;
      }
    }
  }

  const path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  if (path[0] !== start) {
    return [];
  }

  return path;
}

export default dijkstra;