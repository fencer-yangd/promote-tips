/**
 * @description 1.将一个树状结构的数组转成扁平化数组
 * @description 2.将一个扁平化数组转成树状结构数组
 * @description 3.增加搜索功能
 */
function deepClone(value) {
  if (typeof value === "object" && value !== null) {
    const result = Array.isArray(value) ? [] : {};
    for (const key in value) {
      result[key] = deepClone(value[key]);
    }
    return result;
  }
  return value;
}

const data1 = [
  {
    id: "1",
    name: "父节点1",
    children: [
      {
        id: "1-1",
        name: "子节点1-1",
        children: [
          {
            id: "1-1-1",
            name: "子节点1-1-1",
          },
          {
            id: "1-1-2",
            name: "子节点1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "父节点2",
    children: [
      {
        id: "2-1",
        name: "子节点2-1",
      },
    ],
  },
];

const result1 = data1.reduce(function (acc, cur) {
  acc.push({
    id: cur.id,
    name: cur.name,
    parentId: cur.parentId,
  });
  cur.children &&
    cur.children.forEach((child) => {
      child.parentId = cur.id;
      arguments.callee(acc, child);
    });
  return acc;
}, []);

console.log(result1);
console.log(data1);

const data2 = [
  { id: "1", name: "父节点1", parentId: undefined },
  { id: "1-1", name: "子节点1-1", parentId: "1" },
  { id: "1-1-1", name: "子节点1-1-1", parentId: "1-1" },
  { id: "1-1-2", name: "子节点1-1-2", parentId: "1-1" },
  { id: "2", name: "父节点2", parentId: undefined },
  { id: "2-1", name: "子节点2-1", parentId: "2" },
];

// 此处需要做深度克隆处理，否则会改变data2本身
const result2 = deepClone(data2).reduce(function (acc, cur, idx, arr) {
  // 检索当前元素的子元素; tips: 此时操作cur会改变arr本身
  cur.children = arr.filter((item) => item.parentId === cur.id);
  // 判断是否为根元素
  return arr.filter((item) => !item.parentId);
}, []);

console.log(JSON.stringify(result2, null, 2));
console.log(data2);

function search(tree, key, value) {
  const result = data1.reduce(function (acc, cur) {
    acc.push({
      id: cur.id,
      name: cur.name,
      parentId: cur.parentId,
      [`_search_${key}`]: cur[`_search_${key}`] ?? cur[key],
    });
    cur.children &&
      cur.children.forEach((child) => {
        child[`_search_${key}`] = `${cur[`_search_${key}`] ?? cur[key]},${
          child[key]
        }`;
        child.parentId = cur.id;
        arguments.callee(acc, child);
      });
    return acc;
  }, []);
  const _temp1 = result.filter((item) =>
    item[`_search_${key}`].split(",").some((v) => v.indexOf(value) > -1)
  );
  if (!_temp1.length) return [];
  const _temp2 = _temp1
    .reduce((acc, cur) => [...acc, ...cur[`_search_${key}`].split(",")], [])
    .filter((v, i, a) => a.indexOf(v) === i);
  const result1 = result
    .filter((item) => _temp2.includes(item[key]))
    .map((item) => {
      const _item = { ...item };
      Reflect.deleteProperty(_item, `_search_${key}`);
      return _item;
    });
  return deepClone(result1).reduce(function (acc, cur, idx, arr) {
    cur.children = arr.filter((item) => item.parentId === cur.id);
    return arr.filter((item) => !item.parentId);
  }, []);
}

const result3 = search(data1, "id", "-2");
console.log(JSON.stringify(result3, null, 2));
