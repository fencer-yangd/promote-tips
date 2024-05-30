// 1 ()

// 2 ()() (())

// 3 ()()() (())() ((())) ()(())

// 4

function get(num) {
  if (num === 1) return ['()'];

  function generate(i, list) {
    if (i >= num) return list;
    const result = [];
    for (let i = 0; i < list.length; i++) {
      const str = list[i].split('');
      for (let j = 1; j <= str.length; j++) {
        result.push(list[i].slice(0,j) + '()' + list[i].slice(j, list[i].length));
      }
    }
    return generate(i + 1, result);
  }

  const list = ['()'];
  const result = generate(1, list);

  return [...new Set(result)];
}


console.log(get(4));
