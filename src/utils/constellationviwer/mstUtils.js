export const kruskalMST = (edges, numPoints) => {
  const parent = Array(numPoints)
    .fill(0)
    .map((_, idx) => idx);

  const findRoot = (node) => {
    if (parent[node] !== node) parent[node] = findRoot(parent[node]);
    return parent[node];
  };

  const unionNodes = (node1, node2) => {
    const root1 = findRoot(node1);
    const root2 = findRoot(node2);
    if (root1 !== root2) parent[root2] = root1;
  };

  const mstEdges = [];
  for (const [startIdx, endIdx] of edges) {
    if (findRoot(startIdx) !== findRoot(endIdx)) {
      unionNodes(startIdx, endIdx);
      mstEdges.push([startIdx, endIdx]);
      if (mstEdges.length === numPoints - 1) break;
    }
  }

  return mstEdges;
};

export const calculateEdges = (points) => {
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      edges.push([i, j, calculateDistance(points[i], points[j])]);
    }
  }
  return edges.sort((a, b) => a[2] - b[2]);
};
