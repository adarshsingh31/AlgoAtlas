export const ROMANS = new Set(["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"]);
export const LOWER = new Set(["a", "an", "the", "to", "and", "of", "in", "with", "for", "from", "at", "on", "is", "as", "or", "by"]);

export function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w, i) => {
      if (ROMANS.has(w)) return w.toUpperCase();
      if (/^\d/.test(w)) return w.toUpperCase();
      if (i > 0 && LOWER.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

export const DIFF_NAME = {
  E: "Easy",
  M: "Medium",
  H: "Hard"
};

export const DP_CATEGORIES = [
  {
    name: "Linear DP",
    problems: [
      ["climbing-stairs", "E"],
      ["best-time-to-buy-and-sell-stock", "E"],
      ["min-cost-climbing-stairs", "E"],
      ["divisor-game", "E"],
      ["decode-ways", "M"],
      ["unique-binary-search-trees", "M"],
      ["house-robber", "M"],
      ["perfect-squares", "M"],
      ["best-time-to-buy-and-sell-stock-with-cooldown", "M"],
      ["coin-change", "M"],
      ["counting-bits", "E"],
      ["integer-break", "M"],
      ["count-numbers-with-unique-digits", "M"],
      ["wiggle-subsequence", "M"],
      ["partition-equal-subset-sum", "M"],
      ["maximum-length-of-pair-chain", "M"],
      ["best-time-to-buy-and-sell-stock-with-transaction-fee", "M"],
      ["delete-and-earn", "M"],
      ["domino-and-tromino-tiling", "M"],
      ["knight-dialer", "M"],
      ["minimum-cost-for-tickets", "M"],
      ["partition-array-for-maximum-sum", "M"],
      ["filling-bookcase-shelves", "M"],
      ["longest-arithmetic-subsequence-of-given-difference", "M"],
      ["greatest-sum-divisible-by-three", "M"],
      ["best-time-to-buy-and-sell-stock-iii", "H"],
      ["student-attendance-record-ii", "H"],
      ["decode-ways-ii", "H"],
      ["triples-with-bitwise-and-equal-to-zero", "M"],
      ["maximum-profit-in-job-scheduling", "H"],
      ["minimum-number-of-taps-to-open-to-water-a-garden", "H"],
      ["count-all-valid-pickup-and-delivery-options", "H"],
      ["stone-game-iii", "H"],
      ["restore-the-array", "H"],
      ["form-largest-integer-with-digits-that-add-up-to-target", "M"],
      ["stone-game-iv", "H"],
      ["coin-change-2", "M"],
      ["paint-house", "M"]
    ]
  },
  {
    name: "Knapsack",
    problems: [
      ["house-robber-ii", "M"],
      ["ones-and-zeroes", "M"],
      ["target-sum", "M"],
      ["shopping-offers", "M"],
      ["2-keys-keyboard", "M"],
      ["minimum-swaps-to-make-sequences-increasing", "M"],
      ["best-team-with-no-conflicts", "M"],
      ["profitable-schemes", "H"],
      ["tallest-billboard", "H"],
      ["pizza-with-3n-slices", "H"],
      ["reducing-dishes", "H"],
      ["painting-the-walls", "H"]
    ]
  },
  {
    name: "Multi-Dimensional DP",
    problems: [
      ["triangle", "M"],
      ["combination-sum-iv", "M"],
      ["out-of-boundary-paths", "M"],
      ["knight-probability-in-chessboard", "M"],
      ["champagne-tower", "M"],
      ["largest-sum-of-averages", "M"],
      ["minimum-falling-path-sum", "M"],
      ["video-stitching", "M"],
      ["longest-arithmetic-subsequence", "M"],
      ["stone-game-ii", "M"],
      ["number-of-dice-rolls-with-target-sum", "M"],
      ["dice-roll-simulation", "M"],
      ["number-of-sets-of-k-non-overlapping-line-segments", "M"],
      ["best-time-to-buy-and-sell-stock-iv", "H"],
      ["create-maximum-number", "H"],
      ["frog-jump", "H"],
      ["split-array-largest-sum", "H"],
      ["freedom-trail", "H"],
      ["minimum-number-of-refueling-stops", "H"],
      ["number-of-music-playlists", "H"],
      ["count-vowels-permutation", "H"],
      ["minimum-falling-path-sum-ii", "H"],
      ["minimum-distance-to-type-a-word-using-two-fingers", "H"],
      ["minimum-difficulty-of-a-job-schedule", "H"],
      ["number-of-ways-to-paint-n-3-grid", "H"],
      ["build-array-where-you-can-find-the-maximum-exactly-k-comparisons", "H"],
      ["number-of-ways-of-cutting-a-pizza", "H"],
      ["paint-house-iii", "H"],
      ["count-all-possible-routes", "H"]
    ]
  },
  {
    name: "Interval DP",
    problems: [
      ["guess-number-higher-or-lower-ii", "M"],
      ["arithmetic-slices", "M"],
      ["predict-the-winner", "M"],
      ["palindromic-substrings", "M"],
      ["stone-game", "M"],
      ["minimum-score-triangulation-of-polygon", "M"],
      ["last-stone-weight-ii", "M"],
      ["minimum-cost-tree-from-leaf-values", "M"],
      ["stone-game-vii", "M"],
      ["burst-balloons", "H"],
      ["remove-boxes", "H"],
      ["strange-printer", "H"],
      ["valid-permutations-for-di-sequence", "H"],
      ["minimum-cost-to-merge-stones", "H"],
      ["allocate-mailboxes", "H"],
      ["minimum-cost-to-cut-a-stick", "H"],
      ["stone-game-v", "H"]
    ]
  },
  {
    name: "Bitmask DP",
    problems: [
      ["can-i-win", "M"],
      ["partition-to-k-equal-sum-subsets", "M"],
      ["stickers-to-spell-word", "H"],
      ["shortest-path-visiting-all-nodes", "H"],
      ["smallest-sufficient-team", "H"],
      ["maximum-students-taking-exam", "H"],
      ["number-of-ways-to-wear-different-hats-to-each-other", "H"],
      ["minimum-cost-to-connect-two-groups-of-points", "H"],
      ["maximum-number-of-achievable-transfer-requests", "H"],
      ["distribute-repeating-integers", "H"],
      ["maximize-grid-happiness", "H"],
      ["find-minimum-time-to-finish-all-jobs", "H"]
    ]
  },
  {
    name: "Digit DP",
    problems: [
      ["non-negative-integers-without-consecutive-ones", "H"],
      ["numbers-at-most-n-given-digit-set", "H"],
      ["numbers-with-repeated-digits", "H"]
    ]
  },
  {
    name: "DP on Trees",
    problems: [
      ["unique-binary-search-trees-ii", "M"],
      ["house-robber-iii", "M"],
      ["maximum-product-of-splitted-binary-tree", "M"],
      ["linked-list-in-binary-tree", "M"],
      ["longest-zigzag-path-in-a-binary-tree", "M"],
      ["binary-tree-cameras", "H"],
      ["maximum-sum-bst-in-binary-tree", "H"],
      ["number-of-ways-to-reorder-array-to-get-same-bst", "H"]
    ]
  },
  {
    name: "String DP",
    problems: [
      ["is-subsequence", "E"],
      ["palindrome-partitioning", "M"],
      ["palindrome-partitioning-ii", "H"],
      ["word-break", "M"],
      ["unique-substrings-in-wraparound-string", "M"],
      ["minimum-ascii-delete-sum-for-two-strings", "M"],
      ["longest-string-chain", "M"],
      ["longest-happy-string", "M"],
      ["longest-valid-parentheses", "H"],
      ["distinct-subsequences", "H"],
      ["word-break-ii", "H"],
      ["count-the-repetitions", "H"],
      ["concatenated-words", "H"],
      ["count-different-palindromic-subsequences", "H"],
      ["distinct-subsequences-ii", "H"],
      ["longest-chunked-palindrome-decomposition", "H"],
      ["palindrome-partitioning-iii", "H"],
      ["find-all-good-strings", "H"],
      ["string-compression-ii", "H"],
      ["number-of-ways-to-form-a-target-string-given-a-dictionary", "H"]
    ]
  },
  {
    name: "Probability DP",
    problems: [
      ["soup-servings", "M"],
      ["new-21-game", "M"],
      ["airplane-seat-assignment-probability", "M"]
    ]
  },
  {
    name: "Classic DP — Kadane's Algorithm",
    problems: [
      ["maximum-subarray", "M"],
      ["maximum-product-subarray", "M"],
      ["bitwise-ors-of-subarrays", "M"],
      ["longest-turbulent-subarray", "M"],
      ["maximum-subarray-sum-with-one-deletion", "M"],
      ["k-concatenation-maximum-sum", "M"],
      ["largest-divisible-subset", "M"],
      ["length-of-longest-fibonacci-subsequence", "M"],
      ["gas-station", "M"]
    ]
  },
  {
    name: "Classic DP — LCS Family",
    problems: [
      ["longest-palindromic-substring", "M"],
      ["longest-palindromic-subsequence", "M"],
      ["maximum-length-of-repeated-subarray", "M"],
      ["longest-common-subsequence", "M"],
      ["regular-expression-matching", "H"],
      ["wildcard-matching", "H"],
      ["edit-distance", "H"],
      ["interleaving-string", "M"],
      ["shortest-common-supersequence", "H"],
      ["minimum-insertion-steps-to-make-a-string-palindrome", "H"],
      ["max-dot-product-of-two-subsequences", "H"]
    ]
  },
  {
    name: "Classic DP — LIS Family",
    problems: [
      ["longest-increasing-subsequence", "M"],
      ["number-of-longest-increasing-subsequence", "M"],
      ["russian-doll-envelopes", "H"],
      ["delete-columns-to-make-sorted-iii", "H"],
      ["minimum-number-of-removals-to-make-mountain-array", "H"],
      ["maximum-height-by-stacking-cuboids", "H"],
      ["make-array-strictly-increasing", "H"]
    ]
  },
  {
    name: "Classic DP — 2D Grid Traversal",
    problems: [
      ["unique-paths", "M"],
      ["unique-paths-ii", "M"],
      ["minimum-path-sum", "M"],
      ["maximum-non-negative-product-in-a-matrix", "M"],
      ["where-will-the-ball-fall", "M"],
      ["dungeon-game", "H"],
      ["cherry-pickup", "H"],
      ["number-of-paths-with-max-score", "H"],
      ["cherry-pickup-ii", "H"],
      ["kth-smallest-instructions", "H"]
    ]
  },
  {
    name: "Classic DP — Cumulative Sum",
    problems: [
      ["range-sum-query-immutable", "E"],
      ["maximal-square", "M"],
      ["range-sum-query-2d-immutable", "M"],
      ["largest-plus-sign", "M"],
      ["push-dominoes", "M"],
      ["largest-1-bordered-square", "M"],
      ["count-square-submatrices-with-all-ones", "M"],
      ["matrix-block-sum", "M"],
      ["maximum-points-you-can-obtain-from-cards", "M"],
      ["count-submatrices-with-all-ones", "H"],
      ["ways-to-make-a-fair-array", "M"],
      ["maximal-rectangle", "H"],
      ["max-sum-of-rectangle-no-larger-than-k", "H"],
      ["super-washing-machines", "H"],
      ["maximum-sum-of-3-non-overlapping-subarrays", "H"],
      ["number-of-submatrices-that-sum-to-target", "H"],
      ["get-the-maximum-score", "H"]
    ]
  },
  {
    name: "Classic DP — Hashmap (Subarray)",
    problems: [
      ["continuous-subarray-sum", "M"],
      ["find-two-non-overlapping-sub-arrays-each-with-target-sum", "M"],
      ["maximum-number-of-non-overlapping-subarrays-with-sum-equals-target", "M"]
    ]
  },
  {
    name: "DP + Alpha (Tricks / DS)",
    problems: [
      ["arithmetic-slices-ii-subsequence", "H"],
      ["odd-even-jump", "H"],
      ["constrained-subsequence-sum", "H"],
      ["delivering-boxes-from-storage-to-ports", "H"],
      ["trapping-rain-water", "H"]
    ]
  },
  {
    name: "Insertion DP",
    problems: [
      ["k-inverse-pairs-array", "H"]
    ]
  },
  {
    name: "Graph DP",
    problems: [
      ["cheapest-flights-within-k-stops", "M"],
      ["find-the-shortest-superstring", "H"]
    ]
  },
  {
    name: "Memoization",
    problems: [
      ["minimum-jumps-to-reach-home", "M"],
      ["scramble-string", "H"],
      ["tiling-a-rectangle-with-the-fewest-squares", "H"],
      ["number-of-ways-to-stay-in-the-same-place-after-some-steps", "H"],
      ["jump-game-v", "H"],
      ["minimum-number-of-days-to-eat-n-oranges", "H"]
    ]
  },
  {
    name: "Binary Lifting",
    problems: [
      ["kth-ancestor-of-a-tree-node", "H"]
    ]
  },
  {
    name: "Math",
    problems: [
      ["ugly-number-ii", "M"],
      ["count-sorted-vowel-strings", "M"],
      ["race-car", "H"],
      ["super-egg-drop", "H"],
      ["least-operators-to-express-number", "H"],
      ["largest-multiple-of-three", "M"],
      ["minimum-one-bit-operations-to-make-integers-zero", "H"]
    ]
  }
];
