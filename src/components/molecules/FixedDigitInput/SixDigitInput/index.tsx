import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  RefObject,
  createRef,
} from "react";
import styles from "./style.module.scss";

function arrayEqual<T>(a: Array<T>, b: Array<T>) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function numToCharArray(num: number) {
  const str = num.toString();
  return Array.from(str);
}

function newCode(beforeCode: string[], newElemIndex: number, newElem: string) {
  return beforeCode.map((elem, i) => {
    if (i == newElemIndex) {
      return newElem;
    }
    return elem;
  });
}

type Props = {
  correctNumber: number;
  onComplete: () => void;
};

export const SixDigitInput = (props: Props) => {
  const [code, setCode] = useState(() => {
    return new Array<string>(6).fill("");
  });
  const correctCode = numToCharArray(props.correctNumber);
  const [inputIndex, setInputIndex] = useState(0);
  const inputRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  for (let i = 0; i < 6; i++) {
    inputRefs.current[i] = createRef<HTMLInputElement>();
  }

  const bsFunction = useCallback(
    (event: any) => {
      if (event.key === "Backspace" && inputIndex > 0) {
        inputRefs.current[inputIndex - 1].current?.focus();
        setInputIndex(inputIndex - 1);
      }
    },
    [inputIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", bsFunction, false);
    return () => {
      document.removeEventListener("keydown", bsFunction, false);
    };
  }, [bsFunction]);

  return (
    <div className={styles.module}>
      {[...Array(6)].map((_, i) => (
        <input
          className={styles.input}
          maxLength={1}
          key={i}
          autoFocus={i === 0}
          value={code[i]}
          type="tel"
          ref={inputRefs.current[i]}
          onChange={(e) => {
            const updated = newCode(code, inputIndex, e.target.value);
            setCode([...updated]);
            if (e.target.value !== "") {
              i < 5 && inputRefs.current[i + 1].current?.focus();
              setInputIndex(inputIndex + 1);
            }

            // setCodeはまだ実行されていないので、updatedと比較
            if (arrayEqual(updated, correctCode)) {
              props.onComplete();
            }
          }}
        />
      ))}
    </div>
  );
};
