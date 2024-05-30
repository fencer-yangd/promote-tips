/**
 *
 * 两数相加
 *
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 *
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 *
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807.
 * 示例 2：
 *
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 * 示例 3：
 *
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 输出：[8,9,9,9,0,0,0,1]
 *
 *
 * 提示：
 *
 * 每个链表中的节点数在范围 [1, 100] 内
 * 0 <= Node.val <= 9
 * 题目数据保证列表表示的数字不含前导零
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  function add(n1, n2, s = 0, r) {
    const n1Val = n1 ? n1.val : 0;
    const n2Val = n2 ? n2.val : 0;
    const sum = n1Val + n2Val + s;
    const val = sum % 10;
    const _s = Math.floor(sum / 10);
    r.val = val;
    if (!(n1 && n1.next) && !(n2 && n2.next)) {
      if (_s > 0) {
        r.next = {
          val: _s,
          next: null
        };
        return null;
      }
      r.next = null;
      return null;
    }
    r.next = {};
    add(n1 ? n1.next : null, n2 ? n2.next : null, _s, r.next);
  }
  const r = {};
  add(l1, l2, 0, r);
  return r;
};

const l1 = {
  val: 2,
  next: {
    val: 4,
    next: {
      val: 3,
      next: null,
    }
  }
}

const l2 = {
  val: 5,
  next: {
    val: 6,
    next: {
      val: 4,
      next: null,
    }
  }
}

console.log(addTwoNumbers(l1, l2));
