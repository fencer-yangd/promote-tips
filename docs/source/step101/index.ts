// const a = ['type a', 'type b', 'type c', 'type d', 'type e', 'type f'] as const
//
// type TypeAll = typeof a[number]


// interface Person {
//   type: string;
// }

// interface Person1 extends Person {
//   type: '1';
// }

// type Person2 = {
//   type: string
// }

// type Persion1 = {
//   type: '1',
//   age: number;
//   name: string;
// }

// type Persion2 = {
//   type: '2',
//   gender: string;
//   fat: boolean;
// }

// type Persion = Persion1 | Persion2;

// const persion: Persion = {
//   type: '2',
//   // age: 18,
//   // name: 'name',
//   gender: 'male',
//   fat: true
// }

// type UseState = <T>(inital: T) => [T, (data: T) => void]

// function identity<T>(arg: T): T {
//   return arg;
// }

// let output = identity<string>("hello");
// let output2 = identity<number>(123);

// function identity<T = string>(arg: T): T { // 此时如果不传类型，则默认为 string 类型
//   return arg;
// }

// let output = identity("hello"); // 默认 string
// let output2 = identity<number>(123); // T 类型为 number
// let output3 = identity<>(123); // ts 编译报错，类型不匹配

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

// ∈
// function identity<T>(arg: T extends number ? never : T): T {
//   return arg;
// }

// const output = identity('1') // ts 编译通过
// const output2 = identity({}) // ts 编译通过
// const output3 = identity(1) // ts 编译失败

// function pair<T, U>(first: T, second: U): [T, U] {
//   return [first, second];
// }

// let result = pair<string, number>("one", 1);

// class GenericClass<T> implements GenericInterface<T> {
//   value: T;

//   constructor(value: T) {
//       this.value = value;
//   }

//   getValue(): T {
//     return this.value;
//   }
// }

// interface GenericInterface<T> {
//   value: T;
//   getValue(): T;
// }

// eslint-dsiabled
// export type Any = any;

// // ∈ x
// type IReturnType<T> = T extends (...args: Any[]) => infer R ? R : never;

// function fn(): number {
//     return 1;
// }

// type Result = IReturnType<typeof setTimeout>; // Result 类型为 number

// interface Person {
//   name: string;
//   age: number;
//   address: string;
// }

// type PersonKeys = keyof Person;

// const key: PersonKeys = 'name'

// const person = {
//   name: "Alice",
//   age: 30,
// };

// type PersonType = typeof person;
// PersonType 的类型为 { name: string, age: number }

// function getProperty<T, K extends keyof T>(obj: T, key: K extends K ? K : string): K extends K ? T[K] : undefined {
//   // return obj[key as K] || undefined;
// }

// const person = {
//   name: "Alice",
//   age: 30,
// };

// const _name: string = getProperty(person, "name");
// const age: number = getProperty(person, "age");


// type TypeA = {
//   name: string;
//   data: {
//     count: number;
//   }
// }

// // 我想获取 name 的类型
// type TypeANameType = TypeA['name'] // string
// // 我想获取 data 的类型
// type TypeADataType = TypeA['data'] // { count: number }

// enum Status {
//   PENDDING = 1, // 不赋值的话，默认从 0 开始的自然数
//   FULFILLED = 2,
//   REJECTED = 3,
// }

// // 使用 枚举也可以作为类型来使用
// const pengding: Status = Status.PENDDING; // 1

// const obj = {
//   a: 1,
//   b: 2
// }
// setTimeout((a, b) => {
//   console.log(a, b);
//   console.log(obj.a, obj.b);
// }, 1000, obj.a, obj.b);
//
// obj.a = 2;
