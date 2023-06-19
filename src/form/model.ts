import {combine, createEffect, createEvent, guard, restore} from "effector";

type Name = string;
type Age = number;

// Events 🍏
export const changeName = createEvent<Name>();
export const changeAge = createEvent<Age>();
export const submit = createEvent();

// Effects 🍏
type Form = {
  name: Name,
  age: Age
};

type Response = Form;

export const saveFormFx = createEffect<Form, Response>((params) => {
  return new Promise((res) => setTimeout(() => res(params), 5000));
});

// Stores 🍏
export const $name = restore(changeName, "");
export const $age = restore(changeAge, 18);

// Derived stores 🍎
export const $nameHasFrom2To40Chars = $name.map(
  (name) => name.length >= 2 && name.length <= 40
);

export const $isAdult = $age.map((age) => age >= 18);

export const $isValid = combine(
  [$nameHasFrom2To40Chars, $isAdult],
  (validators) => validators.every(Boolean)
);

export const $output = combine(
  {
    name: $name,
    isAdult: $isAdult,
    isNameCorrect: $nameHasFrom2To40Chars,
  },
  ({ name, isAdult, isNameCorrect }) => {
    if (!isNameCorrect) {
      return `Name should be from 2 to 40 chars`;
    }

    if (!isAdult) {
      return `You are too young`;
    }

    return `Are you ${name}? Right?`;
  }
);

const $form = combine({ name: $name, age: $age });

// Connections
guard({
  source: $form,
  clock: submit,
  filter: $isValid,
  target: saveFormFx,
});
