// All code examples in these notes are plain-English pseudocode (no real programming syntax).
import myNotes from "./my-notes.js";

const builtIn = [
  {
    title: "⚡ Quick Revision — every DSA idea in one line",
    items: [
      { type: "concept", id: "qr-1", diagram: "bigoGrowth", diagramCaption: "Work grows with the input. Flat is best, the steep curves are the ones to fear.", title: "1 — Big-O", body: "Big-O tells you how a program's work **grows** as the input grows. Example: looping over a list of n items is O(n)." },
      { type: "concept", id: "qr-2", diagram: "arrayJump", diagramCaption: "Numbered lockers side by side: jump straight to any index.", title: "2 — Array", body: "Items side by side in memory; jumping to an index is **O(1)**. Example: jumping to locker number 3 is instant." },
      { type: "concept", id: "qr-3", diagram: "window", diagramCaption: "A frame slides along the row: add the new number, drop the old one.", title: "3 — Two pointers & sliding window", body: "Use two markers instead of a nested loop to turn O(n²) into **O(n)**. Example: best sum of 3 neighbours in a row." },
      { type: "concept", id: "qr-4", diagram: "llNodes", diagramCaption: "Each node holds a value and points to the next one.", title: "4 — Linked list", body: "Nodes that each **point to the next** one; easy to insert, slow to search. Example: a treasure hunt of clues." },
      { type: "concept", id: "qr-5", diagram: "stackPlates", diagramCaption: "Add and remove at the top only: last in, first out.", title: "5 — Stack", body: "**Last in, first out** (LIFO). Example: undo button, a pile of plates." },
      { type: "concept", id: "qr-6", diagram: "queueLine", diagramCaption: "Join at the back, leave from the front: first in, first out.", title: "6 — Queue", body: "**First in, first out** (FIFO). Example: a café line, BFS." },
      { type: "concept", id: "qr-7", diagram: "hashBuckets", diagramCaption: "A hash function turns the key into a bucket number.", title: "7 — Hash table", body: "Turns a key into a spot, so lookups are **O(1) on average**. Example: a phone book of name to number." },
      { type: "concept", id: "qr-8", diagram: "bstRule", diagramCaption: "Smaller on the left, bigger on the right.", title: "8 — Tree / BST / Heap", body: "A branching structure. A balanced BST searches in **O(log n)**; a heap always hands you the min (or max) fast." },
      { type: "concept", id: "qr-9", diagram: "graphBasics", diagramCaption: "Dots joined by lines: cities and roads.", title: "9 — Graph", body: "Dots (nodes) joined by lines (edges). **BFS** and **DFS** both cost O(V+E). Example: a map of cities and roads." },
      { type: "concept", id: "qr-10", diagram: "binarySearch", diagramCaption: "Check the middle, throw away half, repeat.", title: "10 — Binary search", body: "On a **sorted** list, check the middle and throw away half each time: O(log n). Example: guess-the-number game." },
      { type: "concept", id: "qr-11", diagram: "cardsInsertion", diagramCaption: "Like sorting a hand of cards: slide each new card into place.", title: "11 — Sorting", body: "Good sorts (merge, quick on average) run in about **O(n log n)**; bubble, insertion and selection are O(n²). Example: sorting a hand of cards." },
      { type: "concept", id: "qr-12", diagram: "fibMemo", diagramCaption: "A notebook of answers means nothing is worked out twice.", title: "12 — Recursion & DP", body: "Recursion solves a problem with a smaller copy of itself. **DP** remembers answers so nothing is solved twice. Example: Fibonacci with a cache." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Big-O (Complexity) — how fast does it grow?",
    items: [
      { type: "concept", id: "bigo-1", diagram: "bigoGrowth", diagramCaption: "Each curve shows how much more work you do as n gets bigger.", important: true, title: "What Big-O means", body: "Big-O answers one question: **if the input gets bigger, how much slower does my code get?** It ignores the exact seconds and looks only at the growth. We write n for the input size." },
      { type: "table", id: "bigo-2", diagram: "bigoBars", diagramCaption: "Steps needed for just 8 items. The gap explodes as you go down the list.", title: "The common speeds, fastest to slowest", headers: ["Big-O", "Name", "Everyday picture"], rows: [
        ["O(1)", "constant", "Grab the top book off a pile"],
        ["O(log n)", "logarithmic", "Find a word by opening the dictionary in the middle, again and again"],
        ["O(n)", "linear", "Read every page of a book"],
        ["O(n log n)", "linearithmic", "Sorting a deck of cards well"],
        ["O(n²)", "quadratic", "Every person in a room shakes hands with everyone else"],
        ["O(2ⁿ)", "exponential", "Trying every on/off combination of n switches"]
      ], note: "Read it top to bottom: the further down, the faster the work explodes as n grows." },
      { type: "list", id: "bigo-3", diagram: "loopTypes", diagramCaption: "One loop visits n items. A loop inside a loop visits n times n.", title: "How to spot it in code", points: [
        "No loop, just a few steps: **O(1)**.",
        "One loop over n items: **O(n)**.",
        "A loop inside a loop (both over n): **O(n²)**.",
        "Cutting the problem in half each step: **O(log n)**.",
        "Two loops one after the other: O(n + n), which is still just O(n)."
      ] },
      { type: "concept", id: "bigo-4", diagram: "bigoDrop", diagramCaption: "Keep only the biggest part: 2n + 10 is just O(n).", title: "Drop the small stuff", body: "O(2n + 10) is just **O(n)**. Constants and smaller terms stop mattering when n is huge, so we keep only the biggest part." },
      { type: "concept", id: "bigo-5", diagram: "timeSpace", diagramCaption: "Spend more memory to save time, or the other way round.", title: "Time vs space", body: "**Time** = how many steps. **Space** = how much extra memory. Often you can trade one for the other, like using a hash table (extra memory) to make lookups fast." },
      { type: "concept", id: "bigo-6", diagram: "bestWorst", diagramCaption: "Lucky search ends at the first item. Unlucky search checks them all.", title: "Best, average, worst case", body: "The same code can be lucky or unlucky. Searching a list: the item is first (best, O(1)) or last (worst, O(n)). Interviewers usually mean the **worst case** unless they say otherwise." },
      { type: "qa", id: "bigo-7", diagram: "loopGrid", diagramCaption: "4 rows, each running 4 steps: 4 × 4 = 16 steps.", question: "What is the Big-O of this: for i in range(n): for j in range(n): print(i, j)?", answer: "O(n²). The inner loop runs n times for each of the n outer steps, so n × n." },
      { type: "qa", id: "bigo-8", diagram: "n1000", diagramCaption: "Same 1,000 items, a thousand times more work for O(n²).", question: "Why is O(n) usually better than O(n²)?", answer: "Because it grows much slower. With 1,000 items, O(n) is about 1,000 steps but O(n²) is about 1,000,000." },
      { type: "concept", id: "bigo-9", takeaway: true, title: "Key takeaway", body: "Count the loops, ignore the constants, and say the **worst case**. Always be ready to state both time and space." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Arrays & Strings — the simplest container",
    items: [
      { type: "concept", id: "arr-1", diagram: "arrayJump", diagramCaption: "Numbered lockers side by side: jump straight to any index.", important: true, title: "What is an array?", body: "A row of lockers, numbered from 0, all side by side in memory. Because they are neighbours, the computer can jump straight to locker i, so reading item i is **O(1)**." },
      { type: "table", id: "arr-2", diagram: "arrShift", diagramCaption: "Reading is instant, but inserting in the middle makes the rest shuffle over.", title: "What each action costs", headers: ["Action", "Cost", "Why"], rows: [
        ["Read by index", "O(1)", "Jump straight there"],
        ["Search (unsorted)", "O(n)", "May check every item"],
        ["Insert / delete in the middle", "O(n)", "Everything after it shifts over"],
        ["Add at the end", "O(1) amortised", "Usually just one step (see next note)"]
      ] },
      { type: "concept", id: "arr-3", diagram: "dynArray", diagramCaption: "Full? Copy everything into a bigger array. It is rare, so adding stays cheap.", title: "Dynamic arrays (growing list)", body: "When a dynamic array runs out of room, it makes a bigger copy (usually double). That one copy is slow, but it rarely happens, so adding to the end is **O(1) amortised**, meaning O(1) on average over many adds." },
      { type: "concept", id: "arr-4", diagram: "strChars", diagramCaption: "A string is a row of letters. You can read letter i fast, but not edit it in place.", title: "Strings are arrays of characters", body: "A string is a row of characters, so reading letter i is O(1). In many languages strings are **immutable**: you cannot change one in place, so gluing letters on one by one can make a new copy each time. Collect the pieces first, then join them once." },
      { type: "code", id: "arr-5", diagram: "twoPtr", diagramCaption: "Two markers walk inwards from the ends and compare.", title: "Two pointers (pseudocode)", code: "Check if a word reads the same both ways\nPUT one marker at the first letter, one at the last\nWHILE the markers have not met\n  IF the two letters are different\n    ANSWER: not a palindrome, STOP\n  MOVE the left marker one step right\n  MOVE the right marker one step left\nANSWER: yes, it is a palindrome", note: "One marker at each end, walking inwards. One pass, so **O(n)** time and O(1) space. Also great for sorted arrays (e.g. find a pair that adds to a target)." },
      { type: "code", id: "arr-6", diagram: "window", diagramCaption: "The frame slides along: add the new number, drop the old one.", title: "Sliding window (pseudocode)", code: "Find the biggest sum of k neighbours\nADD up the first k numbers, call it WINDOW\nSET BEST = WINDOW\nFOR each next number in the row\n  ADD the new number to WINDOW\n  TAKE AWAY the number that just left the window\n  IF WINDOW is bigger than BEST, SET BEST = WINDOW\nANSWER: BEST", note: "Slide a frame along the array: add the new item, drop the old one. **O(n)** instead of re-adding k numbers every time." },
      { type: "list", id: "arr-7", diagram: "offByOne", diagramCaption: "With 5 items the last index is 4. Index 5 does not exist.", title: "Common pitfalls", points: [
        "Off-by-one: valid indexes run from 0 to len - 1.",
        "Changing a list while looping over it.",
        "Forgetting empty input and one-item input.",
        "Using = to copy a list: both names point to the same list."
      ] },
      { type: "qa", id: "arr-8", diagram: "arrShift", diagramCaption: "Making room at the front pushes every item one place to the right.", question: "Why is inserting at the front of an array slow?", answer: "Every existing item has to shift one place to make room, so it takes O(n) time." },
      { type: "concept", id: "arr-9", takeaway: true, title: "Key takeaway", body: "Arrays are **fast to read, slow to insert in the middle**. When you see a nested loop over an array, ask: can two pointers or a sliding window do it in one pass?" }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Linked Lists — a chain of nodes",
    items: [
      { type: "concept", id: "ll-1", diagram: "llNodes", diagramCaption: "Follow the pointers from the head, one clue at a time.", important: true, title: "Node + pointer", body: "A treasure hunt: each clue (node) holds a value and tells you where the **next** clue is (the pointer). You can only get to a clue by following the chain from the start (the head)." },
      { type: "concept", id: "ll-2", diagram: "llDoubly", diagramCaption: "One-way arrows (singly) versus arrows both ways (doubly).", title: "Singly vs doubly", body: "**Singly** linked: each node knows only the next one. **Doubly** linked: each node knows next and previous, so you can walk both ways, at the cost of extra memory." },
      { type: "table", id: "ll-3", diagram: "llMemory", diagramCaption: "An array is one block; a linked list is scattered nodes joined by pointers.", title: "Array vs linked list", headers: ["", "Array", "Linked list"], rows: [
        ["Read item i", "O(1)", "O(n)"],
        ["Insert / delete at the front", "O(n)", "O(1)"],
        ["Insert / delete after a node you already hold", "O(n)", "O(1)"],
        ["Search for a value", "O(n)", "O(n)"],
        ["Memory", "One block", "Scattered nodes + pointers"]
      ] },
      { type: "code", id: "ll-4", diagram: "llReverse", diagramCaption: "Walk along once and flip every arrow to point backwards.", title: "Reverse a linked list (pseudocode)", code: "SET BEHIND = nothing, NOW = the first node\nWHILE NOW is a real node\n  REMEMBER the node after NOW\n  MAKE NOW point back at BEHIND\n  MOVE BEHIND forward to NOW\n  MOVE NOW forward to the remembered node\nANSWER: BEHIND is the new first node", note: "Walk the list once, flipping each arrow backwards. **O(n)** time, O(1) space." },
      { type: "concept", id: "ll-5", diagram: "llCycle", diagramCaption: "Fast runner, slow runner: if the list loops, the fast one catches up.", title: "Slow and fast pointers", body: "Move one pointer 1 step and another 2 steps at a time. When fast reaches the end, slow is at the **middle**. If the list loops back on itself, fast eventually catches slow: that detects a **cycle**." },
      { type: "qa", id: "ll-6", diagram: "llNoMiddle", diagramCaption: "An array jumps to the middle; a list has to walk there node by node.", question: "Why can't you binary search a linked list?", answer: "You can't jump to the middle in O(1); you must walk there node by node, which removes the speed advantage." },
      { type: "qa", id: "ll-7", diagram: "llInsertFront", diagramCaption: "Link a new node in front and change one pointer. Nothing else moves.", question: "When would you pick a linked list over an array?", answer: "When you insert or delete at the front a lot and don't need to read by index." },
      { type: "concept", id: "ll-8", takeaway: true, title: "Key takeaway", body: "Linked lists are **fast to insert and delete once you are at the spot, slow to find the spot**. Most list problems use a prev pointer or slow/fast pointers." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Stacks & Queues — order matters",
    items: [
      { type: "concept", id: "sq-1", diagram: "stackPlates", diagramCaption: "Plates are added and taken from the top only.", important: true, title: "Stack = LIFO", body: "A pile of plates: you add and remove at the **top**. **Last In, First Out**. Operations: push (add), pop (remove top), peek (look at top). All **O(1)**." },
      { type: "concept", id: "sq-2", diagram: "queueLine", diagramCaption: "The line moves from the front; new people join at the back.", title: "Queue = FIFO", body: "A café line: first person in is served first. **First In, First Out**. Operations: enqueue (join the back), dequeue (leave from the front). Both **O(1)** with the right structure." },
      { type: "code", id: "sq-3", diagram: "stackQueueBoth", diagramCaption: "Same items, different order out: a stack gives 3 first, a queue gives 1 first.", title: "Stack and queue moves (pseudocode)", code: "STACK: an empty pile\n  PUSH 1 means put it on top\n  POP means take the top one off\nQUEUE: an empty line\n  ENQUEUE 1 means join the back\n  DEQUEUE means serve the front one", note: "Use a proper queue structure. Removing from the front of a plain list is O(n) because everything shifts." },
      { type: "list", id: "sq-4", title: "Where you meet them", points: [
        "Stack: undo/redo, browser back button, the function call stack, DFS.",
        "Queue: print jobs, task queues, BFS (shortest path)."
      ] },
      { type: "code", id: "sq-5", diagram: "brackets", diagramCaption: "Openers go on the pile. Each closer must match the top of the pile.", title: "Valid brackets (pseudocode)", code: "START with an empty pile\nFOR each character in the text\n  IF it is an opening bracket, PUT it on the pile\n  IF it is a closing bracket\n    IF the pile is empty, ANSWER: not valid, STOP\n    TAKE the top opener off the pile\n    IF it does not match this closer, ANSWER: not valid, STOP\nANSWER: valid only if the pile is empty", note: "Push every opener; each closer must match the latest opener. **O(n)**. The classic stack question." },
      { type: "concept", id: "sq-6", diagram: "dequePQ", diagramCaption: "A deque has two doors. A priority queue serves the most important first.", title: "Deque and priority queue", body: "A **deque** lets you add and remove at both ends in O(1). A **priority queue** serves the most important item first, not the oldest (usually built with a heap, so O(log n) per push or pop)." },
      { type: "qa", id: "sq-7", diagram: "twoStacks", diagramCaption: "Pouring one stack into another flips the order, which makes a queue.", question: "How would you build a queue using two stacks?", answer: "Push new items onto stack A. To dequeue, if stack B is empty pour all of A into B (this reverses the order), then pop from B. Each item moves at most twice, so dequeue is O(1) amortised." },
      { type: "concept", id: "sq-8", takeaway: true, title: "Key takeaway", body: "Need to undo, match pairs, or go deep first? **Stack**. Need fairness or level by level? **Queue**." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Hash Tables — instant lookup by key",
    items: [
      { type: "concept", id: "ht-1", diagram: "hashBuckets", diagramCaption: "The key goes through the hash function and out comes the bucket number.", important: true, title: "How a hash table works", body: "Like a coat check: hand over your name (the key), a **hash function** turns it into a number, and that number says which hook (index) holds your coat. No searching needed." },
      { type: "concept", id: "ht-2", diagram: "hashWorst", diagramCaption: "Spread out: one step. All piled in one spot: walk the whole chain.", title: "Why it is O(1)", body: "Lookup, insert and delete jump straight to the right spot: **O(1) on average**. In the worst case, when many keys pile into one spot, it can degrade to **O(n)**." },
      { type: "concept", id: "ht-3", diagram: "hashCollide", diagramCaption: "Two items, one spot: make a little list, or look for the next free slot.", title: "Collisions", body: "Two keys can land on the same spot. Two fixes: **chaining** (each spot holds a little list of items) and **open addressing** (if the spot is taken, probe for the next free one)." },
      { type: "concept", id: "ht-4", diagram: "dictSet", diagramCaption: "A dict keeps key and value. A set keeps just the keys.", title: "Sets and dictionaries", body: "A **dict** stores key-to-value pairs (name to phone). A **set** stores just keys and answers \"have I seen this?\" in O(1) on average. Both are hash tables." },
      { type: "code", id: "ht-5", diagram: "twoSum", diagramCaption: "Check the notebook for the partner before writing the new number down.", title: "Two sum (pseudocode)", code: "START with an empty NOTEBOOK\nFOR each number in the list\n  WORK OUT the partner = target minus this number\n  IF the partner is in the NOTEBOOK\n    ANSWER: the partner's spot and this spot, STOP\n  WRITE this number and its spot in the NOTEBOOK", note: "For each number, ask: have I already seen its partner? **O(n)** time and O(n) space, instead of O(n²) with two loops." },
      { type: "list", id: "ht-6", title: "When NOT to use one", points: [
        "You need items in sorted order (use a sorted array or tree).",
        "You need the smallest or largest fast (use a heap).",
        "Memory is very tight: hash tables use extra space."
      ] },
      { type: "qa", id: "ht-7", diagram: "keyChange", diagramCaption: "If the key changes, its hash changes and the item cannot be found.", question: "Why must dictionary keys be unchangeable?", answer: "The hash is calculated from the key. If the key could change, its hash would change and the item would be lost. So lists can't be keys, but tuples of immutable items can." },
      { type: "concept", id: "ht-8", takeaway: true, title: "Key takeaway", body: "When you catch yourself searching a list again and again, ask: **can a hash table remember it?** It trades memory for speed." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Trees & Heaps — branching structures",
    items: [
      { type: "concept", id: "tr-1", diagram: "treeWords", diagramCaption: "Root at the top, leaves at the bottom, height is the longest path down.", important: true, title: "Tree words", body: "A family tree turned upside down. **Root** = the top node. **Parent / child** = a node and the ones just below it. **Leaf** = a node with no children. **Height** = the longest path from root to a leaf." },
      { type: "concept", id: "tr-2", diagram: "bstRule", diagramCaption: "Smaller values go left of a node, bigger values go right.", title: "Binary tree vs BST", body: "A **binary tree**: each node has at most 2 children. A **binary search tree (BST)** adds a rule: everything on the left is smaller, everything on the right is bigger. That rule makes searching fast." },
      { type: "code", id: "tr-3", diagram: "bstSearch", diagramCaption: "Each step throws away a whole side of the tree.", title: "BST search (pseudocode)", code: "START at the top node\nWHILE we are on a real node\n  IF the node holds the target, ANSWER: found\n  IF the target is smaller, GO to the left child\n  OTHERWISE GO to the right child\nANSWER: not found (we fell off the tree)", note: "Each step discards one whole side. Insert works the same way: walk down, then attach the new node." },
      { type: "concept", id: "tr-4", diagram: "treeBalance", diagramCaption: "A bushy tree is short and fast. Sorted inserts make a slow stick.", important: true, title: "Why balance matters", body: "A **balanced** BST is short, so search and insert are **O(log n)**. If you insert already-sorted numbers it becomes a stick, like a linked list, and everything is **O(n)**. Self-balancing trees (AVL, red-black) prevent that." },
      { type: "table", id: "tr-5", diagram: "traversals", diagramCaption: "The same tree, visited four different ways. Numbers show the visiting order.", title: "Four ways to visit every node", headers: ["Traversal", "Order", "Handy for"], rows: [
        ["In-order (DFS)", "left, node, right", "BST gives sorted order"],
        ["Pre-order (DFS)", "node, left, right", "Copying a tree"],
        ["Post-order (DFS)", "left, right, node", "Deleting, tree sizes"],
        ["Level-order (BFS)", "row by row, with a queue", "Shortest depth, level questions"]
      ], note: "All four visit each node once: O(n)." },
      { type: "concept", id: "tr-6", diagram: "heapSift", diagramCaption: "A new value climbs up while it is smaller than its parent.", title: "Heap = priority queue", body: "A tree where the parent is always smaller than its children (**min-heap**), so the smallest is always on top. Peeking at it is O(1). Push and pop are **O(log n)** because an item only moves up or down the short height of the tree." },
      { type: "concept", id: "tr-7", diagram: "trie", diagramCaption: "Words that start the same share the same path of letters.", title: "A taste of tries", body: "A **trie** stores words one letter per node, so words sharing a start share a path. Great for autocomplete and prefix checks: cost depends on the word length, not on how many words are stored." },
      { type: "qa", id: "tr-8", diagram: "dfsBfsTree", diagramCaption: "DFS dives down each branch. BFS goes row by row.", question: "What is the difference between DFS and BFS on a tree?", answer: "DFS goes deep down one branch first (recursion or a stack). BFS goes level by level (a queue)." },
      { type: "concept", id: "tr-9", takeaway: true, title: "Key takeaway", body: "Trees are **recursion made visible**: handle the node, then do the same for left and right. Remember: balanced = log n, heap = smallest on top." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Graphs — things and their connections",
    items: [
      { type: "concept", id: "gr-1", diagram: "graphBasics", diagramCaption: "Cities are nodes, roads are edges.", important: true, title: "Nodes and edges", body: "A map of cities and roads. Cities are **nodes** (vertices), roads are **edges**. A tree is just a graph with no loops." },
      { type: "list", id: "gr-2", diagram: "graphKinds", diagramCaption: "Two-way roads, one-way streets, roads with a cost.", title: "Kinds of graph", points: [
        "**Undirected**: roads go both ways (friends on Facebook).",
        "**Directed**: one-way streets (following someone on Instagram).",
        "**Weighted**: each edge has a cost, like distance or time."
      ] },
      { type: "table", id: "gr-3", diagram: "adjacency", diagramCaption: "Same graph two ways: a list of neighbours, or a grid of yes and no.", title: "Adjacency list vs matrix", headers: ["", "Adjacency list", "Adjacency matrix"], rows: [
        ["What it is", "Each node lists its neighbours", "A grid: row i, column j = edge?"],
        ["Space", "O(V + E)", "O(V²)"],
        ["Is there an edge A-B?", "Scan A's list", "O(1)"],
        ["Best for", "Most graphs (sparse)", "Dense graphs"]
      ], note: "V = number of nodes, E = number of edges. The adjacency list is the usual interview choice." },
      { type: "code", id: "gr-4", diagram: "bfsWave", diagramCaption: "BFS spreads like ripples: start, neighbours, neighbours of neighbours.", title: "BFS (pseudocode)", code: "MARK the start node as seen\nPUT the start node in a waiting line\nWHILE the line is not empty\n  TAKE the first node out of the line\n  FOR each neighbour of that node\n    IF the neighbour is not seen yet\n      MARK it as seen\n      PUT it at the back of the line", note: "Spreads out like ripples in a pond. In an **unweighted** graph it finds the shortest path. **O(V + E)**. DFS is the same but with a stack or recursion, also O(V + E)." },
      { type: "concept", id: "gr-5", diagram: "bfsVsDfs", diagramCaption: "BFS goes ring by ring. DFS dives deep, then backs up.", title: "BFS vs DFS", body: "**BFS** (queue): closest nodes first, so shortest path in an unweighted graph. **DFS** (stack or recursion): dive deep first, good for exploring everything, finding paths, and cycles. Always keep a **seen** set so you don't loop forever." },
      { type: "concept", id: "gr-6", diagram: "cycleDetect", diagramCaption: "If an arrow leads back onto the current path, there is a cycle.", title: "Cycle detection", body: "Run DFS and keep track of nodes on the current path. If you reach one of them again, there is a **cycle**. (In an undirected graph, ignore the node you just came from.)" },
      { type: "concept", id: "gr-7", diagram: "topoSort", diagramCaption: "Do each task after the ones it depends on: socks before shoes.", title: "Topological sort", body: "Put tasks in an order where every task comes **after the ones it depends on**, like getting dressed: socks before shoes. Works only on directed graphs with no cycles. Runs in O(V + E)." },
      { type: "concept", id: "gr-8", diagram: "dijkstra", diagramCaption: "Always take the cheapest unvisited node next. Circles show the cost from S.", title: "Dijkstra's algorithm", body: "Finds the **cheapest path** from one node to all others in a graph with weighted edges that are **not negative**. It keeps taking the cheapest unvisited node next, using a priority queue (heap). Roughly O((V + E) log V)." },
      { type: "qa", id: "gr-9", diagram: "bfsOrDijkstra", diagramCaption: "BFS counts hops, Dijkstra counts cost. They can pick different routes.", question: "Shortest path: BFS or Dijkstra?", answer: "BFS if all edges cost the same (unweighted). Dijkstra if edges have different non-negative weights." },
      { type: "concept", id: "gr-10", takeaway: true, title: "Key takeaway", body: "Most graph problems are: build an **adjacency list**, then **BFS or DFS with a seen set**. Reach for Dijkstra only when edges have weights." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Sorting & Searching — finding and ordering",
    items: [
      { type: "concept", id: "ss-1", diagram: "linearSearch", diagramCaption: "Check one by one until you find it.", title: "Linear search", body: "Look at every item one by one until you find it. Works on any list, but is **O(n)**." },
      { type: "code", id: "ss-2", diagram: "binarySearch", diagramCaption: "Check the middle, throw away the half that cannot hold it.", title: "Binary search (pseudocode)", code: "SET LOW = first spot, HIGH = last spot\nWHILE LOW is not past HIGH\n  SET MIDDLE = halfway between LOW and HIGH\n  IF the middle item is the target, ANSWER: MIDDLE\n  IF the middle item is too small, SET LOW = just after MIDDLE\n  OTHERWISE SET HIGH = just before MIDDLE\nANSWER: not found", note: "Like guessing a number from 1 to 100: check the middle, drop half. The list must be **sorted**. **O(log n)**." },
      { type: "concept", id: "ss-3", diagram: "bubble", diagramCaption: "Compare neighbours and swap them if they are in the wrong order.", important: true, title: "The slow sorts: just know them", body: "**Bubble**, **insertion** and **selection** sort are all **O(n²)** in the worst case. They are simple and fine for tiny lists, but you would not use them on big data. Insertion sort is quick on nearly sorted data." },
      { type: "concept", id: "ss-4", diagram: "mergeSort", diagramCaption: "Split down to single items, then merge the sorted pieces back together.", title: "Merge sort", body: "Divide and conquer: split the list in half, sort each half, then **merge** the two sorted halves. Always **O(n log n)**, but needs O(n) extra space." },
      { type: "concept", id: "ss-5", diagram: "quickSort", diagramCaption: "Pick a pivot: smaller to its left, bigger to its right.", title: "Quick sort", body: "Pick a **pivot**, put smaller items to its left and bigger to its right, then repeat on each side. **O(n log n) on average**, but **O(n²) in the worst case** (e.g. bad pivots). Sorts in place, and is fast in practice." },
      { type: "table", id: "ss-6", diagram: "stableSort", diagramCaption: "Stable: equal items keep their original order.", title: "The big sorts at a glance", headers: ["Sort", "Time", "Extra space", "Stable?"], rows: [
        ["Insertion", "O(n²), best O(n)", "O(1)", "Yes"],
        ["Merge", "O(n log n)", "O(n)", "Yes"],
        ["Quick", "avg O(n log n), worst O(n²)", "O(log n) typical", "No"],
        ["Heap", "O(n log n)", "O(1)", "No"]
      ], note: "**Stable** = equal items keep their original order. The usual built-in sort (Timsort) is O(n log n) and stable." },
      { type: "qa", id: "ss-7", question: "Which sort would you pick?", answer: "In real code, just use the built-in sort. If asked: merge sort when you need guaranteed O(n log n) or stability, quick sort for speed on average, insertion sort for tiny or nearly sorted lists." },
      { type: "qa", id: "ss-8", diagram: "unsortedSearch", diagramCaption: "Without order, the middle tells you nothing about which way to go.", question: "Can you binary search an unsorted list?", answer: "No. Binary search relies on the order to know which half to throw away. Sort first (O(n log n)) or use a hash table." },
      { type: "concept", id: "ss-9", takeaway: true, title: "Key takeaway", body: "**Sorted data + halving = O(log n).** Good sorts are O(n log n). Know why quick sort has a bad worst case and why merge sort uses extra space." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  },

  {
    title: "Recursion & Dynamic Programming — reuse your answers",
    items: [
      { type: "concept", id: "rd-1", diagram: "dolls", diagramCaption: "To open the big doll, open the smaller one inside, and so on.", important: true, title: "What is recursion?", body: "Russian nesting dolls: to open the big one, open the smaller one inside, and so on. A function **calls itself on a smaller version** of the problem until it is small enough to answer directly." },
      { type: "list", id: "rd-2", diagram: "baseCase", diagramCaption: "Shrink the problem each call until it is small enough to answer.", title: "Every recursion needs two parts", points: [
        "**Base case**: the smallest problem, answered directly. It stops the recursion.",
        "**Recursive case**: shrink the problem and call yourself.",
        "No base case means it never stops (stack overflow)."
      ] },
      { type: "code", id: "rd-3", diagram: "callStack", diagramCaption: "Calls pile up on the stack, then the answers come back down.", title: "Factorial (pseudocode)", code: "TO FIND factorial of N\n  IF N is 1 or less, ANSWER 1 (the stopping rule)\n  OTHERWISE ANSWER N times the factorial of (N minus 1)", note: "Each call waits on the **call stack** for the one below it. Depth n means O(n) time and O(n) stack space." },
      { type: "concept", id: "rd-4", diagram: "fibTree", diagramCaption: "The same values (like f2) are worked out again and again.", title: "Why naive Fibonacci is slow", body: "fib(n) = fib(n-1) + fib(n-2) recomputes the same values over and over, so the number of calls roughly doubles each level: about **O(2ⁿ)**. fib(40) is already painfully slow." },
      { type: "code", id: "rd-5", diagram: "fibMemo", diagramCaption: "Write each answer in a notebook and look it up instead of redoing it.", title: "Memoization (pseudocode)", code: "KEEP a NOTEBOOK of answers already found\nTO FIND fib of N\n  IF N is 0 or 1, ANSWER N\n  IF N is in the NOTEBOOK, ANSWER what it says\n  WORK OUT fib(N minus 1) plus fib(N minus 2)\n  WRITE it in the NOTEBOOK under N\n  ANSWER that number", note: "**Write the answer on a sticky note.** Each value is computed once, so **O(n)** time. This is dynamic programming (DP)." },
      { type: "code", id: "rd-6", diagram: "dpTable", diagramCaption: "Fill a table from the smallest case upwards.", title: "Tabulation (pseudocode)", code: "SET A = 0, B = 1\nREPEAT N times\n  SET NEXT = A plus B\n  SET A = B\n  SET B = NEXT\nANSWER: A", note: "Skip recursion: start from the smallest answers and build upwards. **O(n)** time, O(1) space here since only the last two values matter." },
      { type: "list", id: "rd-7", diagram: "coinTable", diagramCaption: "Each cell is the best answer for a smaller amount, built up one by one.", title: "Spotting a DP problem", points: [
        "It asks for a count, a minimum, a maximum, or \"is it possible\".",
        "A big answer is built from smaller answers (subproblems).",
        "The same subproblems repeat (overlapping subproblems).",
        "Classic examples: climbing stairs, coin change, knapsack."
      ] },
      { type: "concept", id: "rd-8", diagram: "backtrack", diagramCaption: "Try a choice, go deeper, and undo it at a dead end.", title: "Backtracking", body: "Recursion that **tries a choice, goes deeper, and undoes the choice if it fails**, like exploring a maze and stepping back at dead ends. Used for permutations, subsets, and puzzles like N-Queens. Often exponential, but pruning dead ends helps." },
      { type: "qa", id: "rd-9", diagram: "topBottom", diagramCaption: "Top-down: recursion with a cache. Bottom-up: a loop that fills a table.", question: "Memoization vs tabulation?", answer: "Memoization is top-down: recursion plus a cache. Tabulation is bottom-up: a loop that fills a table from the smallest case. Same idea, same time; tabulation avoids recursion depth limits." },
      { type: "concept", id: "rd-10", takeaway: true, title: "Key takeaway", body: "Recursion = **base case + smaller problem**. DP = recursion that **remembers**. If a recursive solution repeats work, add a cache." }
      // YOUR NOTES for this topic can go here (ids prefixed my-)
    ]
  }
];

export default {
  title: "DSA",
  icon: "🌳",
  sections: [...builtIn, ...myNotes]
};
