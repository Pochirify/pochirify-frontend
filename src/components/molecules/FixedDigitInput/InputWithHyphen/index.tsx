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

function arrayFilled(array: Array<string>) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === undefined || array[i] === "") {
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

function toString(code: string[]) {
  let value = "";
  for (let i = 0; i < code.length; i++) {
    value += code[i];
  }
  return value;
}

function isHyphenNeeded(i: number, length: 7 | 11) {
  return i == 2 || (i == 6 && length == 11);
}

type Props = {
  length: 7 | 11;
  onComplete: (value: string) => void;
  setValue: (value: string) => void;
  onBlur?: () => void;
};

export const InputWithHyphen = (props: Props) => {
  const [code, setCode] = useState(() => {
    return new Array<string>(props.length).fill("");
  });
  const [inputIndex, setInputIndex] = useState(0);
  const inputRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  for (let i = 0; i < props.length; i++) {
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

  const addKeyDownListener = useCallback(() => {
    document.addEventListener("keydown", bsFunction, false);
  }, [bsFunction]);
  const removeKeyDownListener = useCallback(() => {
    document.removeEventListener("keydown", bsFunction, false);
  }, [bsFunction]);

  useEffect(() => {
    addKeyDownListener();
    return removeKeyDownListener;
  }, [bsFunction, addKeyDownListener, removeKeyDownListener]);

  const setValue = props.setValue;
  useEffect(() => {
    setValue(toString(code));
  }, [code, setValue]);

  return (
    <div className={styles.module}>
      {[...Array(props.length)].map((_, i) => (
        <>
          {/* TODO: idが被らないように工夫 */}
          <input
            id={i.toString()}
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
                i < props.length - 1 &&
                  inputRefs.current[i + 1].current?.focus();
                setInputIndex(inputIndex + 1);
              }
              if (arrayFilled(updated)) {
                props.onComplete(toString(updated));
              }
            }}
            onFocus={() => {
              setInputIndex(i + 1);
              addKeyDownListener();
            }}
            onBlur={() => {
              // focusしてない時はkeydownをlistenしない
              removeKeyDownListener();
            }}
          />
          {isHyphenNeeded(i, props.length) && (
            <Typography tag="span">-</Typography>
          )}
        </>
      ))}
    </div>
  );
};
