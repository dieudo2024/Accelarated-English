export type LeitnerBox = 1 | 2 | 3 | 4 | 5;

export type CoreWordCard = {
  id: string;
  front: string;
  back: string;
  box: LeitnerBox;
  reps: number;
  interval: number;
  ef: number;
  nextReview: number;
};

export type CoreWordProgress = {
  totalCount: number;
  masteredCount: number;
  dueCount: number;
  boxCounts: Record<LeitnerBox, number>;
};

const VARIANT_STEMS = [
  "work",
  "play",
  "talk",
  "call",
  "move",
  "live",
  "help",
  "start",
  "stop",
  "turn",
  "open",
  "close",
  "listen",
  "watch",
  "read",
  "write",
  "speak",
  "learn",
  "study",
  "use",
  "need",
  "want",
  "like",
  "love",
  "make",
  "take",
  "give",
  "get",
  "keep",
  "feel",
  "know",
  "think",
  "say",
  "tell",
  "ask",
  "show",
  "find",
  "leave",
  "bring",
  "build",
  "buy",
  "sell",
  "send",
  "meet",
  "grow",
  "change",
  "clean",
  "clear",
  "wait",
  "walk",
  "run",
  "drive",
  "cook",
  "draw",
  "paint",
  "plan",
  "share",
  "point",
  "count",
  "choose",
  "create",
  "control",
  "cut",
  "decide",
  "develop",
  "expect",
  "explain",
  "finish",
  "follow",
  "happen",
  "imagine",
  "improve",
  "include",
  "join",
  "jump",
  "lead",
  "offer",
  "order",
  "pass",
  "pick",
  "prepare",
  "protect",
  "provide",
  "remember",
  "return",
  "save",
  "search",
  "seem",
  "smile",
  "solve",
  "spend",
  "stand",
  "support",
  "travel",
  "try",
  "understand",
  "update",
  "visit",
  "worry",
  "answer",
  "apply",
  "arrange",
  "balance",
  "borrow",
  "compare",
  "connect",
  "continue",
  "describe",
  "discuss",
  "enter",
  "explore",
  "fill",
  "focus",
  "gather",
  "handle",
  "identify",
  "manage",
  "note",
  "observe",
  "organize",
  "repeat",
  "review",
  "suggest",
  "train",
  "translate",
  "type",
  "validate",
  "view",
  "adapt",
  "announce",
  "appear",
  "believe",
  "celebrate",
  "deliver",
  "enable",
  "expand",
  "fix",
  "guide",
  "hold",
  "increase",
  "limit",
  "reduce",
  "release",
  "transform",
  "vary",
];

const FIXED_WORDS = [
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "if",
  "then",
  "because",
  "while",
  "when",
  "where",
  "why",
  "how",
  "in",
  "on",
  "at",
  "by",
  "from",
  "to",
  "of",
  "for",
  "with",
  "about",
  "into",
  "over",
  "under",
  "after",
  "before",
  "during",
  "across",
  "through",
  "between",
  "among",
  "without",
  "within",
  "near",
  "far",
  "up",
  "down",
  "out",
  "off",
  "back",
  "again",
  "also",
  "just",
  "only",
  "very",
  "too",
  "more",
  "most",
  "much",
  "many",
  "some",
  "any",
  "each",
  "every",
  "no",
  "not",
  "yes",
  "one",
  "two",
  "three",
  "person",
  "people",
  "man",
  "woman",
  "child",
  "day",
  "time",
  "year",
  "week",
  "month",
  "life",
  "world",
  "way",
  "place",
  "home",
  "school",
  "family",
  "friend",
  "city",
  "country",
  "water",
  "food",
  "music",
  "book",
  "paper",
  "table",
  "chair",
  "door",
  "room",
  "car",
  "phone",
  "computer",
  "story",
  "idea",
  "problem",
  "answer",
  "question",
  "example",
  "language",
  "voice",
  "result",
  "reason",
  "number",
  "case",
  "part",
  "system",
  "program",
  "lesson",
  "student",
  "teacher",
  "study",
  "task",
  "goal",
  "progress",
  "review",
  "list",
  "card",
  "box",
  "memory",
  "practice",
  "exercise",
  "sentence",
  "word",
  "phrase",
  "audio",
  "video",
  "subtitle",
  "tip",
  "note",
  "page",
  "screen",
  "button",
  "input",
  "output",
  "record",
  "score",
  "count",
  "chart",
  "track",
  "focus",
  "attention",
  "skill",
  "habit",
  "routine",
  "morning",
  "evening",
  "night",
  "today",
  "tomorrow",
  "yesterday",
  "now",
  "later",
  "here",
  "there",
  "this",
  "that",
  "these",
  "those",
  "someone",
  "something",
  "everyone",
  "everything",
  "nothing",
  "anything",
  "another",
  "enough",
  "maybe",
  "sure",
  "still",
  "already",
  "around",
  "always",
  "never",
  "often",
  "sometimes",
  "usually",
  "early",
  "late",
  "fast",
  "slow",
  "hard",
  "easy",
  "clear",
  "simple",
  "strong",
  "new",
  "old",
  "first",
  "last",
  "best",
  "better",
  "good",
  "bad",
  "great",
  "small",
  "big",
  "long",
  "short",
  "high",
  "low",
  "right",
  "left",
  "open",
  "closed",
  "real",
  "true",
  "safe",
  "public",
  "private",
  "common",
  "local",
  "global",
  "simple",
  "daily",
  "frequent",
  "basic",
  "common",
  "core",
  "native",
  "quiet",
  "clean",
  "minimal",
  "focused",
  "quick",
  "slow",
  "steady",
  "easy",
  "hard",
  "good",
  "better",
  "best",
];

function pluralize(word: string) {
  if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
    return `${word.slice(0, -1)}ies`;
  }

  if (/(s|x|z|ch|sh)$/.test(word)) {
    return `${word}es`;
  }

  return `${word}s`;
}

function pastTense(word: string) {
  if (word.endsWith("e")) {
    return `${word}d`;
  }

  if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
    return `${word.slice(0, -1)}ied`;
  }

  return `${word}ed`;
}

function gerund(word: string) {
  if (word.endsWith("ie")) {
    return `${word.slice(0, -2)}ying`;
  }

  if (word.endsWith("e") && !word.endsWith("ee")) {
    return `${word.slice(0, -1)}ing`;
  }

  return `${word}ing`;
}

function comparative(word: string) {
  if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
    return `${word.slice(0, -1)}ier`;
  }

  return `${word}er`;
}

function superlative(word: string) {
  if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
    return `${word.slice(0, -1)}iest`;
  }

  return `${word}est`;
}

function adverb(word: string) {
  if (word.endsWith("ic")) {
    return `${word}ally`;
  }

  if (word.endsWith("le")) {
    return `${word.slice(0, -1)}y`;
  }

  return `${word}ly`;
}

function addForms(word: string, words: Set<string>) {
  words.add(word);
  words.add(pluralize(word));
  words.add(pastTense(word));
  words.add(gerund(word));
  words.add(comparative(word));
  words.add(superlative(word));
  words.add(adverb(word));
  words.add(`re${word}`);
  words.add(`un${word}`);
}

function buildCoreWords() {
  const words = new Set<string>();

  for (const word of FIXED_WORDS) {
    words.add(word);
  }

  for (const word of VARIANT_STEMS) {
    addForms(word, words);
  }

  return Array.from(words).slice(0, 1000);
}

export const CORE_WORDS = buildCoreWords();

export const LEITNER_INTERVALS: Record<LeitnerBox, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

export function createCoreWordDeck(now = Date.now()): CoreWordCard[] {
  return CORE_WORDS.map((word) => ({
    id: word,
    front: word,
    back: `Core word: ${word}`,
    box: 1,
    reps: 0,
    interval: LEITNER_INTERVALS[1],
    ef: 2.5,
    nextReview: now,
  }));
}

export function isCoreWordCard(value: unknown): value is CoreWordCard {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<CoreWordCard>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.front === "string" &&
    typeof candidate.back === "string" &&
    typeof candidate.box === "number" &&
    typeof candidate.reps === "number" &&
    typeof candidate.interval === "number" &&
    typeof candidate.ef === "number" &&
    typeof candidate.nextReview === "number"
  );
}

export function reviewCoreWordCard(card: CoreWordCard, quality: number, now = Date.now()): CoreWordCard {
  const q = Math.max(0, Math.min(5, quality));
  let box: LeitnerBox = card.box;
  let reps = card.reps;

  if (q < 3) {
    box = 1;
    reps = 0;
  } else if (q === 3) {
    box = Math.max(1, card.box) as LeitnerBox;
    reps += 1;
  } else if (q === 4) {
    box = Math.min(5, card.box + 1) as LeitnerBox;
    reps += 1;
  } else {
    box = Math.min(5, card.box + 2) as LeitnerBox;
    reps += 1;
  }

  const interval = LEITNER_INTERVALS[box];
  const efDelta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  const ef = Math.max(1.3, card.ef + efDelta);

  return {
    ...card,
    box,
    reps,
    interval,
    ef,
    nextReview: now + interval * 24 * 60 * 60 * 1000,
  };
}

export function getCoreWordProgress(deck: CoreWordCard[], now = Date.now()): CoreWordProgress {
  const boxCounts: Record<LeitnerBox, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const card of deck) {
    boxCounts[card.box] += 1;
  }

  return {
    totalCount: deck.length,
    masteredCount: boxCounts[5],
    dueCount: deck.filter((card) => card.nextReview <= now).length,
    boxCounts,
  };
}

export function getStoredCoreDeck(storageKey: string, now = Date.now()) {
  if (typeof window === "undefined" || !window.localStorage) {
    return createCoreWordDeck(now);
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return createCoreWordDeck(now);

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.length !== CORE_WORDS.length) {
      return createCoreWordDeck(now);
    }

    const deck = parsed.filter(isCoreWordCard) as CoreWordCard[];
    if (deck.length !== CORE_WORDS.length) {
      return createCoreWordDeck(now);
    }

    return deck;
  } catch {
    return createCoreWordDeck(now);
  }
}