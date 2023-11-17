"use client";

import Image from "next/image";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import titleImage from "@/public/word-scramblle.svg";

import Button from "./button";
import OneInput from "./one-input";

export default function Dialog({ words }: { words: string[] }) {
  const [word, setWord] = useState("");
  const [correct, setCorrect] = useState("");
  const [mistakes, setMistakes] = useState("");

  const setNewWord = useCallback(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, [words]);

  const mixedWord = useMemo(
    () =>
      word
        .split("")
        .map((word) => ({ word, sort: Math.random() }))
        .sort((a, b) => (a.sort > b.sort ? 1 : -1))
        .map(({ word }) => word)
        .join(" "),
    [word]
  );

  const onRandomClick = () => {
    setNewWord();
    onResetClick();
  };

  const onResetClick = () => {
    setCorrect(new Array(word.length).fill(" ").join(""));
    setMistakes("");
  };

  useEffect(() => setNewWord(), [setNewWord]);

  const onChange: (
    letterIndex: number
  ) => ChangeEventHandler<HTMLInputElement> = (i) => (e) => {
    if (mistakes.length > 4) return;
    const target = e.currentTarget;
    const rawValue = target.value.trim();
    const value = rawValue.length > 1 ? rawValue[1] : rawValue[0];
    setCorrect((cr) => cr.substring(0, i) + value + cr.substring(i + 1));

    if (value === word[i]) {
      const inputs = (
        Array.from(document.querySelectorAll("input, button")) as (
          | HTMLInputElement
          | HTMLButtonElement
        )[]
      ).sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : 0));

      const currentIndex = inputs.indexOf(target);

      inputs[currentIndex + 1].focus();
    } else {
      setMistakes((m) => m + value);
    }
  };

  return (
    <section className="z-10 min-w-[417px] bg-[#0C1222] pt-[29px] px-[26px] rounded-[12px]">
      <Image className="mx-auto" src={titleImage} alt="word scrablle" />
      <p className="mt-7 mb-[30px] h-16 bg-[#4A5567] text-[#97A3B6] text-[32px] leading-8 tracking-[.265rem] flex items-center justify-center rounded-[5px] shadow-bottom">
        {mixedWord}
      </p>
      <div className="w-fit mx-auto flex justify-center flex-col items-center">
        <div className="flex justify-between items-center min-w-[294px]">
          <div>
            {/* before for background dots mistakes as relative after */}
            <small>Tries ({mistakes.length}/5):</small>
            <div
              style={{ width: 12 * word.length }}
              className="inline-block border-t-[6px] border-dotted relative"
            >
              <i
                style={{ width: 12 * mistakes.length }}
                className="absolute bottom-0 left-0 border-t-[6px] border-dotted border-[#672171]"
              />
            </div>
          </div>
          <small>
            Mistakes:{" "}
            <span className="text-[#97A3B6] whitespace-pre">
              {mistakes.length ? mistakes.split("").join(", ") : "∅"}{" "}
            </span>
          </small>
        </div>
        <div className="text-white flex gap-[6px] h-[41px] my-[52px]">
          {word.split("").map((ch, k) => (
            <OneInput
              key={k}
              autoFocus={!k}
              value={correct[k] || ''}
              onChange={onChange(k)}
            />
          ))}
        </div>
      </div>
      <div className="flex text-white justify-evenly mb-8">
        <Button onClick={onRandomClick}>Random</Button>
        <Button onClick={onResetClick}>Reset</Button>
      </div>
    </section>
  );
}
