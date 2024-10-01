declare namespace ModleA {
  interface User {
    name: string;
    age: number;
  }
}

declare module '@type/moduleA' {
  export interface User {
    name: string;
    age: number;
  }
}