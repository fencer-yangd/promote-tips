/**
 * @description 24. 两两交换链表中的节点
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 * 示例 2：
 *
 * 输入：head = []
 * 输出：[]
 * 示例 3：
 *
 * 输入：head = [1]
 * 输出：[1]
 *
 *
 * 提示：
 *
 * 链表中节点的数目在范围 [0, 100] 内
 * 0 <= Node.val <= 100
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

const list = [1,2,3,4]
const listNode = listToListNode(list);

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = function(head) {
  if (!head) return null;
  function getNode(res, _head) {
    if (!_head) return;
    const val1 = _head.val;
    const val2 = _head.next?.val || null;
    if (val2 === null) {
      res.val = val1;
      return ;
    }
    res.val = val2;
    res.next = new ListNode(val1);
    if (_head.next.next) res.next.next = new ListNode();
    getNode(res.next.next, _head.next.next);
  }
  const result = new ListNode();
  getNode(result, head);
  return result;
};


console.log(swapPairs(listNode));
