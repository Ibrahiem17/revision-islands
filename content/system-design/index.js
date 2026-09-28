export default {
  title: "System Design",
  icon: "🏗️",
  sections: [
    {
      title: "Sample Section — Scaling",
      items: [
        {
          type: "concept",
          id: "sd-1",
          title: "Horizontal vs Vertical scaling",
          body: "Vertical = bigger machine (more CPU/RAM), simple but has a ceiling. Horizontal = more machines, needs load balancing and often a distributed data layer, but scales further."
        },
        {
          type: "qa",
          id: "sd-2",
          question: "How would you explain a CDN in one sentence?",
          answer: "A globally distributed network of caching servers that serve static (and sometimes dynamic) content from a location close to the user to cut latency and origin load."
        }
      ]
    }
  ]
};
