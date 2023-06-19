import React from "react";
import {$age, $name, $output, changeAge, changeName, submit} from "./model";
import {useStore} from "effector-react";

export const FormValidating = () => {
  const age = useStore($age);
  const name = useStore($name);
  const output = useStore($output)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{display: 'flex', flexDirection: 'column', width: 400}}
    >
      <input
        name='name'
        value={name}
        placeholder='Enter name'
        onChange={({target}) => changeName(target.value)}
      />
      <input
        name='age'
        type='number'
        placeholder='Enter age'
        value={age}
        onChange={({target}) => changeAge(Number(target.value))}
      />
      {output}
      <button type='submit'>submit</button>
    </form>
  );
};