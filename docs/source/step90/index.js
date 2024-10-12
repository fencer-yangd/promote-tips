/**
 * 删除链表的倒数第 N 个结点
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 示例 2：
 *
 * 输入：head = [1], n = 1
 * 输出：[]
 * 示例 3：
 *
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 *
 *
 * 提示：
 *
 * 链表中结点的数目为 sz
 * 1 <= sz <= 30
 * 0 <= Node.val <= 100
 * 1 <= n <= sz
 */

const list = [1,2,3,4,5];
function listToListNode(list) {
  function toNode(i, list, node) {
    node.val = list[i];
    node.next = i === list.length - 1 ? null : {};
    if (i=== list.length - 1) return;
    toNode(i+1, list, node.next);
  }
  const node = {};
  toNode(0, list, node);
  return node;
}


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  function reversListNode(node, list) {
    list.push({ ...node, next: null});
    if (!node.next) return;
    reversListNode(node.next, list);
  }

  function formatListToListNode(list, i, node) {
    if (i >= list.length) return;
    node.next = list[i];
    formatListToListNode(list, i + 1, node.next);
  }

  const list = [];
  reversListNode(head, list);
  list.splice(list.length  - n, 1);

  if (list.length === 0) return null;

  const [newNode] = list;
  formatListToListNode(list, 1, newNode);

  return newNode;
};

console.log(JSON.stringify(removeNthFromEnd(listToListNode([1,2,3,4,5,6]), 5), null, 2))
