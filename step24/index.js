Promise.resolve()
.then(() => {
  console.log(0);
  return Promise.resolve(4);
})
.then(res => {
  console.log(res)
});

Promise.resolve()
.then(() => {
  console.log(1)
})
.then(() => {
  console.log(2)
})
.then(() => {
  console.log(3)
})
.then(() => {
  console.log(5)
})

// 1.
// 1. task: then0 then1

// 2. 0
// 2. task then1 Promise4

// 3. 1
// 3. task Promise4 then2

// 4.
// 4. task then2 function4 then3

// 5. 2
// 5. task: then3 then4 then5

// 6. 3

// 7. 4

// 8. 5







// 0 1 promise4 2 p4function 3 4 5


// step 1 pr0 F pr1 F
// step 2 p0 p1
// step 3 promise4
// step 4 p2 p4
// step 5 p3 p4function
// step 6 5
