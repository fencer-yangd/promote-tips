/**
 * @description 23. 合并 K 个升序链表
 * 给你一个链表数组，每个链表都已经按升序排列。
 *
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 *
 *
 *
 * 示例 1：
 *
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 * 解释：链表数组如下：
 * [
 *   1->4->5,
 *   1->3->4,
 *   2->6
 * ]
 * 将它们合并到一个有序链表中得到。
 * 1->1->2->3->4->4->5->6
 * 示例 2：
 *
 * 输入：lists = []
 * 输出：[]
 * 示例 3：
 *
 * 输入：lists = [[]]
 * 输出：[]
 *
 *
 * 提示：
 *
 * k == lists.length
 * 0 <= k <= 10^4
 * 0 <= lists[i].length <= 500
 * -10^4 <= lists[i][j] <= 10^4
 * lists[i] 按 升序 排列
 * lists[i].length 的总和不超过 10^4
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}


const list = [[1,4,5],[1,3,4],[2,6]];
function listToListNode(arr) {
  let dummy = new ListNode();
  let current = dummy;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

const listNodes = list.map(listToListNode);

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = function(lists) {
  if (!lists.length) return null;
  if (lists.every(list => !list)) return null;

  function getResult(res) {
    const values = lists.map(list => list?.val ? list.val : void 0);
    const min = Math.min(...values.filter(item => item !== void 0));
    const minIndex = values.indexOf(min);
    res.val = min;
    lists[minIndex] = lists[minIndex]?.next ? lists[minIndex].next : null;
    if(lists.every(list => !list)) return;
    res.next = new ListNode(0, null);
    getResult(res.next);
  }

  const result = new ListNode(0, null);
  getResult(result);
  return result;
};

console.log(mergeKLists(listNodes));
// console.log(listNodes);
