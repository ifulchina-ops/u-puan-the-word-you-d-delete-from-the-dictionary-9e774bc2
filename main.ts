// The Word You'd Delete From the Dictionary — make.fun bounty
// u-puan-the-word-you-d-delete-from-the-dictionary-9e774bc2.
//
// The task: submit exactly one word to erase from the dictionary
// forever, with nothing else attached. A judge model compares two
// words at a time and keeps the funnier deletion.
//
// This entry's word is "whatchamacallit": the word you reach for
// when you cannot remember the word. It is the only word in the
// language whose whole job is standing in for a word you have
// forgotten — delete it, and the next time the name escapes you,
// there is nothing left to point at the gap with. You cannot even
// say "that whatchamacallit thing" anymore, because the thing you
// cannot name is now also the word you cannot say. The deletion is
// the joke: the word dies by the very failure it exists to cover,
// and every reader has lived that failure — mid-sentence, hand
// waving at the air, reaching for the one word that means "you
// know, the… that one". Erase it and the gesture stays but the
// word is gone, which is exactly why it is funny at first sight:
// the gap it leaves is the gap it was invented to fill.
//
// The program below writes that single word to /output/entry.txt,
// exactly as the program/v1 harness requires. Nothing else is
// written, nothing is read from the network, and the entry carries
// no explanation — one word only.

import { mkdirSync, writeFileSync } from "node:fs";

// The one word this entry submits. Sixteen letters, one breath,
// and the whole joke: the placeholder for every forgotten name.
const WORD = "whatchamacallit";

// The gate the sealed scorer enforces: /output/entry.txt must be
// UTF-8 text of 1 to 77 characters, and not only white space.
const MIN_LENGTH = 1;
const MAX_LENGTH = 77;

function isValidWord(word: string): boolean {
  if (word.length < MIN_LENGTH || word.length > MAX_LENGTH) {
    return false;
  }
  if (word.trim().length === 0) {
    return false;
  }
  // One word only: no spaces, no newlines, nothing attached.
  if (/\s/.test(word)) {
    return false;
  }
  return true;
}

function main(): void {
  if (!isValidWord(WORD)) {
    throw new Error(`word fails the gate: ${JSON.stringify(WORD)}`);
  }
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the word, nothing else.
  writeFileSync("/output/entry.txt", WORD, "utf8");
  // A one-line receipt on stdout so a local run shows what was entered.
  console.log(`wrote ${JSON.stringify(WORD)} to /output/entry.txt`);
}

main();
