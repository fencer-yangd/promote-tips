/**
 * @description 25. K 个一组翻转链表
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 *
 * k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 *
 * 你不能只是单纯地改变节点内部的值，而是需要实际进行节点交换。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[2,1,4,3,5]
 * 示例 2：
 *
 *
 *
 * 输入：head = [1,2,3,4,5], k = 3
 * 输出：[3,2,1,4,5]
 *
 *
 * 提示：
 * 链表中的节点数目为 n
 * 1 <= k <= n <= 5000
 * 0 <= Node.val <= 1000
 *
 *
 * 进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}


/**
 *
 * @param {number[]} arr
 * @return {ListNode}
 */
function listToListNode(arr) {
  let dummy = new ListNode();
  let current = dummy;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

const listNode = listToListNode([1,2,3,4,5]);

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = function(head, k) {
  if (!head) return null;
  function getLastNode(node) {
    if (!node) return null;
    while (node.next) {
      node = node.next;
    }
    return node;
  }
  function reverse(head, n, item, res, _head = null) {
    if (!head) {
      if (!item) return;
      if (!res.val) {
        res.val = _head.val;
        res.next = _head.next;
      } else {
        res.next = _head;
      }
      return;
    }
    if (n === 0) {
      if (!res.val) {
        res.val = item.val;
        res.next = item.next;
      } else {
        res.next = item;
      }
      const last = getLastNode(res);
      reverse(head, k, null, last, null)
    } else {
      if (!_head) _head = head;
      reverse(head.next, n - 1, new ListNode(head.val, item), res, _head);
    }
  }
  const result = new ListNode();
  reverse(head, k, null, result);
  return result;
};

console.log(JSON.stringify(reverseKGroup(listNode, 3), null, 3));
