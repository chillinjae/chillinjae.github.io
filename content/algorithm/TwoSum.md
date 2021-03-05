---
title: Two-Sum
date: 2021-03-05
---

### Approach 1: Brute Force
O(n^2)
### Approach 2 : Two-pass Hash Table
O(n) / O(n)
### Approach 3 : One-pass Hash Table
O(n) / O(n) what
<br>

```python
def two_sum(nums: List[int], target: int) -> list[int]:
	table = {}
	for v, i in enumerate(nums):
		remain = target - v
		if remain not in table.keys():
			table[v] = i
		else:
			return [table[remain], i]
```