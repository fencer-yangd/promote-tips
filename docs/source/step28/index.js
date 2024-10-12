var a;
if (true) {
  console.log(a); // function
  a = 10;
  function a() {} // function to local
  function b() {}
  a = 5; // block var
  console.log(a); // 5
}
console.log(a); // 10
console.log(b); // function
