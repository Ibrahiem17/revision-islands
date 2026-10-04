// ============================================================
//  YOUR OWN DSA NOTES GO HERE
// ============================================================
// Everything in this file shows up on the DSA page AFTER the built-in
// sections. It is safe to leave empty.
//
// Rules:
//  - Every item needs a unique "id". Start yours with "my-" (my-1, my-2 ...).
//  - Use **double stars** around the one or two key words to highlight them.
//
// OPTION A - add a whole NEW section (easiest). Put objects like this in the array:
//
//   {
//     title: "My Notes - Tricks I keep forgetting",
//     items: [
//       { type: "concept", id: "my-1", title: "Title", body: "One short idea in plain words." },
//       { type: "list",    id: "my-2", title: "Title", points: ["point one", "point two"] },
//       { type: "code",    id: "my-3", title: "Title", code: "print('hi')", note: "What it does." },
//       { type: "table",   id: "my-4", title: "Title", headers: ["A", "B"], rows: [["1", "2"]], note: "Optional." },
//       { type: "qa",      id: "my-5", question: "Question?", answer: "Answer." }
//     ]
//   }
//
// OPTION B - add notes inside an existing topic: open content/dsa/index.js, find
// the section, and paste your items at the "YOUR NOTES for this topic" comment
// at the bottom of its items list (ids still start with "my-").
//
// Optional on any item: important: true (glow) or takeaway: true (closing note).
// The progress counter updates by itself - nothing else to edit.

export default [
  {
    title: "Problem 1 — Valid Anagram",
    items: [
      {"type":"concept","id":"my-anagram-1","diagram":"anaDemo","diagramCaption":"Step through it yourself: Next, Back, Play, or pick a different pair of words.","title":"Valid Anagram — step through it","body":"Same letters, same counts. When a problem is about **counting**, think **Hash Map**: +1 for each letter in A, -1 for each letter in B, all zeros means **anagram**."},
      {"type":"concept","id":"my-anagram-2","diagram":"myValidAnagramImg","diagramCaption":"My own Excalidraw notes, exactly as I drew them. Tap the picture to open it full size.","title":"Valid Anagram — full reference (my notes)","body":"Arrays & Hashing. Brute force vs **Hash Map**, the recipe, pseudocode, the annotated C++ and a trace of cat vs tac."},
    ],
  },
  {
    title: "Problem 2 — Contains Duplicate",
    items: [
      {"type":"concept","id":"my-dup-1","diagram":"dupDemo","diagramCaption":"Step through it yourself: Next, Back, Play, or pick a different array.","title":"Contains Duplicate — step through it","body":"'Have I seen this before?' is a **Hash Set** question. Walk the array once: if a number is already in **seen**, return true, otherwise add it."},
      {"type":"concept","id":"my-dup-2","diagram":"myContainsDuplicateImg","diagramCaption":"My own Excalidraw notes, exactly as I drew them. Tap the picture to open it full size.","title":"Contains Duplicate — full reference (my notes)","body":"Arrays & Hashing. Brute force vs **Hash Set**, the recipe, pseudocode, the annotated C++ and a trace of [1, 2, 3, 1]."},
    ],
  },
  {
    title: "Problem 3 — Two Sum",
    items: [
      {"type":"concept","id":"my-two-1","diagram":"twoDemo","diagramCaption":"Step through it yourself: Next, Back, Play, or pick a different array and target.","title":"Two Sum — step through it","body":"'Find a pair that adds up to something' is a **Hash Map** (value to index) question. For each number work out what partner you **need**, check the map first, store after."},
      {"type":"concept","id":"my-two-2","diagram":"myTwoSumImg","diagramCaption":"My own Excalidraw notes, exactly as I drew them. Tap the picture to open it full size.","title":"Two Sum — full reference (my notes)","body":"Arrays & Hashing. Brute force vs **Hash Map**, the recipe, pseudocode, the annotated C++ and a trace of [2, 7, 11, 15] with target 9."},
    ],
  },
  {
    title: "Problem 4 — Group Anagrams",
    items: [
      {"type":"concept","id":"my-grp-1","diagram":"grpDemo","diagramCaption":"Step through it yourself: Next, Back, Play, or pick a different set of words.","title":"Group Anagrams — step through it","body":"Group things that share a **transformed identity**: sort each word's letters to get a key, then use a **Hash Map** from key to list of words."},
      {"type":"concept","id":"my-grp-2","diagram":"myGroupAnagramsImg","diagramCaption":"My own long Excalidraw notes, exactly as I drew them. Tap the picture to open it full size.","title":"Group Anagrams — full reference (my notes)","body":"Problem 4 in Arrays & Hashing: the problem, brute force, the fix, the recipe, **line-by-line** pseudocode and C++, mistakes to avoid and the parts I struggled with."},
    ],
  },
];
