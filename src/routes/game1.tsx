import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eraser,
  Lightbulb,
  RotateCcw,
  Shuffle,
  Sparkles,
  Star,
  Trophy,
  Volume2,
  X,
} from "lucide-react";

export const Route = createFileRoute("/game1")({
  component: CrosswordGamePage,
});

type Direction = "across" | "down";
type Level = "basic" | "intermediate" | "advanced";

interface WordDef {
  num: number;
  answer: string;
  row: number;
  col: number;
  dir: Direction;
  clue: string;
}

interface Puzzle {
  id: string;
  title: string;
  focus: string;
  words: WordDef[];
}

const LEVELS: { id: Level; label: string; blurb: string; color: string }[] = [
  {
    id: "basic",
    label: "Basic",
    blurb: "CVC words, short vowels & simple sounds",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    blurb: "Blends, digraphs & longer phonics words",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "advanced",
    label: "Advanced",
    blurb: "Longer vocabulary & more challenging spellings",
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
];

const PUZZLES: Record<Level, Puzzle[]> = {
  basic: [
    {
      id: "basic-1",
      title: "Pets & Numbers",
      focus: "Short vowel sounds",
      words: [
        { num: 1, answer: "CAT", row: 0, col: 0, dir: "across", clue: 'A furry pet that says "meow"' },
        { num: 2, answer: "ANT", row: 0, col: 1, dir: "down", clue: "A tiny insect that marches in a line" },
        { num: 3, answer: "TEN", row: 2, col: 1, dir: "across", clue: "The number that comes after nine" },
        { num: 4, answer: "NET", row: 2, col: 3, dir: "down", clue: "You can use this to catch a fish" },
      ],
    },
    {
      id: "basic-2",
      title: "Sun & Scissors",
      focus: "Short u sound",
      words: [
        { num: 1, answer: "SUN", row: 0, col: 0, dir: "across", clue: "It shines in the sky in the daytime" },
        { num: 2, answer: "NUT", row: 0, col: 2, dir: "down", clue: "A squirrel loves to eat this" },
        { num: 3, answer: "CUT", row: 2, col: 0, dir: "across", clue: "What scissors do to paper" },
      ],
    },
    {
      id: "basic-3",
      title: "Dogs & Digging",
      focus: "Short o and i sounds",
      words: [
        { num: 1, answer: "DOG", row: 0, col: 0, dir: "across", clue: "A pet that loves to bark" },
        { num: 2, answer: "ODD", row: 0, col: 1, dir: "down", clue: "Not even" },
        { num: 3, answer: "DIG", row: 2, col: 1, dir: "across", clue: "Make a hole in the ground" },
      ],
    },
    {
      id: "basic-4",
      title: "Home Words",
      focus: "Short e sound",
      words: [
        { num: 1, answer: "HEN", row: 0, col: 0, dir: "across", clue: "A female chicken" },
        { num: 2, answer: "EEL", row: 0, col: 1, dir: "down", clue: "A long fish that looks like a snake" },
        { num: 3, answer: "LEG", row: 2, col: 1, dir: "across", clue: "You walk with this body part" },
      ],
    },
    {
      id: "basic-5",
      title: "Little Things",
      focus: "Mixed CVC words",
      words: [
        { num: 1, answer: "MAP", row: 0, col: 0, dir: "across", clue: "A drawing that shows where places are" },
        { num: 2, answer: "ANT", row: 0, col: 1, dir: "down", clue: "A very small insect" },
        { num: 3, answer: "TAP", row: 2, col: 1, dir: "across", clue: "You turn this to make water flow" },
      ],
    },
  ],
  intermediate: [
    {
      id: "inter-1",
      title: "On the Move",
      focus: "Blends & consonant groups",
      words: [
        { num: 1, answer: "TRAIN", row: 0, col: 0, dir: "across", clue: "It runs on tracks and has many carriages" },
        { num: 2, answer: "RING", row: 0, col: 1, dir: "down", clue: "You wear this on your finger" },
        { num: 3, answer: "ICE", row: 0, col: 3, dir: "down", clue: "Frozen water" },
        { num: 4, answer: "NEST", row: 0, col: 4, dir: "down", clue: "Birds build this to lay their eggs" },
      ],
    },
    {
      id: "inter-2",
      title: "Rainy Day",
      focus: "Longer blends",
      words: [
        { num: 1, answer: "RAIN", row: 0, col: 0, dir: "across", clue: "Drops of water falling from clouds" },
        { num: 2, answer: "APPLE", row: 0, col: 1, dir: "down", clue: "A red or green fruit" },
        { num: 3, answer: "PIG", row: 2, col: 1, dir: "across", clue: "A farm animal that says oink" },
      ],
    },
    {
      id: "inter-3",
      title: "At the Beach",
      focus: "Digraphs: sh, ch",
      words: [
        { num: 1, answer: "SHELL", row: 0, col: 0, dir: "across", clue: "You may find this on the beach" },
        { num: 2, answer: "HEAT", row: 0, col: 1, dir: "down", clue: "What the sun gives us on a hot day" },
        { num: 3, answer: "ANT", row: 2, col: 1, dir: "across", clue: "A tiny insect" },
      ],
    },
    {
      id: "inter-4",
      title: "School Time",
      focus: "Blends & vowel teams",
      words: [
        { num: 1, answer: "BOOK", row: 0, col: 0, dir: "across", clue: "You read this at school" },
        { num: 2, answer: "OWL", row: 0, col: 1, dir: "down", clue: "A bird that is often awake at night" },
        { num: 3, answer: "LEG", row: 2, col: 1, dir: "across", clue: "You use this body part to walk" },
      ],
    },
    {
      id: "inter-5",
      title: "Animal Friends",
      focus: "Mixed blends",
      words: [
        { num: 1, answer: "FROG", row: 0, col: 0, dir: "across", clue: "A green animal that can jump" },
        { num: 2, answer: "RAT", row: 0, col: 1, dir: "down", clue: "A small animal that looks like a mouse" },
        { num: 3, answer: "TAP", row: 2, col: 1, dir: "across", clue: "You turn this to make water flow" },
      ],
    },
  ],
  advanced: [
    {
      id: "advanced-1",
      title: "Nature & You",
      focus: "Longer vocabulary",
      words: [
        { num: 1, answer: "RAINBOW", row: 0, col: 0, dir: "across", clue: "The colorful arc you see after it rains" },
        { num: 2, answer: "NORTH", row: 0, col: 3, dir: "down", clue: "The opposite direction of south" },
        { num: 3, answer: "BRAIN", row: 0, col: 4, dir: "down", clue: "You think with this organ in your head" },
        { num: 4, answer: "OCEAN", row: 0, col: 5, dir: "down", clue: "A huge body of salt water" },
      ],
    },
    {
      id: "advanced-2",
      title: "Wonderful Weather",
      focus: "Vowel teams & syllables",
      words: [
        { num: 1, answer: "THUNDER", row: 0, col: 0, dir: "across", clue: "The loud sound during a storm" },
        { num: 2, answer: "HAT", row: 0, col: 1, dir: "down", clue: "Something you can wear on your head" },
        { num: 3, answer: "TOP", row: 2, col: 1, dir: "across", clue: "The highest part of something" },
      ],
    },
    {
      id: "advanced-3",
      title: "Amazing Animals",
      focus: "Multi-syllable vocabulary",
      words: [
        { num: 1, answer: "ELEPHANT", row: 0, col: 0, dir: "across", clue: "A very large animal with a trunk" },
        { num: 2, answer: "EAGLE", row: 0, col: 2, dir: "down", clue: "A large bird with powerful wings" },
        { num: 3, answer: "GUM", row: 2, col: 2, dir: "across", clue: "You can chew this" },
      ],
    },
    {
      id: "advanced-4",
      title: "Everyday Adventures",
      focus: "Prefixes & longer words",
      words: [
        { num: 1, answer: "SUNLIGHT", row: 0, col: 0, dir: "across", clue: "Natural light that comes from the sun" },
        { num: 2, answer: "UNDER", row: 0, col: 1, dir: "down", clue: "Below something" },
        { num: 3, answer: "DEER", row: 2, col: 1, dir: "across", clue: "A gentle animal with hooves" },
      ],
    },
    {
      id: "advanced-5",
      title: "Big Word Challenge",
      focus: "Mixed advanced phonics",
      words: [
        { num: 1, answer: "BUTTERFLY", row: 0, col: 0, dir: "across", clue: "An insect with colorful wings" },
        { num: 2, answer: "USE", row: 0, col: 1, dir: "down", clue: "To do something with a tool or object" },
        { num: 3, answer: "EAR", row: 2, col: 1, dir: "across", clue: "You use this to hear" },
      ],
    },
  ],
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface CellInfo {
  answer: string;
  number?: number;
}

function buildGrid(puzzle: Puzzle) {
  const cells = new Map<string, CellInfo>();
  let maxRow = 0;
  let maxCol = 0;

  for (const word of puzzle.words) {
    for (let i = 0; i < word.answer.length; i++) {
      const row = word.dir === "down" ? word.row + i : word.row;
      const col = word.dir === "across" ? word.col + i : word.col;
      const key = `${row},${col}`;
      const existing = cells.get(key);
      cells.set(key, {
        answer: word.answer[i],
        number: i === 0 ? word.num : existing?.number,
      });
      maxRow = Math.max(maxRow, row);
      maxCol = Math.max(maxCol, col);
    }
  }

  return { cells, rows: maxRow + 1, cols: maxCol + 1 };
}

function speakWord(word: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word.split("").join(" "));
  utterance.rate = 0.65;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

function CrosswordGamePage() {
  const [level, setLevel] = useState<Level>("basic");
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [userGrid, setUserGrid] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [hintCount, setHintCount] = useState(0);

  const puzzles = PUZZLES[level];
  const puzzle = puzzles[puzzleIndex % puzzles.length];
  const { cells, rows, cols } = useMemo(() => buildGrid(puzzle), [puzzle]);
  const totalCells = cells.size;

  const filledCorrect = useMemo(() => {
    let count = 0;
    cells.forEach((info, key) => {
      if (userGrid[key] === info.answer) count++;
    });
    return count;
  }, [cells, userGrid]);

  const filledCells = Object.keys(userGrid).length;
  const isSolved = totalCells > 0 && filledCorrect === totalCells;
  const progress = Math.round((filledCorrect / totalCells) * 100);
  const currentLevel = LEVELS.find((item) => item.id === level)!;
  const acrossClues = puzzle.words.filter((word) => word.dir === "across");
  const downClues = puzzle.words.filter((word) => word.dir === "down");

  function clearSelection() {
    setSelectedLetter(null);
  }

  function changeLevel(next: Level) {
    setLevel(next);
    setPuzzleIndex(0);
    setUserGrid({});
    setChecked(false);
    setSelectedLetter(null);
    setHintCount(0);
  }

  function loadPuzzle(index: number) {
    setPuzzleIndex((index + puzzles.length) % puzzles.length);
    setUserGrid({});
    setChecked(false);
    setSelectedLetter(null);
    setHintCount(0);
  }

  function newPuzzle() {
    loadPuzzle(puzzleIndex + 1);
  }

  function resetPuzzle() {
    setUserGrid({});
    setChecked(false);
    setSelectedLetter(null);
    setHintCount(0);
  }

  function placeLetter(key: string, letter: string) {
    if (!cells.has(key)) return;
    setUserGrid((grid) => ({ ...grid, [key]: letter }));
    setChecked(false);
  }

  function clearCell(key: string) {
    setUserGrid((grid) => {
      const next = { ...grid };
      delete next[key];
      return next;
    });
    setChecked(false);
  }

  function giveHint() {
    const emptyOrWrong: string[] = [];
    cells.forEach((info, key) => {
      if (userGrid[key] !== info.answer) emptyOrWrong.push(key);
    });
    if (!emptyOrWrong.length) return;
    const key = emptyOrWrong[Math.floor(Math.random() * emptyOrWrong.length)];
    const info = cells.get(key)!;
    placeLetter(key, info.answer);
    setHintCount((count) => count + 1);
  }

  function handleCellClick(key: string) {
    if (!cells.has(key)) return;
    if (selectedLetter) {
      placeLetter(key, selectedLetter);
      clearSelection();
    } else if (userGrid[key]) {
      clearCell(key);
    }
  }

  return (
    <SiteShell>
      <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-amber-50/70 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                English Phonics Game
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Word Builder <span className="text-gradient-zest">Crossword</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                A fun phonics activity for children. Read the clue, sound out the word,
                then drag a letter from the alphabet tray into the crossword.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border bg-card px-4 py-3 shadow-sm">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Puzzle</p>
                <p className="font-bold">{puzzleIndex + 1} / {puzzles.length}</p>
              </div>
            </div>
          </div>

          <div className="mb-7 grid gap-3 sm:grid-cols-3">
            {LEVELS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => changeLevel(item.id)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
                  level === item.id
                    ? "border-primary bg-card shadow-md ring-2 ring-primary/15"
                    : "bg-card/70",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold">{item.label}</span>
                  {level === item.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.blurb}</p>
              </button>
            ))}
          </div>

          <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
            <section className="rounded-3xl border bg-card p-4 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className={cn("border", currentLevel.color)} variant="outline">
                      {currentLevel.label}
                    </Badge>
                    <Badge variant="secondary">{currentLevel.focus}</Badge>
                  </div>
                  <h2 className="text-xl font-extrabold">{puzzle.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {filledCorrect} of {totalCells} letters correct
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={giveHint} disabled={isSolved}>
                    <Lightbulb className="h-4 w-4" /> Hint
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetPuzzle}>
                    <RotateCcw className="h-4 w-4" /> Reset
                  </Button>
                  <Button size="sm" className="gradient-zest border-0 text-primary-foreground" onClick={() => setChecked(true)}>
                    <CheckCircle2 className="h-4 w-4" /> Check
                  </Button>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>

              {isSolved && (
                <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-accent bg-accent/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                      <Trophy className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-extrabold">Great job! 🎉</p>
                      <p className="text-sm text-muted-foreground">You solved the crossword.</p>
                    </div>
                  </div>
                  <Button onClick={newPuzzle} className="gradient-zest border-0 text-primary-foreground">
                    Next Puzzle <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="mt-6 overflow-x-auto pb-2">
                <div
                  className="mx-auto grid w-max gap-1 rounded-xl bg-slate-800 p-1.5 shadow-inner"
                  style={{
                    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: rows }).map((_, row) =>
                    Array.from({ length: cols }).map((_, col) => {
                      const key = `${row},${col}`;
                      const info = cells.get(key);
                      if (!info) {
                        return <div key={key} className="h-12 w-12 sm:h-14 sm:w-14" />;
                      }

                      const value = userGrid[key] ?? "";
                      const isCorrect = checked && value === info.answer;
                      const isWrong = checked && value !== "" && value !== info.answer;

                      return (
                        <button
                          key={key}
                          type="button"
                          aria-label={`Crossword cell ${info.number ? `number ${info.number}` : ""}`}
                          onClick={() => handleCellClick(key)}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={(event) => {
                            event.preventDefault();
                            const letter = event.dataTransfer.getData("text/plain");
                            if (letter) placeLetter(key, letter);
                          }}
                          className={cn(
                            "relative h-12 w-12 rounded-md border-2 bg-white text-xl font-black uppercase text-slate-900 shadow-sm transition-all sm:h-14 sm:w-14 sm:text-2xl",
                            "hover:-translate-y-0.5 hover:border-primary hover:shadow-md",
                            !checked && value && "border-primary/60 bg-primary/5",
                            !checked && !value && "border-slate-200",
                            isCorrect && "border-accent bg-accent/15 text-accent",
                            isWrong && "border-destructive bg-destructive/10 text-destructive",
                          )}
                        >
                          {info.number && (
                            <span className="absolute left-1 top-0.5 text-[9px] font-bold text-slate-500 sm:text-[10px]">
                              {info.number}
                            </span>
                          )}
                          {value}
                          {isCorrect && <Check className="absolute bottom-1 right-1 h-3 w-3 text-accent" />}
                          {isWrong && <X className="absolute bottom-1 right-1 h-3 w-3 text-destructive" />}
                        </button>
                      );
                    }),
                  )}
                </div>
              </div>

              <div className="mt-7 rounded-2xl border bg-muted/30 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold">Alphabet Tray</h3>
                    <p className="text-xs text-muted-foreground">
                      Drag a letter onto a cell, or tap a letter and then tap a cell.
                    </p>
                  </div>
                  {selectedLetter && (
                    <Badge className="gradient-zest border-0 text-primary-foreground">
                      {selectedLetter} selected
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-9 md:grid-cols-13">
                  {ALPHABET.map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      draggable
                      onDragStart={(event) => event.dataTransfer.setData("text/plain", letter)}
                      onClick={() => setSelectedLetter((selected) => (selected === letter ? null : letter))}
                      className={cn(
                        "flex h-9 w-full items-center justify-center rounded-lg border bg-background text-sm font-extrabold shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary sm:h-10",
                        selectedLetter === letter && "gradient-zest border-0 text-primary-foreground",
                      )}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{filledCells} letters placed{hintCount ? ` · ${hintCount} hint${hintCount > 1 ? "s" : ""} used` : ""}</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 font-semibold hover:text-foreground"
                  onClick={() => setUserGrid({})}
                >
                  <Eraser className="h-3.5 w-3.5" /> Clear all letters
                </button>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-3xl border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Across</p>
                    <p className="mt-1 text-sm text-muted-foreground">Read the clue and sound it out.</p>
                  </div>
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-4 space-y-3">
                  {acrossClues.map((word) => (
                    <div key={word.num} className="flex gap-3 rounded-xl border bg-muted/20 p-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                        {word.num}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-5">{word.clue}</p>
                        <button
                          type="button"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                          onClick={() => speakWord(word.answer)}
                        >
                          <Volume2 className="h-3.5 w-3.5" /> Hear word
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border bg-card p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Down</p>
                <div className="mt-4 space-y-3">
                  {downClues.map((word) => (
                    <div key={word.num} className="flex gap-3 rounded-xl border bg-muted/20 p-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-black text-accent">
                        {word.num}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-5">{word.clue}</p>
                        <button
                          type="button"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                          onClick={() => speakWord(word.answer)}
                        >
                          <Volume2 className="h-3.5 w-3.5" /> Hear word
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border bg-gradient-to-br from-amber-50 to-emerald-50 p-5">
                <div className="flex items-center gap-2 font-extrabold">
                  <Star className="h-5 w-5 fill-current text-primary" />
                  Tutor tip
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ask the child to say each sound slowly before choosing a letter. After
                  completing the word, have them read the whole word aloud.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-3 shadow-sm">
            <Button variant="outline" onClick={() => loadPuzzle(puzzleIndex - 1)} disabled={puzzles.length < 2}>
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="hidden text-muted-foreground sm:inline">Need a fresh challenge?</span>
              <Button variant="outline" onClick={newPuzzle}>
                <Shuffle className="h-4 w-4" /> New Puzzle
              </Button>
            </div>
            <Button onClick={newPuzzle} className="gradient-zest border-0 text-primary-foreground">
              Next Puzzle <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
