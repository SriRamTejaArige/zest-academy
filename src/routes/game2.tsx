import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Lightbulb, RotateCcw, Sparkles, Star, Trophy, Volume2, X } from "lucide-react";

type Level = "basic" | "intermediate" | "advanced";
type Puzzle = { word: string; clue: string; emoji: string };

const PUZZLES: Record<Level, Puzzle[]> = {
  basic: [
    { word: "CAT", clue: "A small pet that says meow.", emoji: "🐱" },
    { word: "DOG", clue: "A pet that barks.", emoji: "🐶" },
    { word: "SUN", clue: "It shines in the sky.", emoji: "☀️" },
    { word: "BUS", clue: "A vehicle that carries people.", emoji: "🚌" },
    { word: "HAT", clue: "You wear it on your head.", emoji: "🎩" },
    { word: "FISH", clue: "It swims in water.", emoji: "🐟" },
  ],
  intermediate: [
    { word: "SHIP", clue: "A large boat.", emoji: "🚢" },
    { word: "CHIP", clue: "A small crispy snack.", emoji: "🍟" },
    { word: "FROG", clue: "A green animal that jumps.", emoji: "🐸" },
    { word: "STAR", clue: "A bright object seen at night.", emoji: "⭐" },
    { word: "TRAIN", clue: "A vehicle that runs on railway tracks.", emoji: "🚆" },
    { word: "SHEEP", clue: "A farm animal with wool.", emoji: "🐑" },
  ],
  advanced: [
    { word: "ELEPHANT", clue: "A huge animal with a long trunk.", emoji: "🐘" },
    { word: "BUTTERFLY", clue: "A colorful insect with wings.", emoji: "🦋" },
    { word: "DINOSAUR", clue: "A giant animal that lived long ago.", emoji: "🦖" },
    { word: "RAINBOW", clue: "A colorful arc that can appear after rain.", emoji: "🌈" },
    { word: "SUNFLOWER", clue: "A tall yellow flower.", emoji: "🌻" },
  ],
};

const LEVELS: { id: Level; label: string; icon: string; text: string }[] = [
  { id: "basic", label: "Basic", icon: "🌱", text: "Short phonics words" },
  { id: "intermediate", label: "Intermediate", icon: "🌿", text: "Blends and longer words" },
  { id: "advanced", label: "Advanced", icon: "🌳", text: "Challenging vocabulary" },
];

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.78;
  window.speechSynthesis.speak(u);
}

function shuffle<T>(a: T[]) {
  return [...a].sort(() => Math.random() - 0.5);
}

function WordBuilder() {
  const [level, setLevel] = useState<Level>("basic");
  const [index, setIndex] = useState(0);
  const [built, setBuilt] = useState("");
  const [wrong, setWrong] = useState<string | null>(null);
  const [hint, setHint] = useState(3);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);

  const puzzle = PUZZLES[level][index];

  const letters = useMemo(() => {
    const correct = puzzle.word.split("");
    const extras = shuffle("ABCDEGHMNPRSTUV".split(""))
      .filter((x) => !correct.includes(x))
      .slice(0, Math.max(4, 8 - correct.length));
    return shuffle([...correct, ...extras]);
  }, [level, index]);

  const progress = Math.round(((index + (done ? 1 : 0)) / PUZZLES[level].length) * 100);

  function choose(letter: string) {
    if (done) return;
    const expected = puzzle.word[built.length];
    if (letter === expected) {
      const next = built + letter;
      setBuilt(next);
      setWrong(null);
      speak(letter);
      if (next === puzzle.word) {
        setDone(true);
        setScore((s) => s + 100);
        setStars((s) => s + 1);
        setTimeout(() => speak(`Great job! ${puzzle.word}`), 250);
      }
    } else {
      setWrong(letter);
      setTimeout(() => setWrong(null), 450);
    }
  }

  function reset() {
    setBuilt("");
    setDone(false);
    setWrong(null);
  }

  function next() {
    const levels = LEVELS.map((x) => x.id);
    const li = levels.indexOf(level);
    if (index < PUZZLES[level].length - 1) {
      setIndex((x) => x + 1);
    } else if (li < levels.length - 1) {
      setLevel(levels[li + 1]);
      setIndex(0);
      setScore((s) => s + 250);
    } else {
      setLevel("basic");
      setIndex(0);
      setScore((s) => s + 500);
    }
    setBuilt("");
    setDone(false);
  }

  function useHint() {
    if (!hint || done) return;
    setHint((x) => x - 1);
    speak(`The next letter is ${puzzle.word[built.length]}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-violet-50 text-slate-800">
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm font-bold text-violet-600">ZEST ACADEMY • LEVEL 3</p>
            <h1 className="text-3xl font-black">Word Builder 🧩</h1>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2 font-black text-amber-700">
            <Star className="h-5 w-5 fill-current" /> {stars}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-3 md:grid-cols-3">
          {LEVELS.map((l) => (
            <button key={l.id} onClick={() => { setLevel(l.id); setIndex(0); setBuilt(""); setDone(false); }}
              className={`rounded-3xl border-2 p-4 text-left transition ${level === l.id ? "border-violet-400 bg-violet-100 shadow-lg" : "border-white bg-white hover:border-violet-200"}`}>
              <span className="text-3xl">{l.icon}</span>
              <p className="font-black">{l.label}</p>
              <p className="text-sm text-slate-500">{l.text}</p>
            </button>
          ))}
        </div>

        <div className="my-5 rounded-3xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Puzzle {index + 1} / {PUZZLES[level].length}</span><span>{progress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <section className="rounded-[2rem] bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 p-6 text-center text-white shadow-xl sm:p-10">
          <div className="text-7xl">{puzzle.emoji}</div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase">Build the word</span>
            <button onClick={() => speak(puzzle.word)} className="rounded-full bg-white/15 p-2"><Volume2 className="h-5 w-5" /></button>
          </div>
          <h2 className="mt-3 text-xl font-bold">{puzzle.clue}</h2>

          <div className="my-8 flex flex-wrap justify-center gap-2">
            {puzzle.word.split("").map((_, i) => (
              <div key={i} className={`flex h-14 w-12 items-center justify-center rounded-2xl border-2 text-2xl font-black sm:h-16 sm:w-14 ${built[i] ? "border-white bg-white text-violet-700" : "border-white/60 bg-white/15"}`}>
                {built[i] || "?"}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {letters.map((letter, i) => (
              <button key={`${letter}-${i}`} disabled={done} onClick={() => choose(letter)}
                className={`flex h-14 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-violet-700 shadow-lg transition hover:-translate-y-1 disabled:opacity-50 ${wrong === letter ? "animate-bounce bg-rose-300" : ""}`}>
                {letter}
              </button>
            ))}
          </div>

          {done && (
            <div className="mt-6 rounded-3xl bg-white p-5 text-violet-700 shadow-xl">
              <div className="flex items-center justify-center gap-2 text-2xl font-black"><Trophy className="text-amber-500" /> Amazing!</div>
              <p className="mt-1 font-semibold">You built {puzzle.word} correctly! +100 ⭐</p>
            </div>
          )}
        </section>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <button onClick={useHint} disabled={!hint || done} className="flex items-center justify-center gap-2 rounded-2xl bg-amber-100 px-4 py-3 font-black text-amber-800 disabled:opacity-40">
            <Lightbulb /> Hint ({hint})
          </button>
          <button onClick={() => { setBuilt((x) => x.slice(0, -1)); setDone(false); }} disabled={!built || done} className="flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 font-black disabled:opacity-40">
            <X /> Remove
          </button>
          <button onClick={reset} className="flex items-center justify-center gap-2 rounded-2xl bg-sky-100 px-4 py-3 font-black text-sky-800">
            <RotateCcw /> Reset
          </button>
        </div>

        <button disabled={!done} onClick={next} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-4 font-black text-white shadow-lg disabled:opacity-40">
          Next Word <ChevronRight />
        </button>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-black"><Sparkles className="text-violet-500" /> Phonics Tip</h3>
          <p className="mt-2 text-slate-600">Say each sound slowly, then blend them together. Example: <b>C → A → T → CAT</b>. Ask the learner to say the whole word after building it.</p>
        </div>

        <div className="mt-5 rounded-3xl bg-slate-900 p-5 text-white">
          <p className="text-sm text-slate-300">Score</p>
          <p className="text-3xl font-black">{score}</p>
        </div>
      </main>
    </div>
  );
}

export const Route = createFileRoute("/game2")({ component: WordBuilder });
