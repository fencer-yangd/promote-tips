/**
 * 合并两个有序链表
 *
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 输入：l1 = [1,2,4], l2 = [1,3,4]
 * 输出：[1,1,2,3,4,4]
 * 示例 2：
 *
 * 输入：l1 = [], l2 = []
 * 输出：[]
 * 示例 3：
 *
 * 输入：l1 = [], l2 = [0]
 * 输出：[0]
 *
 *
 * 提示：
 *
 * 两个链表的节点数目范围是 [0, 50]
 * -100 <= Node.val <= 100
 * l1 和 l2 均按 非递减顺序 排列
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const mergeTwoLists = function(list1, list2) {
  function generateNewList(l1, l2, l) {
    if (!l1 && !l2) return;
    if (!l1) {
      l.val = l2.val;
      l.next = l2.next;
      return;
    }
    if (!l2) {
      l.val = l1.val;
      l.next = l1.next;
      return;
    }
    const val1 = l1.val;
    const val2 = l2.val;
    if (val1 <= val2) {
      l.val = val1;
      l.next = {};
      generateNewList(l1.next, l2, l.next);
    }
    if (val1 > val2) {
      l.val = val2;
      l.next = {};
      generateNewList(l1, l2.next, l.next);
    }
  }
  if (!list1 && !list2) return null;
  const result = {};
  generateNewList(list1, list2, result);
  return result;
};

console.log(mergeTwoLists(listToListNode([1,2,4]), listToListNode([1,3,4])));
