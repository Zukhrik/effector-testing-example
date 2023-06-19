import faker from "faker";
import {
  $name,
  $age,
  changeName,
  changeAge,
  submit,
  saveFormFx,
} from "./model";

let name: string;
let age: number;
let save: any;

// запоминаем до начала тестов значения/обработчики
beforeAll(() => {
  name = $name.getState();
  age = $age.getState();
  save = saveFormFx.use.getCurrent();
});

// возвращаем после тестов значения/обработчики, которые были до начала тестов
afterAll(() => {
  changeName(name);
  changeAge(age);
  saveFormFx.use(save);
});

describe("Rules points 6, 8", () => {
  test("a valid form is submitted to server", () => {
    // Arrange
    const mock = jest.fn();
    saveFormFx.use(mock);
    const validRandomName = faker.datatype.string(
      faker.datatype.number({ min: 2, max: 40 })
    );
    const validRandomAge = faker.datatype.number({ min: 18 });

    // Act
    changeName(validRandomName);
    changeAge(validRandomAge);
    submit();

    // Assertion
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith({ name: validRandomName, age: validRandomAge });
  });
});