export default {
  title: "DSA",
  icon: "🌳",
  sections: [
    {
      title: "Sample Section — Trees",
      items: [
        {
          type: "qa",
          id: "dsa-1",
          question: "What's the time complexity of searching a balanced BST?",
          answer: "O(log n), because each comparison eliminates roughly half of the remaining nodes."
        },
        {
          type: "concept",
          id: "dsa-2",
          title: "DFS vs BFS",
          body: "DFS explores as deep as possible before backtracking (stack / recursion, good for path existence). BFS explores level by level (queue, good for shortest path in unweighted graphs)."
        }
      ]
    },
    {
      title: "Sample Section — Complexity",
      items: [
        {
          type: "list",
          id: "dsa-3",
          title: "Common time complexities, fastest to slowest",
          points: ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"]
        }
      ]
    }
  ]
};
