
# Balanced Binary Search Tree

This repository is for a JavaScript module for a balanced binary search tree. The module provides various functionalities for manipulating and managing a balanced binary search tree, including insertion, removal, searching, traversal, height calculation, depth retrieval, balance checking, and rebalancing.

Created while following [The Odin Project](https://www.theodinproject.com/).
## Usage/Examples

```javascript
import Tree from "./Tree";

// Create a new tree
const tree = Tree([5, 3, 7, 1, 4, 6, 8]);

// Insert a value into the tree
tree.insert(2);

// Remove a value from the tree
tree.remove(4);

// Find a value in the tree
const node = tree.find(6);
console.log(node); // { value: 6, left: null, right: null }

// Perform a level-order traversal
const levelOrder = tree.levelOrder();
console.log(levelOrder); // [5, 3, 7, 1, 6, 8, 2]

// Get the height of the tree
const height = tree.getHeight();
console.log(height); // 3

// Get the depth of a node in the tree
const depth = tree.getDepth(node);
console.log(depth); // 2

// Check if the tree is balanced
const isBalanced = tree.isBalanced();
console.log(isBalanced); // true

// Rebalance the tree if necessary
tree.rebalance();

// Perform other operations on the tree as needed
```


## Methods
The following methods are available in the balanced binary search tree module:

- insert(value): Inserts a value into the tree.
- remove(value): Removes a value from the tree.
- find(value): Finds a value in the tree and returns the corresponding node.
- levelOrder(callback): Performs a level-order traversal on the tree, invoking the optional callback function for each node.
- inOrder(callback): Performs an in-order traversal on the tree, invoking the optional callback function for each node.
- preOrder(callback): Performs a pre-order traversal on the tree, invoking the optional callback function for each node.
- postOrder(callback): Performs a post-order traversal on the tree, invoking the optional callback function for each node.
- getHeight(): Returns the height of the tree.
- getDepth(node): Returns the depth of a specified node in the tree.
- isBalanced(): Checks if the tree is balanced.
- rebalance(): Rebalances the tree if necessary.
- prettyPrint(): Prints a visual representation of the tree.
Note: The callback parameter in traversal methods is an optional function that will be called with each visited
