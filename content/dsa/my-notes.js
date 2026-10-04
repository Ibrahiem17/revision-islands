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
    title: "My Notes — problems I've solved",
    items: [
      { type: "concept", id: "my-anagram-1", diagram: "anagramCount", diagramCaption: "Count up for A, count down for B. If everything cancels to zero, the words are anagrams.", title: "Valid Anagram — the picture", body: "Same letters, same counts. When a problem is about **counting**, think **Hash Map**: +1 for each letter in A, -1 for each letter in B, all zeros means **anagram**." },
      { type: "concept", id: "my-anagram-2", diagram: "myValidAnagramImg", diagramCaption: "My own Excalidraw notes, exactly as I drew them. Tap the picture to open it full size.", title: "Valid Anagram — full reference (my notes)", body: "Arrays & Hashing. Brute force vs **Hash Map**, the recipe, pseudocode, the annotated C++ and a trace of cat vs tac." },
    ],
  },
];
