---
title: Add Two Numbers
date: 2021-03-05
---

### Recursion and linked list
<br>

```python
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode, r=0) -> ListNode:
        l1_val = l1.val if l1 else None
        l2_val = l2.val if l2 else None
        
        if (l1_val,l2_val,r) == (None,None,0):
            return None
        elif (l1_val,l2_val,r) == (None,None,1):
            return ListNode(val=1, next = None)
        elif l1_val == None:
            sum = l2_val + r
            r = int(sum/10)
            sum = sum if (sum<10) else (sum-r*10)
            return ListNode(val=sum, next=self.addTwoNumbers(l1, l2.next,r))
        elif l2_val == None:
            sum = l1_val + r
            r = int(sum/10)
            sum = sum if (sum<10) else (sum-r*10)            
            return ListNode(val=sum, next=self.addTwoNumbers(l1.next, l2,r))
        else:
            sum = l1_val + l2_val + r
            r = int(sum/10)
            sum = sum if (sum<10) else (sum-r*10)
            return ListNode(val=sum,next=self.addTwoNumbers(l1.next, l2.next,r))
```