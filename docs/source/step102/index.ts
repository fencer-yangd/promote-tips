// const a = [1, 2];
// const b = [1, '2'] as const;
// useState<T>() [T, (T) => void]

// enum State {
//   Pending,
//   Fulfilled,
//   Rejected
// }
// State.Pending  // 0

// let someValue = "this is a string";

// type TypeA = {
//   key: '1';
//   a: number;
//   b: string;
// }

// type TypeB = {
//   key: '2';
//   c: number;
//   d: number;
// }

// type TypeAll = TypeA | TypeB;

// const a: TypeAll = {
//   key: '2',
//   c: 1,
//   d: 2
// }

// type TypeA = {
//   key: number;
//   a: number;
// }

// type TypeB = {
//   key: string;
//   b: number;
// }

// type TypeAll = TypeA & TypeB;

// const a = {
//   a: 1,
//   b: 2
// }

// function identity<T>(arg: T): T {
//   return arg;
// }

// let output = identity<string>("hello");
// let output2 = identity(123);

// function identity<T = string>(arg: T): T { // 此时如果不传类型，则默认为 string 类型
//   return arg;
// }

// let output = identity("hello"); // 默认 string
// let output2 = identity<number>(123); // T 类型为 number
// let output3 = identity(123); // ts 编译报错，类型不匹配

// type BaseType = { name: string }

// type Type1 = {
//   name: string;
//   id: number;
// }

// type Type2 = {
//   id: number;
// }

// function identity<T extends BaseType>(arg: T): T { // 此时如果不传类型，则默认为 string 类型
//     return arg;
// }

// const output = identity<Type1>({ name: 'a', id: 1 }) // ts 编译通过
// const output2 = identity<Type2>({ id: 1 }) // ts 编译报错
// 三目运算 ∈
// function identity<T>(arg: T extends number ? never : T): T { 
//   return arg;
// }

// const output = identity<string>('1') // ts 编译通过
// const output2 = identity({}) // ts 编译通过
// const output3 = identity<number>(1) // ts 编译失败

// function pair<T, U = number>(first: T, second: U): [T, U] {
//   return [first, second];
// }

// let result = pair<string>("one", 1);

// class GenericClass<T> implements GenericInterface<T> {
//   value: T;

//   constructor(value: T) {
//       this.value = value;
//   }

//   // getValue(): T {
//   //   return this.value;
//   // }
// }

// interface GenericInterface<T> {
//   value: T;
//   getValue(): T;
// }

// x
// type IReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// function fn(): number {
//     return 1;
// }

// type Result = IReturnType<typeof fn>; // Result 类型为 number

// interface Person {
//   name: string;
//   age: number;
//   address: string;
// }

// type PersonKeys = keyof Person;
// // PersonKeys 的类型为 "name" | "age" | "address"

// const a = ['1', 2]
// type TypeA = typeof a;

// const person = {
//   name: "Alice",
//   age: 30,
// };

// type PersonType = typeof person;
// // PersonType 的类型为 { name: string, age: number }

// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//   return obj[key];
// }

// const person = {
//   name: "Alice",
//   age: 30,
// };

// const _name: string = getProperty(person, "name");
// const age: number = getProperty(person, "age");
// getProperty(person, 'name')

// interface Animal {
//   name: string;
// }

// interface Dog extends Animal {
//   bark(): void;
// }

// let animal: Animal = { name: 'Animal' };
// let dog: Dog = { name: 'Dog', bark: () => console.log('Woof!') };

// animal = dog; // 协变：Dog 可以赋值给 Animal


// type AnimalHandler = (animal: Animal) => void;
// type DogHandler = (dog: Dog) => void;

// let handleAnimal: AnimalHandler = (animal: Animal) => console.log(animal.name);
// let handleDog: DogHandler = (dog: Dog) => console.log(dog.name);

// handleDog = handleAnimal; // 逆变：AnimalHandler 可以赋值给 DogHandler

// type Timer = ReturnType<typeof setTimeout>;
// const obj = {
//   a: 1,
//   b: 2,
// }
// setTimeout((a, b) => {
//   console.log(a, b);
//   console.log(obj.a, obj.b);
// }, 1000, obj.a, obj.b);
// obj.a = 2;

// import { type User } from '@type/moduleA';

// const user: User = {
//   name: 'Alice',
//   age: 30
// }

// const user: ModleA.User = {
//   name: 'Alice',
//   age: 30
// }

// eslint-disable
// type Any = any;