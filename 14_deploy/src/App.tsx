import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";
import { WORDS, type Challenge } from "./utils/words";
import { useEffect, useState } from "react";

export function App() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);

  const ATTEMPTS_MARGIN = 5;

  function handleRestartGame() {
    const isConfirmed = window.confirm("Do you want to restart the game?");

    if (isConfirmed) {
      starGame();
    }
  }

  function starGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallenge(randomWord);

    setScore(0);
    setLetters("");
    setLettersUsed([]);
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letters.trim()) {
      return alert("Type a letter");
    }

    const value = letters.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toLocaleUpperCase() === value,
    );

    if (exists) {
      setLetters("");
      return alert(`Letter already used, ${value}.`);
    }

    const hits = challenge.word
      .toLocaleUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;

    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);

    setScore(currentScore);

    setLetters("");
  }

  function endGame(message: string) {
    alert(message);
    starGame();
  }

  useEffect(() => {
    starGame();
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    (setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Congratulations! GG!");
      }

      const attemptLimit = challenge.word.length + ATTEMPTS_MARGIN;
      if (lettersUsed.length === attemptLimit) {
        return endGame("You lose! You used all attempts.");
      }
    }),
      200);
  }, [score, lettersUsed.length]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) =>
                used.value.toLocaleUpperCase() === letter.toLocaleUpperCase(),
            );

            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letters}
            onChange={(e) => setLetters(e.target.value)}
          />

          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}
