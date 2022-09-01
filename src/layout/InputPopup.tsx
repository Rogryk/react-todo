import React, { useState } from "react";
import { TextInput, MantineProvider } from "@mantine/core";

import "./InputPopup.css";

interface IInputPopup {
  onSubmit: (memo: string) => void;
  closePopup: () => void;
}

const InputPopup: React.FC<IInputPopup> = (props) => {
  const [inputValue, setInputValue] = useState("");

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
