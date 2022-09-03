import React, { useState, useRef } from "react";
import { TextInput, MantineProvider } from "@mantine/core";

import "./InputPopup.css";

interface IInputPopup {
  onSubmit: (memo: string) => void;
  closePopup: () => void;
  ref: React.RefObject<HTMLInputElement>;
}

const InputPopup: React.FC<IInputPopup> = (props) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue) {
      props.onSubmit(inputValue);
    }
    setInputValue("");
    props.closePopup();
  };

  return (
    <form action="submit" onSubmit={submitHandler}>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <TextInput
          ref={inputRef}
          autoFocus
          id="text-input"
          value={inputValue}
          onBlur={props.closePopup}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          classNames={{
            root: "memo-input-root",
            input: "memo-input-wrapper",
          }}
          placeholder="Add a memo..."
          aria-label="memo input"
        />
      </MantineProvider>
    </form>
  );
};

export default InputPopup;
