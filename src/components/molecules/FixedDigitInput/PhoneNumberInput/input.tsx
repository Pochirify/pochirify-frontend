import { Typography } from "components/atoms/Typography";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  RefObject,
  createRef,
} from "react";
import styles from "./style.module.scss";

function arrayFilled<T>(array: Array<T>) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == undefined) {
      return false;
    }
  }
  return true;
}

function newCode(beforeCode: string[], newElemIndex: number, newElem: string) {
  return beforeCode.map((elem, i) => {
    if (i == newElemIndex) {
      return newElem;
    }
    return elem;
  });
}

function isHyphenNeeded(i: number) {
  return i == 2 || i == 6;
}

type Props = {
  onComplete: () => void;
  setValue: (value: string) => void;
};

export const PhoneNumberInput = (props: Props) => {
  const [code, setCode] = useState(() => {
    return new Array<string>(11).fill("");
  });
  const [inputIndex, setInputIndex] = useState(0);
  const inputRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  for (let i = 0; i < 11; i++) {
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

  const setValue = props.setValue;
  useEffect(() => {
    let value = "";
    for (let i = 0; i < code.length; i++) {
      value += code[i];
    }
    setValue(value);
  }, [code, setValue]);

  return (
    <div className={styles.module}>
      {[...Array(11)].map((_, i) => (
        <>
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
                i < 10 && inputRefs.current[i + 1].current?.focus();
                setInputIndex(inputIndex + 1);
              }
              if (arrayFilled(updated)) {
                props.onComplete();
              }
            }}
          />
          {isHyphenNeeded(i) && <Typography tag="span">-</Typography>}
        </>
      ))}
    </div>
  );
};
