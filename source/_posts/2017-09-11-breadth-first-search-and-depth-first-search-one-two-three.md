---
layout: post
title: 深搜&广搜一二三
date: '2017-09-11 16:12:22'
categories:
  - 算法
tags:
  - 深搜
  - 广搜
---

搜索是一种求解的方法，通常来说就是将所有情况探索一遍，找出其中符合要求的情况作为最后的解。按照生成解的顺序有两种基本的求解顺序：**深度优先搜索（Depth-first Search）** 和 __广度优先搜索（Breadth-first search）__。关于这两种搜索方式的基本原理不做过多介绍了，下面只说明个人对这两种搜索方式的一些理解。

# 深度优先搜索

深度优先搜索俗称dfs，核心实现方式是依附于递归。适用于需要求解出所有可能解的问题，在到达问题界限之前会一直递归下去。

```
dfs() {
  if(到达目标递归深度) {
    判断当前状态是否为解？->添加当前状态到解集合
    return
  }

  for(i in 所有可能情况) {
    if(i还未进行搜索) {
      标记i已搜索
      dfs()
      还原现场（标记i未搜索）
    }
  }
}
```

以[LeetCode Q46 Permutations](https://leetcode.com/problems/permutations/description/)例子为例，该题目要求输出一组数字的全排列：

```java
private void dfs(List<List<Integer>> ans, List<Integer> tmp, int[] nums, boolean[] visited, int cnt) {
    if (cnt == nums.length) {                       // 已遍历的数字个数 等于 所有数字的个数
        ans.add(new ArrayList<>(tmp));              // 保存当前解
        return;
    }

    for (int i = 0; i < nums.length; i++) {         // 遍历所有可能的情况
        if (!visited[i]) {                          // 该情况未被访问
            visited[i] = true;                      // 标记
            tmp.add(nums[i]);
            dfs(ans, tmp, nums, visited, cnt + 1);  // 递归
            tmp.remove(tmp.size() - 1);             // 还原
            visited[i] = false;
        }
    }
}
```

需要保存的状态有：ans（存储所有的排列）、tmp（到达当前位置遍历过的数字）、nums（数字数组）、visited（数字是否遍历过，防止在一条路径中相同数字遍历多次），cnt（当前遍历了多少数字了）。

依靠于递归的深搜大体结构是不会变化的。需要注意的点有：参数记录的状态、过滤掉不可能的状态、状态的保存和还原。

# 广度优先搜索

广度优先搜索简称bfs，也是通常所说的层级遍历。bfs适用于那些最小或最短问题的求解。核心思想是通过队列或优先队列保存状态，优先选择看似最优的状态进行扩展，已达到最先扩展到目标节点的目的。

```
bfs(){
  队列queue
  queue.add(初始状态);
  置初始状态访问
  while(!queue.empty()) {
    当前状态 cur = queue.poll();
    处理当前状态（符合条件记录或返回）

    for(cur的所有可能的下一个状态 --> next) {
      if(next没有被访问){
          queue.add(next);
          置next访问
      }
    }
  }
}

```

模板提供的是一种求解最近、最短解的思路。下面以[LeetCode Q102 Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/description/)为例。该题要求按层次输出树的节点，同一层次的节点放到一个List中。

```java
private class TreeNodeWrapper {
    TreeNode node;
    int level;

    TreeNodeWrapper(TreeNode node, int level) {
        this.node = node;
        this.level = level;
    }
}

public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> ans = new ArrayList<>();
    if (root == null) return ans;
    Queue<TreeNodeWrapper> queue = new LinkedList<>();
    queue.add(new TreeNodeWrapper(root, 0));  // 置初始访问状态
    List<Integer> levelNode = new ArrayList<>();
    while (queue.size() > 0) {
        // 处理当前节点
        TreeNodeWrapper treenode = queue.poll();
        if (treenode.level != ans.size()) {
            ans.add(levelNode);
            levelNode = new ArrayList<>();
        }
        levelNode.add(treenode.node.val);

        // 将当前节点的所有子节点添加到队列中
        if (treenode.node.left != null)
            queue.add(new TreeNodeWrapper(treenode.node.left, treenode.level + 1));
        if (treenode.node.right != null)
            queue.add(new TreeNodeWrapper(treenode.node.right, treenode.level + 1));
    }
    ans.add(levelNode);
    return ans;
}
```

bfs主要思路是对下一个状态的选取和状态的遍历，在遍历树的时候，节点会按照层次以此添加到队列中，在处理完一层之后，下一层也自然而然的添加到了队列中。

# 总结

深度优先搜索和广度优先搜索只是最基本的搜索方式，有句话说，通过搜索可以解决所有的问题。当然在一些解空间很大的问题上，搜索会耗费很多的时间来遍历所有的情况。

为了减少搜索遍历的不必要的路径，出现了很多剪枝或者叫变种方式，通过一些手段尽可能的减少解空间。这些留到以后再慢慢去了解吧。

终于，又水完了一篇博客，开心:joy:。。。