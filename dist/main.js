/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/balancedBST.js":
/*!****************************!*\
  !*** ./src/balancedBST.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mergeSort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeSort */ "./src/mergeSort.js");
/* harmony import */ var _cleanArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cleanArray */ "./src/cleanArray.js");



const Node = (value = null, left = null, right = null) => {
  const newNode = {
    value,
    left,
    right,
  };
  return newNode;
};

const buildTree = (array, start, end) => {
  // Base case
  if (start > end) return null;
  // Set root node to middle element
  const mid = Number.parseInt((start + end) / 2, 10);
  const root = Node(array[mid]);
  // Set left node ref
  root.left = buildTree(array, start, mid - 1);
  // Set right node ref
  root.right = buildTree(array, mid + 1, end);
  // Finally return the root node
  return root;
};

const binarySearch = (value, root, options = {}, parent = null) => {
  // Return undefined if a non number value passed
  if (typeof value !== "number" || Number.isNaN(value)) return undefined;
  // If root is invalid return undefined
  if (!root) return undefined;
  // Base case
  if (root.value === value) {
    if (options.parent) return { root, parent };
    return root;
  }
  // Additional base case logic for finding insertion points
  if (options.insertion) {
    // Base case for resolving to the left
    if (root.value > value && !root.left) {
      if (options.parent) return { root, parent };
      return root;
    }
    // Base case for resolving to the right
    if (root.value < value && !root.right) {
      if (options.parent) return { root, parent };
      return root;
    }
  }

  // Recursive case for moving left
  if (root.value > value && root.left) {
    return binarySearch(value, root.left, options, root);
  }
  // Recursive case for moving right
  if (root.value < value && root.right) {
    return binarySearch(value, root.right, options, root);
  }

  // Some other thing went wrong so return undefined
  return undefined;
};

const nextGreaterValue = (root) => {
  // If root is invalid or doesn't have 2 children return undefined
  if (!root || !(root.right && root.left)) return undefined;
  // Move to the right subtree
  let currentNode = root.right;
  // Move to the left until next is null
  while (currentNode.left) {
    currentNode = currentNode.left;
  }
  // That node is the next greater value from the provided root
  return currentNode;
};

// Copied from https://www.theodinproject.com/lessons/javascript-binary-search-trees
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const Tree = (array) => {
  if (!Array.isArray(array)) return undefined;
  // Clean and sort the array
  const cleanedArray = (0,_cleanArray__WEBPACK_IMPORTED_MODULE_1__["default"])(array);
  const sortedArray = (0,_mergeSort__WEBPACK_IMPORTED_MODULE_0__["default"])(cleanedArray);
  const uniqueSortedArray = [...new Set(sortedArray)];
  // Set the root and its values with recursive function
  let root = buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1);

  const insert = (value) => {
    // Find the insertion point info
    const insertionPoint = binarySearch(value, root, { insertion: true });
    // If data already exists return false
    if (insertionPoint.value === value) return false;
    // If data of insertion point is null, it must be a null root so insert there
    if (insertionPoint.value === null) {
      insertionPoint.value = value;
      return insertionPoint;
    }
    // Value should be set to left of returned node
    if (insertionPoint.value > value) {
      insertionPoint.left = Node(value);
      return insertionPoint.left;
    }
    // Or to the right
    if (insertionPoint.value < value) {
      insertionPoint.right = Node(value);
      return insertionPoint.right;
    }
    // Some other thing went wrong so return undefined
    return undefined;
  };

  const remove = (value) => {
    // Find and store next greater in order node, store it's contents in temp node
    // Delete that next greater in order node with recursive call
    // Set the "removed" nodes values to the temp node

    // Find the node
    const nodeToRemove = binarySearch(value, root, { parent: true });
    // If node isn't found return undefined;
    if (!nodeToRemove || nodeToRemove.root.value !== value) return undefined;

    // Set the nodes parent node
    const { parent } = nodeToRemove;

    // How many children?
    let child = null;
    let childCount = null;
    if (!nodeToRemove.root.left && !nodeToRemove.root.right) {
      childCount = 0;
    } else if (
      (!nodeToRemove.root.left && nodeToRemove.root.right) ||
      (nodeToRemove.root.left && !nodeToRemove.root.right)
    ) {
      childCount = 1;
    } else if (nodeToRemove.root.left && nodeToRemove.root.right) {
      childCount = 2;
    }

    // Remove the node based on case of children and if root
    // No children and is root then set root values to null
    if (childCount === 0 && !parent) {
      nodeToRemove.root.value = null;
      nodeToRemove.root.right = null;
      nodeToRemove.root.left = null;
      console.log(`Removed root.`);
    }
    // No children and not root, just delete reference to leaf
    if (childCount === 0 && parent) {
      if (parent.left === nodeToRemove.root) parent.left = null;
      else if (parent.right === nodeToRemove.root) parent.right = null;
      console.log(`Removed: ${nodeToRemove.root.value} from ${parent.value}`);
    }
    // Just one child, but nodeToRemove is root
    else if (childCount === 1 && !parent) {
      child = nodeToRemove.root.left
        ? nodeToRemove.root.left
        : nodeToRemove.root.right;
      const tempNode = Node(child.value);
      remove(child.value);
      console.log(
        `Removed root: ${nodeToRemove.root.value} and replaced with: ${tempNode.value}`
      );
      nodeToRemove.root.value = tempNode.value;
    }
    // Just one child, replace reference in parent node with child node
    else if (childCount === 1 && parent) {
      child = nodeToRemove.root.left
        ? nodeToRemove.root.left
        : nodeToRemove.root.right;
      if (parent.left === nodeToRemove.root) {
        parent.left = child;
      } else if (parent.right === nodeToRemove.root) {
        parent.right = child;
      }
      console.log(
        `Removed: ${nodeToRemove.root.value} from ${parent.value} and attatched ${child.value}`
      );
    }
    // Two children is more complicated
    else if (childCount === 2) {
      // Find and store next greater in order node, store it's contents in temp node
      const nextGreaterNode = nextGreaterValue(nodeToRemove.root);
      const tempNode = Node(
        nextGreaterNode.value,
        nextGreaterNode.left,
        nextGreaterNode.right
      );
      // Delete that next greater in order node with recursive call
      remove(nextGreaterNode.value);
      // Set the nodeToRemove's value to the temp node value
      console.log(
        `Removed: ${nodeToRemove.root.value} and replaced it with ${tempNode.value}`
      );
      nodeToRemove.root.value = tempNode.value;
    }
    return nodeToRemove;
  };

  const find = (value) => {
    const foundNode = binarySearch(value, root);
    if (foundNode) return foundNode;
    return false;
  };

  const levelOrder = (fn) => {
    if (!root) return undefined;
    const validFn = fn && typeof fn === "function";
    // Traverse nodes
    const q = [root];
    const returnArray = [];
    while (q.length > 0) {
      if (q[0].left) q.push(q[0].left);
      if (q[0].right) q.push(q[0].right);
      if (validFn) {
        fn(q[0].value);
      } else {
        returnArray.push(q[0].value);
      }
      q.shift();
    }
    if (!validFn) return returnArray;
    return fn;
  };

  // Helper methods used for traversal in depth first
  // In order
  const inOrderInternal = (fn, currentNode, validFn, returnValues) => {
    // Handle node's left child
    if (currentNode.left)
      inOrderInternal(fn, currentNode.left, validFn, returnValues);
    // Handle node
    if (validFn) fn(currentNode);
    else returnValues.push(currentNode.value);
    // Handle node's right child
    if (currentNode.right)
      inOrderInternal(fn, currentNode.right, validFn, returnValues);
  };
  // Pre Order
  const preOrderInternal = (fn, currentNode, validFn, returnValues) => {
    // Handle node
    if (validFn) fn(currentNode);
    else returnValues.push(currentNode.value);
    // Handle node's left child
    if (currentNode.left)
      preOrderInternal(fn, currentNode.left, validFn, returnValues);
    // Handle node's right child
    if (currentNode.right)
      preOrderInternal(fn, currentNode.right, validFn, returnValues);
  };
  // Post order
  const postOrderInternal = (fn, currentNode, validFn, returnValues) => {
    // Handle node's left child
    if (currentNode.left)
      postOrderInternal(fn, currentNode.left, validFn, returnValues);
    // Handle node's right child
    if (currentNode.right)
      postOrderInternal(fn, currentNode.right, validFn, returnValues);
    // Handle node
    if (validFn) fn(currentNode);
    else returnValues.push(currentNode.value);
  };

  // Generic traversal function for validation and output handling
  const traverse = (fn, traversalFn) => {
    // Validation
    if (!root) return undefined;
    const validFn = typeof fn === "function";
    // Array to store return values if not validFn
    const returnValues = [];
    // Call internal with valid fn
    if (validFn) {
      traversalFn(fn, root, validFn, returnValues);
      return undefined;
    }
    // If not valid fn call internal and return values
    traversalFn(fn, root, validFn, returnValues);
    return returnValues;
  };

  // High level methods for traversal
  const inOrder = (fn) => traverse(fn, inOrderInternal);
  const preOrder = (fn) => traverse(fn, preOrderInternal);
  const postOrder = (fn) => traverse(fn, postOrderInternal);

  // Get the accurate 0-based height of the tree.
  const getHeight = (currentNode = root) => {
    // Base case
    if (currentNode === null) return 0;
    // Recursive case for left and right nodes
    const leftHeight = getHeight(currentNode.left);
    const rightHeight = getHeight(currentNode.right);
    // Return the incremented height
    return Math.max(leftHeight, rightHeight) + 1;
  };

  // Get the depth of a given node
  const getDepthInternal = (currentNode, targetNode, depth = 0) => {
    // Base case if current node is null
    if (currentNode === null) return -1;
    // If node found return the current depth
    if (currentNode.value === targetNode.value) return depth;
    // Otherwise keep searching and incrementing depth
    const leftDepth = getDepthInternal(currentNode.left, targetNode, depth + 1);
    const rightDepth = getDepthInternal(
      currentNode.right,
      targetNode,
      depth + 1
    );
    // Depth only returned when target found else -1 so that can be used to validate where target value is found
    if (leftDepth !== -1) return leftDepth;
    if (rightDepth !== -1) return rightDepth;
    // If target node not in current subtree return -1
    return -1;
  };
  // High level method that doesn't expose currentNode or depth params to users
  const getDepth = (node) => getDepthInternal(root, node);

  const isBalancedInternal = (currentNode) => {
    // Base case if root is empty, which is balanced
    if (currentNode === null) return true;
    // Get height of left and right subtrees
    const leftHeight = getHeight(currentNode.left);
    const rightHeight = getHeight(currentNode.right);
    // Check height difference between two subtrees
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    // Also check that both subtrees themselves are balanced
    return (
      isBalancedInternal(currentNode.left) &&
      isBalancedInternal(currentNode.right)
    );
  };
  // High level method that doesn't expose currentNode to users
  const isBalanced = () => isBalancedInternal(root);

  const rebalance = () => {
    if (isBalanced()) return root;
    const inOrderValues = inOrder();
    root = buildTree(inOrderValues, 0, inOrderValues.length - 1);
    return root;
  };

  // Return the base root and tree methods
  return {
    get root() {
      return root;
    },
    prettyPrint: () => prettyPrint(root),
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    getHeight,
    getDepth,
    isBalanced,
    rebalance,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tree);


/***/ }),

/***/ "./src/cleanArray.js":
/*!***************************!*\
  !*** ./src/cleanArray.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const cleanArray = (array) => {
  const cleanedArray = [];
  if (!Array.isArray(array)) return cleanedArray;
  for (let i = 0; i < array.length; i += 1) {
    if (typeof array[i] === "number") {
      cleanedArray.push(array[i]);
    }
  }
  return cleanedArray;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cleanArray);


/***/ }),

/***/ "./src/mergeSort.js":
/*!**************************!*\
  !*** ./src/mergeSort.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const merge = (left, right) => {
  const result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length > 0) {
    result.push(left.shift());
  }
  while (right.length > 0) {
    result.push(right.shift());
  }
  return result;
};

const mergeSortInts = (list) => {
  // Base case
  if (list.length <= 1) return list;

  // Recursive case
  let left = [];
  let right = [];

  for (let i = 0; i < list.length; i += 1) {
    if (i < list.length / 2) {
      left.push(list[i]);
    } else right.push(list[i]);
  }
  left = mergeSortInts(left);
  right = mergeSortInts(right);

  return merge(left, right);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeSortInts);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _balancedBST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./balancedBST */ "./src/balancedBST.js");


window.bbst = _balancedBST__WEBPACK_IMPORTED_MODULE_0__["default"];

// Testing Purposes Only
function randomArray() {
  const arr = [];
  const maxValue = 1000;
  for (let i = 0; i <= 35; i += 1) {
    arr.push(Math.floor(Math.random() * maxValue));
  }
  return arr;
}

window.myBst = (0,_balancedBST__WEBPACK_IMPORTED_MODULE_0__["default"])(randomArray());
window.myBst.prettyPrint();
console.log(`Binary search tree balanced? = ${window.myBst.isBalanced()}`);
console.log(`Breadth-first order: `);
console.log(window.myBst.levelOrder());
console.log(`In-order: `);
console.log(window.myBst.inOrder());
console.log(`Pre-order: `);
console.log(window.myBst.preOrder());
console.log(`Post-order: `);
console.log(window.myBst.postOrder());

const newVals = randomArray();
console.log(`Adding new values:`);
console.log(newVals);
newVals.forEach((val) => {
  window.myBst.insert(val);
});
console.log(`New tree structure:`);
window.myBst.prettyPrint();

console.log(`Rebalancing tree... New balanced tree structure:`);
window.myBst.rebalance();
window.myBst.prettyPrint();

console.log(`Binary search tree balanced? = ${window.myBst.isBalanced()}`);
console.log(`Breadth-first order: `);
console.log(window.myBst.levelOrder());
console.log(`In-order: `);
console.log(window.myBst.inOrder());
console.log(`Pre-order: `);
console.log(window.myBst.preOrder());
console.log(`Post-order: `);
console.log(window.myBst.postOrder());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4QyxjQUFjLG9EQUFXOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsd0RBQVc7QUFDMUI7QUFDQSw4Q0FBOEMsMEJBQTBCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsMEJBQTBCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvYmFsYW5jZWRCU1QuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL2NsZWFuQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL21lcmdlU29ydC5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1lcmdlU29ydCBmcm9tIFwiLi9tZXJnZVNvcnRcIjtcbmltcG9ydCBjbGVhbkFycmF5IGZyb20gXCIuL2NsZWFuQXJyYXlcIjtcblxuY29uc3QgTm9kZSA9ICh2YWx1ZSA9IG51bGwsIGxlZnQgPSBudWxsLCByaWdodCA9IG51bGwpID0+IHtcbiAgY29uc3QgbmV3Tm9kZSA9IHtcbiAgICB2YWx1ZSxcbiAgICBsZWZ0LFxuICAgIHJpZ2h0LFxuICB9O1xuICByZXR1cm4gbmV3Tm9kZTtcbn07XG5cbmNvbnN0IGJ1aWxkVHJlZSA9IChhcnJheSwgc3RhcnQsIGVuZCkgPT4ge1xuICAvLyBCYXNlIGNhc2VcbiAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcbiAgLy8gU2V0IHJvb3Qgbm9kZSB0byBtaWRkbGUgZWxlbWVudFxuICBjb25zdCBtaWQgPSBOdW1iZXIucGFyc2VJbnQoKHN0YXJ0ICsgZW5kKSAvIDIsIDEwKTtcbiAgY29uc3Qgcm9vdCA9IE5vZGUoYXJyYXlbbWlkXSk7XG4gIC8vIFNldCBsZWZ0IG5vZGUgcmVmXG4gIHJvb3QubGVmdCA9IGJ1aWxkVHJlZShhcnJheSwgc3RhcnQsIG1pZCAtIDEpO1xuICAvLyBTZXQgcmlnaHQgbm9kZSByZWZcbiAgcm9vdC5yaWdodCA9IGJ1aWxkVHJlZShhcnJheSwgbWlkICsgMSwgZW5kKTtcbiAgLy8gRmluYWxseSByZXR1cm4gdGhlIHJvb3Qgbm9kZVxuICByZXR1cm4gcm9vdDtcbn07XG5cbmNvbnN0IGJpbmFyeVNlYXJjaCA9ICh2YWx1ZSwgcm9vdCwgb3B0aW9ucyA9IHt9LCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gIC8vIFJldHVybiB1bmRlZmluZWQgaWYgYSBub24gbnVtYmVyIHZhbHVlIHBhc3NlZFxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiIHx8IE51bWJlci5pc05hTih2YWx1ZSkpIHJldHVybiB1bmRlZmluZWQ7XG4gIC8vIElmIHJvb3QgaXMgaW52YWxpZCByZXR1cm4gdW5kZWZpbmVkXG4gIGlmICghcm9vdCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgLy8gQmFzZSBjYXNlXG4gIGlmIChyb290LnZhbHVlID09PSB2YWx1ZSkge1xuICAgIGlmIChvcHRpb25zLnBhcmVudCkgcmV0dXJuIHsgcm9vdCwgcGFyZW50IH07XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cbiAgLy8gQWRkaXRpb25hbCBiYXNlIGNhc2UgbG9naWMgZm9yIGZpbmRpbmcgaW5zZXJ0aW9uIHBvaW50c1xuICBpZiAob3B0aW9ucy5pbnNlcnRpb24pIHtcbiAgICAvLyBCYXNlIGNhc2UgZm9yIHJlc29sdmluZyB0byB0aGUgbGVmdFxuICAgIGlmIChyb290LnZhbHVlID4gdmFsdWUgJiYgIXJvb3QubGVmdCkge1xuICAgICAgaWYgKG9wdGlvbnMucGFyZW50KSByZXR1cm4geyByb290LCBwYXJlbnQgfTtcbiAgICAgIHJldHVybiByb290O1xuICAgIH1cbiAgICAvLyBCYXNlIGNhc2UgZm9yIHJlc29sdmluZyB0byB0aGUgcmlnaHRcbiAgICBpZiAocm9vdC52YWx1ZSA8IHZhbHVlICYmICFyb290LnJpZ2h0KSB7XG4gICAgICBpZiAob3B0aW9ucy5wYXJlbnQpIHJldHVybiB7IHJvb3QsIHBhcmVudCB9O1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVjdXJzaXZlIGNhc2UgZm9yIG1vdmluZyBsZWZ0XG4gIGlmIChyb290LnZhbHVlID4gdmFsdWUgJiYgcm9vdC5sZWZ0KSB7XG4gICAgcmV0dXJuIGJpbmFyeVNlYXJjaCh2YWx1ZSwgcm9vdC5sZWZ0LCBvcHRpb25zLCByb290KTtcbiAgfVxuICAvLyBSZWN1cnNpdmUgY2FzZSBmb3IgbW92aW5nIHJpZ2h0XG4gIGlmIChyb290LnZhbHVlIDwgdmFsdWUgJiYgcm9vdC5yaWdodCkge1xuICAgIHJldHVybiBiaW5hcnlTZWFyY2godmFsdWUsIHJvb3QucmlnaHQsIG9wdGlvbnMsIHJvb3QpO1xuICB9XG5cbiAgLy8gU29tZSBvdGhlciB0aGluZyB3ZW50IHdyb25nIHNvIHJldHVybiB1bmRlZmluZWRcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IG5leHRHcmVhdGVyVmFsdWUgPSAocm9vdCkgPT4ge1xuICAvLyBJZiByb290IGlzIGludmFsaWQgb3IgZG9lc24ndCBoYXZlIDIgY2hpbGRyZW4gcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoIXJvb3QgfHwgIShyb290LnJpZ2h0ICYmIHJvb3QubGVmdCkpIHJldHVybiB1bmRlZmluZWQ7XG4gIC8vIE1vdmUgdG8gdGhlIHJpZ2h0IHN1YnRyZWVcbiAgbGV0IGN1cnJlbnROb2RlID0gcm9vdC5yaWdodDtcbiAgLy8gTW92ZSB0byB0aGUgbGVmdCB1bnRpbCBuZXh0IGlzIG51bGxcbiAgd2hpbGUgKGN1cnJlbnROb2RlLmxlZnQpIHtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmxlZnQ7XG4gIH1cbiAgLy8gVGhhdCBub2RlIGlzIHRoZSBuZXh0IGdyZWF0ZXIgdmFsdWUgZnJvbSB0aGUgcHJvdmlkZWQgcm9vdFxuICByZXR1cm4gY3VycmVudE5vZGU7XG59O1xuXG4vLyBDb3BpZWQgZnJvbSBodHRwczovL3d3dy50aGVvZGlucHJvamVjdC5jb20vbGVzc29ucy9qYXZhc2NyaXB0LWJpbmFyeS1zZWFyY2gtdHJlZXNcbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcbiAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICBwcmV0dHlQcmludChub2RlLnJpZ2h0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xuICB9XG4gIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLnZhbHVlfWApO1xuICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCwgdHJ1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IFRyZWUgPSAoYXJyYXkpID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgLy8gQ2xlYW4gYW5kIHNvcnQgdGhlIGFycmF5XG4gIGNvbnN0IGNsZWFuZWRBcnJheSA9IGNsZWFuQXJyYXkoYXJyYXkpO1xuICBjb25zdCBzb3J0ZWRBcnJheSA9IG1lcmdlU29ydChjbGVhbmVkQXJyYXkpO1xuICBjb25zdCB1bmlxdWVTb3J0ZWRBcnJheSA9IFsuLi5uZXcgU2V0KHNvcnRlZEFycmF5KV07XG4gIC8vIFNldCB0aGUgcm9vdCBhbmQgaXRzIHZhbHVlcyB3aXRoIHJlY3Vyc2l2ZSBmdW5jdGlvblxuICBsZXQgcm9vdCA9IGJ1aWxkVHJlZSh1bmlxdWVTb3J0ZWRBcnJheSwgMCwgdW5pcXVlU29ydGVkQXJyYXkubGVuZ3RoIC0gMSk7XG5cbiAgY29uc3QgaW5zZXJ0ID0gKHZhbHVlKSA9PiB7XG4gICAgLy8gRmluZCB0aGUgaW5zZXJ0aW9uIHBvaW50IGluZm9cbiAgICBjb25zdCBpbnNlcnRpb25Qb2ludCA9IGJpbmFyeVNlYXJjaCh2YWx1ZSwgcm9vdCwgeyBpbnNlcnRpb246IHRydWUgfSk7XG4gICAgLy8gSWYgZGF0YSBhbHJlYWR5IGV4aXN0cyByZXR1cm4gZmFsc2VcbiAgICBpZiAoaW5zZXJ0aW9uUG9pbnQudmFsdWUgPT09IHZhbHVlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gSWYgZGF0YSBvZiBpbnNlcnRpb24gcG9pbnQgaXMgbnVsbCwgaXQgbXVzdCBiZSBhIG51bGwgcm9vdCBzbyBpbnNlcnQgdGhlcmVcbiAgICBpZiAoaW5zZXJ0aW9uUG9pbnQudmFsdWUgPT09IG51bGwpIHtcbiAgICAgIGluc2VydGlvblBvaW50LnZhbHVlID0gdmFsdWU7XG4gICAgICByZXR1cm4gaW5zZXJ0aW9uUG9pbnQ7XG4gICAgfVxuICAgIC8vIFZhbHVlIHNob3VsZCBiZSBzZXQgdG8gbGVmdCBvZiByZXR1cm5lZCBub2RlXG4gICAgaWYgKGluc2VydGlvblBvaW50LnZhbHVlID4gdmFsdWUpIHtcbiAgICAgIGluc2VydGlvblBvaW50LmxlZnQgPSBOb2RlKHZhbHVlKTtcbiAgICAgIHJldHVybiBpbnNlcnRpb25Qb2ludC5sZWZ0O1xuICAgIH1cbiAgICAvLyBPciB0byB0aGUgcmlnaHRcbiAgICBpZiAoaW5zZXJ0aW9uUG9pbnQudmFsdWUgPCB2YWx1ZSkge1xuICAgICAgaW5zZXJ0aW9uUG9pbnQucmlnaHQgPSBOb2RlKHZhbHVlKTtcbiAgICAgIHJldHVybiBpbnNlcnRpb25Qb2ludC5yaWdodDtcbiAgICB9XG4gICAgLy8gU29tZSBvdGhlciB0aGluZyB3ZW50IHdyb25nIHNvIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZSA9ICh2YWx1ZSkgPT4ge1xuICAgIC8vIEZpbmQgYW5kIHN0b3JlIG5leHQgZ3JlYXRlciBpbiBvcmRlciBub2RlLCBzdG9yZSBpdCdzIGNvbnRlbnRzIGluIHRlbXAgbm9kZVxuICAgIC8vIERlbGV0ZSB0aGF0IG5leHQgZ3JlYXRlciBpbiBvcmRlciBub2RlIHdpdGggcmVjdXJzaXZlIGNhbGxcbiAgICAvLyBTZXQgdGhlIFwicmVtb3ZlZFwiIG5vZGVzIHZhbHVlcyB0byB0aGUgdGVtcCBub2RlXG5cbiAgICAvLyBGaW5kIHRoZSBub2RlXG4gICAgY29uc3Qgbm9kZVRvUmVtb3ZlID0gYmluYXJ5U2VhcmNoKHZhbHVlLCByb290LCB7IHBhcmVudDogdHJ1ZSB9KTtcbiAgICAvLyBJZiBub2RlIGlzbid0IGZvdW5kIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKCFub2RlVG9SZW1vdmUgfHwgbm9kZVRvUmVtb3ZlLnJvb3QudmFsdWUgIT09IHZhbHVlKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgLy8gU2V0IHRoZSBub2RlcyBwYXJlbnQgbm9kZVxuICAgIGNvbnN0IHsgcGFyZW50IH0gPSBub2RlVG9SZW1vdmU7XG5cbiAgICAvLyBIb3cgbWFueSBjaGlsZHJlbj9cbiAgICBsZXQgY2hpbGQgPSBudWxsO1xuICAgIGxldCBjaGlsZENvdW50ID0gbnVsbDtcbiAgICBpZiAoIW5vZGVUb1JlbW92ZS5yb290LmxlZnQgJiYgIW5vZGVUb1JlbW92ZS5yb290LnJpZ2h0KSB7XG4gICAgICBjaGlsZENvdW50ID0gMDtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKCFub2RlVG9SZW1vdmUucm9vdC5sZWZ0ICYmIG5vZGVUb1JlbW92ZS5yb290LnJpZ2h0KSB8fFxuICAgICAgKG5vZGVUb1JlbW92ZS5yb290LmxlZnQgJiYgIW5vZGVUb1JlbW92ZS5yb290LnJpZ2h0KVxuICAgICkge1xuICAgICAgY2hpbGRDb3VudCA9IDE7XG4gICAgfSBlbHNlIGlmIChub2RlVG9SZW1vdmUucm9vdC5sZWZ0ICYmIG5vZGVUb1JlbW92ZS5yb290LnJpZ2h0KSB7XG4gICAgICBjaGlsZENvdW50ID0gMjtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIG5vZGUgYmFzZWQgb24gY2FzZSBvZiBjaGlsZHJlbiBhbmQgaWYgcm9vdFxuICAgIC8vIE5vIGNoaWxkcmVuIGFuZCBpcyByb290IHRoZW4gc2V0IHJvb3QgdmFsdWVzIHRvIG51bGxcbiAgICBpZiAoY2hpbGRDb3VudCA9PT0gMCAmJiAhcGFyZW50KSB7XG4gICAgICBub2RlVG9SZW1vdmUucm9vdC52YWx1ZSA9IG51bGw7XG4gICAgICBub2RlVG9SZW1vdmUucm9vdC5yaWdodCA9IG51bGw7XG4gICAgICBub2RlVG9SZW1vdmUucm9vdC5sZWZ0ID0gbnVsbDtcbiAgICAgIGNvbnNvbGUubG9nKGBSZW1vdmVkIHJvb3QuYCk7XG4gICAgfVxuICAgIC8vIE5vIGNoaWxkcmVuIGFuZCBub3Qgcm9vdCwganVzdCBkZWxldGUgcmVmZXJlbmNlIHRvIGxlYWZcbiAgICBpZiAoY2hpbGRDb3VudCA9PT0gMCAmJiBwYXJlbnQpIHtcbiAgICAgIGlmIChwYXJlbnQubGVmdCA9PT0gbm9kZVRvUmVtb3ZlLnJvb3QpIHBhcmVudC5sZWZ0ID0gbnVsbDtcbiAgICAgIGVsc2UgaWYgKHBhcmVudC5yaWdodCA9PT0gbm9kZVRvUmVtb3ZlLnJvb3QpIHBhcmVudC5yaWdodCA9IG51bGw7XG4gICAgICBjb25zb2xlLmxvZyhgUmVtb3ZlZDogJHtub2RlVG9SZW1vdmUucm9vdC52YWx1ZX0gZnJvbSAke3BhcmVudC52YWx1ZX1gKTtcbiAgICB9XG4gICAgLy8gSnVzdCBvbmUgY2hpbGQsIGJ1dCBub2RlVG9SZW1vdmUgaXMgcm9vdFxuICAgIGVsc2UgaWYgKGNoaWxkQ291bnQgPT09IDEgJiYgIXBhcmVudCkge1xuICAgICAgY2hpbGQgPSBub2RlVG9SZW1vdmUucm9vdC5sZWZ0XG4gICAgICAgID8gbm9kZVRvUmVtb3ZlLnJvb3QubGVmdFxuICAgICAgICA6IG5vZGVUb1JlbW92ZS5yb290LnJpZ2h0O1xuICAgICAgY29uc3QgdGVtcE5vZGUgPSBOb2RlKGNoaWxkLnZhbHVlKTtcbiAgICAgIHJlbW92ZShjaGlsZC52YWx1ZSk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFJlbW92ZWQgcm9vdDogJHtub2RlVG9SZW1vdmUucm9vdC52YWx1ZX0gYW5kIHJlcGxhY2VkIHdpdGg6ICR7dGVtcE5vZGUudmFsdWV9YFxuICAgICAgKTtcbiAgICAgIG5vZGVUb1JlbW92ZS5yb290LnZhbHVlID0gdGVtcE5vZGUudmFsdWU7XG4gICAgfVxuICAgIC8vIEp1c3Qgb25lIGNoaWxkLCByZXBsYWNlIHJlZmVyZW5jZSBpbiBwYXJlbnQgbm9kZSB3aXRoIGNoaWxkIG5vZGVcbiAgICBlbHNlIGlmIChjaGlsZENvdW50ID09PSAxICYmIHBhcmVudCkge1xuICAgICAgY2hpbGQgPSBub2RlVG9SZW1vdmUucm9vdC5sZWZ0XG4gICAgICAgID8gbm9kZVRvUmVtb3ZlLnJvb3QubGVmdFxuICAgICAgICA6IG5vZGVUb1JlbW92ZS5yb290LnJpZ2h0O1xuICAgICAgaWYgKHBhcmVudC5sZWZ0ID09PSBub2RlVG9SZW1vdmUucm9vdCkge1xuICAgICAgICBwYXJlbnQubGVmdCA9IGNoaWxkO1xuICAgICAgfSBlbHNlIGlmIChwYXJlbnQucmlnaHQgPT09IG5vZGVUb1JlbW92ZS5yb290KSB7XG4gICAgICAgIHBhcmVudC5yaWdodCA9IGNoaWxkO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBSZW1vdmVkOiAke25vZGVUb1JlbW92ZS5yb290LnZhbHVlfSBmcm9tICR7cGFyZW50LnZhbHVlfSBhbmQgYXR0YXRjaGVkICR7Y2hpbGQudmFsdWV9YFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gVHdvIGNoaWxkcmVuIGlzIG1vcmUgY29tcGxpY2F0ZWRcbiAgICBlbHNlIGlmIChjaGlsZENvdW50ID09PSAyKSB7XG4gICAgICAvLyBGaW5kIGFuZCBzdG9yZSBuZXh0IGdyZWF0ZXIgaW4gb3JkZXIgbm9kZSwgc3RvcmUgaXQncyBjb250ZW50cyBpbiB0ZW1wIG5vZGVcbiAgICAgIGNvbnN0IG5leHRHcmVhdGVyTm9kZSA9IG5leHRHcmVhdGVyVmFsdWUobm9kZVRvUmVtb3ZlLnJvb3QpO1xuICAgICAgY29uc3QgdGVtcE5vZGUgPSBOb2RlKFxuICAgICAgICBuZXh0R3JlYXRlck5vZGUudmFsdWUsXG4gICAgICAgIG5leHRHcmVhdGVyTm9kZS5sZWZ0LFxuICAgICAgICBuZXh0R3JlYXRlck5vZGUucmlnaHRcbiAgICAgICk7XG4gICAgICAvLyBEZWxldGUgdGhhdCBuZXh0IGdyZWF0ZXIgaW4gb3JkZXIgbm9kZSB3aXRoIHJlY3Vyc2l2ZSBjYWxsXG4gICAgICByZW1vdmUobmV4dEdyZWF0ZXJOb2RlLnZhbHVlKTtcbiAgICAgIC8vIFNldCB0aGUgbm9kZVRvUmVtb3ZlJ3MgdmFsdWUgdG8gdGhlIHRlbXAgbm9kZSB2YWx1ZVxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBSZW1vdmVkOiAke25vZGVUb1JlbW92ZS5yb290LnZhbHVlfSBhbmQgcmVwbGFjZWQgaXQgd2l0aCAke3RlbXBOb2RlLnZhbHVlfWBcbiAgICAgICk7XG4gICAgICBub2RlVG9SZW1vdmUucm9vdC52YWx1ZSA9IHRlbXBOb2RlLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZVRvUmVtb3ZlO1xuICB9O1xuXG4gIGNvbnN0IGZpbmQgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCBmb3VuZE5vZGUgPSBiaW5hcnlTZWFyY2godmFsdWUsIHJvb3QpO1xuICAgIGlmIChmb3VuZE5vZGUpIHJldHVybiBmb3VuZE5vZGU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGxldmVsT3JkZXIgPSAoZm4pID0+IHtcbiAgICBpZiAoIXJvb3QpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgdmFsaWRGbiA9IGZuICYmIHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiO1xuICAgIC8vIFRyYXZlcnNlIG5vZGVzXG4gICAgY29uc3QgcSA9IFtyb290XTtcbiAgICBjb25zdCByZXR1cm5BcnJheSA9IFtdO1xuICAgIHdoaWxlIChxLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChxWzBdLmxlZnQpIHEucHVzaChxWzBdLmxlZnQpO1xuICAgICAgaWYgKHFbMF0ucmlnaHQpIHEucHVzaChxWzBdLnJpZ2h0KTtcbiAgICAgIGlmICh2YWxpZEZuKSB7XG4gICAgICAgIGZuKHFbMF0udmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuQXJyYXkucHVzaChxWzBdLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHEuc2hpZnQoKTtcbiAgICB9XG4gICAgaWYgKCF2YWxpZEZuKSByZXR1cm4gcmV0dXJuQXJyYXk7XG4gICAgcmV0dXJuIGZuO1xuICB9O1xuXG4gIC8vIEhlbHBlciBtZXRob2RzIHVzZWQgZm9yIHRyYXZlcnNhbCBpbiBkZXB0aCBmaXJzdFxuICAvLyBJbiBvcmRlclxuICBjb25zdCBpbk9yZGVySW50ZXJuYWwgPSAoZm4sIGN1cnJlbnROb2RlLCB2YWxpZEZuLCByZXR1cm5WYWx1ZXMpID0+IHtcbiAgICAvLyBIYW5kbGUgbm9kZSdzIGxlZnQgY2hpbGRcbiAgICBpZiAoY3VycmVudE5vZGUubGVmdClcbiAgICAgIGluT3JkZXJJbnRlcm5hbChmbiwgY3VycmVudE5vZGUubGVmdCwgdmFsaWRGbiwgcmV0dXJuVmFsdWVzKTtcbiAgICAvLyBIYW5kbGUgbm9kZVxuICAgIGlmICh2YWxpZEZuKSBmbihjdXJyZW50Tm9kZSk7XG4gICAgZWxzZSByZXR1cm5WYWx1ZXMucHVzaChjdXJyZW50Tm9kZS52YWx1ZSk7XG4gICAgLy8gSGFuZGxlIG5vZGUncyByaWdodCBjaGlsZFxuICAgIGlmIChjdXJyZW50Tm9kZS5yaWdodClcbiAgICAgIGluT3JkZXJJbnRlcm5hbChmbiwgY3VycmVudE5vZGUucmlnaHQsIHZhbGlkRm4sIHJldHVyblZhbHVlcyk7XG4gIH07XG4gIC8vIFByZSBPcmRlclxuICBjb25zdCBwcmVPcmRlckludGVybmFsID0gKGZuLCBjdXJyZW50Tm9kZSwgdmFsaWRGbiwgcmV0dXJuVmFsdWVzKSA9PiB7XG4gICAgLy8gSGFuZGxlIG5vZGVcbiAgICBpZiAodmFsaWRGbikgZm4oY3VycmVudE5vZGUpO1xuICAgIGVsc2UgcmV0dXJuVmFsdWVzLnB1c2goY3VycmVudE5vZGUudmFsdWUpO1xuICAgIC8vIEhhbmRsZSBub2RlJ3MgbGVmdCBjaGlsZFxuICAgIGlmIChjdXJyZW50Tm9kZS5sZWZ0KVxuICAgICAgcHJlT3JkZXJJbnRlcm5hbChmbiwgY3VycmVudE5vZGUubGVmdCwgdmFsaWRGbiwgcmV0dXJuVmFsdWVzKTtcbiAgICAvLyBIYW5kbGUgbm9kZSdzIHJpZ2h0IGNoaWxkXG4gICAgaWYgKGN1cnJlbnROb2RlLnJpZ2h0KVxuICAgICAgcHJlT3JkZXJJbnRlcm5hbChmbiwgY3VycmVudE5vZGUucmlnaHQsIHZhbGlkRm4sIHJldHVyblZhbHVlcyk7XG4gIH07XG4gIC8vIFBvc3Qgb3JkZXJcbiAgY29uc3QgcG9zdE9yZGVySW50ZXJuYWwgPSAoZm4sIGN1cnJlbnROb2RlLCB2YWxpZEZuLCByZXR1cm5WYWx1ZXMpID0+IHtcbiAgICAvLyBIYW5kbGUgbm9kZSdzIGxlZnQgY2hpbGRcbiAgICBpZiAoY3VycmVudE5vZGUubGVmdClcbiAgICAgIHBvc3RPcmRlckludGVybmFsKGZuLCBjdXJyZW50Tm9kZS5sZWZ0LCB2YWxpZEZuLCByZXR1cm5WYWx1ZXMpO1xuICAgIC8vIEhhbmRsZSBub2RlJ3MgcmlnaHQgY2hpbGRcbiAgICBpZiAoY3VycmVudE5vZGUucmlnaHQpXG4gICAgICBwb3N0T3JkZXJJbnRlcm5hbChmbiwgY3VycmVudE5vZGUucmlnaHQsIHZhbGlkRm4sIHJldHVyblZhbHVlcyk7XG4gICAgLy8gSGFuZGxlIG5vZGVcbiAgICBpZiAodmFsaWRGbikgZm4oY3VycmVudE5vZGUpO1xuICAgIGVsc2UgcmV0dXJuVmFsdWVzLnB1c2goY3VycmVudE5vZGUudmFsdWUpO1xuICB9O1xuXG4gIC8vIEdlbmVyaWMgdHJhdmVyc2FsIGZ1bmN0aW9uIGZvciB2YWxpZGF0aW9uIGFuZCBvdXRwdXQgaGFuZGxpbmdcbiAgY29uc3QgdHJhdmVyc2UgPSAoZm4sIHRyYXZlcnNhbEZuKSA9PiB7XG4gICAgLy8gVmFsaWRhdGlvblxuICAgIGlmICghcm9vdCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCB2YWxpZEZuID0gdHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgLy8gQXJyYXkgdG8gc3RvcmUgcmV0dXJuIHZhbHVlcyBpZiBub3QgdmFsaWRGblxuICAgIGNvbnN0IHJldHVyblZhbHVlcyA9IFtdO1xuICAgIC8vIENhbGwgaW50ZXJuYWwgd2l0aCB2YWxpZCBmblxuICAgIGlmICh2YWxpZEZuKSB7XG4gICAgICB0cmF2ZXJzYWxGbihmbiwgcm9vdCwgdmFsaWRGbiwgcmV0dXJuVmFsdWVzKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIElmIG5vdCB2YWxpZCBmbiBjYWxsIGludGVybmFsIGFuZCByZXR1cm4gdmFsdWVzXG4gICAgdHJhdmVyc2FsRm4oZm4sIHJvb3QsIHZhbGlkRm4sIHJldHVyblZhbHVlcyk7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlcztcbiAgfTtcblxuICAvLyBIaWdoIGxldmVsIG1ldGhvZHMgZm9yIHRyYXZlcnNhbFxuICBjb25zdCBpbk9yZGVyID0gKGZuKSA9PiB0cmF2ZXJzZShmbiwgaW5PcmRlckludGVybmFsKTtcbiAgY29uc3QgcHJlT3JkZXIgPSAoZm4pID0+IHRyYXZlcnNlKGZuLCBwcmVPcmRlckludGVybmFsKTtcbiAgY29uc3QgcG9zdE9yZGVyID0gKGZuKSA9PiB0cmF2ZXJzZShmbiwgcG9zdE9yZGVySW50ZXJuYWwpO1xuXG4gIC8vIEdldCB0aGUgYWNjdXJhdGUgMC1iYXNlZCBoZWlnaHQgb2YgdGhlIHRyZWUuXG4gIGNvbnN0IGdldEhlaWdodCA9IChjdXJyZW50Tm9kZSA9IHJvb3QpID0+IHtcbiAgICAvLyBCYXNlIGNhc2VcbiAgICBpZiAoY3VycmVudE5vZGUgPT09IG51bGwpIHJldHVybiAwO1xuICAgIC8vIFJlY3Vyc2l2ZSBjYXNlIGZvciBsZWZ0IGFuZCByaWdodCBub2Rlc1xuICAgIGNvbnN0IGxlZnRIZWlnaHQgPSBnZXRIZWlnaHQoY3VycmVudE5vZGUubGVmdCk7XG4gICAgY29uc3QgcmlnaHRIZWlnaHQgPSBnZXRIZWlnaHQoY3VycmVudE5vZGUucmlnaHQpO1xuICAgIC8vIFJldHVybiB0aGUgaW5jcmVtZW50ZWQgaGVpZ2h0XG4gICAgcmV0dXJuIE1hdGgubWF4KGxlZnRIZWlnaHQsIHJpZ2h0SGVpZ2h0KSArIDE7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBkZXB0aCBvZiBhIGdpdmVuIG5vZGVcbiAgY29uc3QgZ2V0RGVwdGhJbnRlcm5hbCA9IChjdXJyZW50Tm9kZSwgdGFyZ2V0Tm9kZSwgZGVwdGggPSAwKSA9PiB7XG4gICAgLy8gQmFzZSBjYXNlIGlmIGN1cnJlbnQgbm9kZSBpcyBudWxsXG4gICAgaWYgKGN1cnJlbnROb2RlID09PSBudWxsKSByZXR1cm4gLTE7XG4gICAgLy8gSWYgbm9kZSBmb3VuZCByZXR1cm4gdGhlIGN1cnJlbnQgZGVwdGhcbiAgICBpZiAoY3VycmVudE5vZGUudmFsdWUgPT09IHRhcmdldE5vZGUudmFsdWUpIHJldHVybiBkZXB0aDtcbiAgICAvLyBPdGhlcndpc2Uga2VlcCBzZWFyY2hpbmcgYW5kIGluY3JlbWVudGluZyBkZXB0aFxuICAgIGNvbnN0IGxlZnREZXB0aCA9IGdldERlcHRoSW50ZXJuYWwoY3VycmVudE5vZGUubGVmdCwgdGFyZ2V0Tm9kZSwgZGVwdGggKyAxKTtcbiAgICBjb25zdCByaWdodERlcHRoID0gZ2V0RGVwdGhJbnRlcm5hbChcbiAgICAgIGN1cnJlbnROb2RlLnJpZ2h0LFxuICAgICAgdGFyZ2V0Tm9kZSxcbiAgICAgIGRlcHRoICsgMVxuICAgICk7XG4gICAgLy8gRGVwdGggb25seSByZXR1cm5lZCB3aGVuIHRhcmdldCBmb3VuZCBlbHNlIC0xIHNvIHRoYXQgY2FuIGJlIHVzZWQgdG8gdmFsaWRhdGUgd2hlcmUgdGFyZ2V0IHZhbHVlIGlzIGZvdW5kXG4gICAgaWYgKGxlZnREZXB0aCAhPT0gLTEpIHJldHVybiBsZWZ0RGVwdGg7XG4gICAgaWYgKHJpZ2h0RGVwdGggIT09IC0xKSByZXR1cm4gcmlnaHREZXB0aDtcbiAgICAvLyBJZiB0YXJnZXQgbm9kZSBub3QgaW4gY3VycmVudCBzdWJ0cmVlIHJldHVybiAtMVxuICAgIHJldHVybiAtMTtcbiAgfTtcbiAgLy8gSGlnaCBsZXZlbCBtZXRob2QgdGhhdCBkb2Vzbid0IGV4cG9zZSBjdXJyZW50Tm9kZSBvciBkZXB0aCBwYXJhbXMgdG8gdXNlcnNcbiAgY29uc3QgZ2V0RGVwdGggPSAobm9kZSkgPT4gZ2V0RGVwdGhJbnRlcm5hbChyb290LCBub2RlKTtcblxuICBjb25zdCBpc0JhbGFuY2VkSW50ZXJuYWwgPSAoY3VycmVudE5vZGUpID0+IHtcbiAgICAvLyBCYXNlIGNhc2UgaWYgcm9vdCBpcyBlbXB0eSwgd2hpY2ggaXMgYmFsYW5jZWRcbiAgICBpZiAoY3VycmVudE5vZGUgPT09IG51bGwpIHJldHVybiB0cnVlO1xuICAgIC8vIEdldCBoZWlnaHQgb2YgbGVmdCBhbmQgcmlnaHQgc3VidHJlZXNcbiAgICBjb25zdCBsZWZ0SGVpZ2h0ID0gZ2V0SGVpZ2h0KGN1cnJlbnROb2RlLmxlZnQpO1xuICAgIGNvbnN0IHJpZ2h0SGVpZ2h0ID0gZ2V0SGVpZ2h0KGN1cnJlbnROb2RlLnJpZ2h0KTtcbiAgICAvLyBDaGVjayBoZWlnaHQgZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBzdWJ0cmVlc1xuICAgIGlmIChNYXRoLmFicyhsZWZ0SGVpZ2h0IC0gcmlnaHRIZWlnaHQpID4gMSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIEFsc28gY2hlY2sgdGhhdCBib3RoIHN1YnRyZWVzIHRoZW1zZWx2ZXMgYXJlIGJhbGFuY2VkXG4gICAgcmV0dXJuIChcbiAgICAgIGlzQmFsYW5jZWRJbnRlcm5hbChjdXJyZW50Tm9kZS5sZWZ0KSAmJlxuICAgICAgaXNCYWxhbmNlZEludGVybmFsKGN1cnJlbnROb2RlLnJpZ2h0KVxuICAgICk7XG4gIH07XG4gIC8vIEhpZ2ggbGV2ZWwgbWV0aG9kIHRoYXQgZG9lc24ndCBleHBvc2UgY3VycmVudE5vZGUgdG8gdXNlcnNcbiAgY29uc3QgaXNCYWxhbmNlZCA9ICgpID0+IGlzQmFsYW5jZWRJbnRlcm5hbChyb290KTtcblxuICBjb25zdCByZWJhbGFuY2UgPSAoKSA9PiB7XG4gICAgaWYgKGlzQmFsYW5jZWQoKSkgcmV0dXJuIHJvb3Q7XG4gICAgY29uc3QgaW5PcmRlclZhbHVlcyA9IGluT3JkZXIoKTtcbiAgICByb290ID0gYnVpbGRUcmVlKGluT3JkZXJWYWx1ZXMsIDAsIGluT3JkZXJWYWx1ZXMubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBiYXNlIHJvb3QgYW5kIHRyZWUgbWV0aG9kc1xuICByZXR1cm4ge1xuICAgIGdldCByb290KCkge1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfSxcbiAgICBwcmV0dHlQcmludDogKCkgPT4gcHJldHR5UHJpbnQocm9vdCksXG4gICAgaW5zZXJ0LFxuICAgIHJlbW92ZSxcbiAgICBmaW5kLFxuICAgIGxldmVsT3JkZXIsXG4gICAgaW5PcmRlcixcbiAgICBwcmVPcmRlcixcbiAgICBwb3N0T3JkZXIsXG4gICAgZ2V0SGVpZ2h0LFxuICAgIGdldERlcHRoLFxuICAgIGlzQmFsYW5jZWQsXG4gICAgcmViYWxhbmNlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVHJlZTtcbiIsImNvbnN0IGNsZWFuQXJyYXkgPSAoYXJyYXkpID0+IHtcbiAgY29uc3QgY2xlYW5lZEFycmF5ID0gW107XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHJldHVybiBjbGVhbmVkQXJyYXk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodHlwZW9mIGFycmF5W2ldID09PSBcIm51bWJlclwiKSB7XG4gICAgICBjbGVhbmVkQXJyYXkucHVzaChhcnJheVtpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGVhbmVkQXJyYXk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGVhbkFycmF5O1xuIiwiY29uc3QgbWVyZ2UgPSAobGVmdCwgcmlnaHQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIHdoaWxlIChsZWZ0Lmxlbmd0aCA+IDAgJiYgcmlnaHQubGVuZ3RoID4gMCkge1xuICAgIGlmIChsZWZ0WzBdIDw9IHJpZ2h0WzBdKSB7XG4gICAgICByZXN1bHQucHVzaChsZWZ0LnNoaWZ0KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChyaWdodC5zaGlmdCgpKTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKGxlZnQubGVuZ3RoID4gMCkge1xuICAgIHJlc3VsdC5wdXNoKGxlZnQuc2hpZnQoKSk7XG4gIH1cbiAgd2hpbGUgKHJpZ2h0Lmxlbmd0aCA+IDApIHtcbiAgICByZXN1bHQucHVzaChyaWdodC5zaGlmdCgpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgbWVyZ2VTb3J0SW50cyA9IChsaXN0KSA9PiB7XG4gIC8vIEJhc2UgY2FzZVxuICBpZiAobGlzdC5sZW5ndGggPD0gMSkgcmV0dXJuIGxpc3Q7XG5cbiAgLy8gUmVjdXJzaXZlIGNhc2VcbiAgbGV0IGxlZnQgPSBbXTtcbiAgbGV0IHJpZ2h0ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGkgPCBsaXN0Lmxlbmd0aCAvIDIpIHtcbiAgICAgIGxlZnQucHVzaChsaXN0W2ldKTtcbiAgICB9IGVsc2UgcmlnaHQucHVzaChsaXN0W2ldKTtcbiAgfVxuICBsZWZ0ID0gbWVyZ2VTb3J0SW50cyhsZWZ0KTtcbiAgcmlnaHQgPSBtZXJnZVNvcnRJbnRzKHJpZ2h0KTtcblxuICByZXR1cm4gbWVyZ2UobGVmdCwgcmlnaHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2VTb3J0SW50cztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEJhbGFuY2VkQlNUIGZyb20gXCIuL2JhbGFuY2VkQlNUXCI7XG5cbndpbmRvdy5iYnN0ID0gQmFsYW5jZWRCU1Q7XG5cbi8vIFRlc3RpbmcgUHVycG9zZXMgT25seVxuZnVuY3Rpb24gcmFuZG9tQXJyYXkoKSB7XG4gIGNvbnN0IGFyciA9IFtdO1xuICBjb25zdCBtYXhWYWx1ZSA9IDEwMDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IDM1OyBpICs9IDEpIHtcbiAgICBhcnIucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhWYWx1ZSkpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbndpbmRvdy5teUJzdCA9IEJhbGFuY2VkQlNUKHJhbmRvbUFycmF5KCkpO1xud2luZG93Lm15QnN0LnByZXR0eVByaW50KCk7XG5jb25zb2xlLmxvZyhgQmluYXJ5IHNlYXJjaCB0cmVlIGJhbGFuY2VkPyA9ICR7d2luZG93Lm15QnN0LmlzQmFsYW5jZWQoKX1gKTtcbmNvbnNvbGUubG9nKGBCcmVhZHRoLWZpcnN0IG9yZGVyOiBgKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5teUJzdC5sZXZlbE9yZGVyKCkpO1xuY29uc29sZS5sb2coYEluLW9yZGVyOiBgKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5teUJzdC5pbk9yZGVyKCkpO1xuY29uc29sZS5sb2coYFByZS1vcmRlcjogYCk7XG5jb25zb2xlLmxvZyh3aW5kb3cubXlCc3QucHJlT3JkZXIoKSk7XG5jb25zb2xlLmxvZyhgUG9zdC1vcmRlcjogYCk7XG5jb25zb2xlLmxvZyh3aW5kb3cubXlCc3QucG9zdE9yZGVyKCkpO1xuXG5jb25zdCBuZXdWYWxzID0gcmFuZG9tQXJyYXkoKTtcbmNvbnNvbGUubG9nKGBBZGRpbmcgbmV3IHZhbHVlczpgKTtcbmNvbnNvbGUubG9nKG5ld1ZhbHMpO1xubmV3VmFscy5mb3JFYWNoKCh2YWwpID0+IHtcbiAgd2luZG93Lm15QnN0Lmluc2VydCh2YWwpO1xufSk7XG5jb25zb2xlLmxvZyhgTmV3IHRyZWUgc3RydWN0dXJlOmApO1xud2luZG93Lm15QnN0LnByZXR0eVByaW50KCk7XG5cbmNvbnNvbGUubG9nKGBSZWJhbGFuY2luZyB0cmVlLi4uIE5ldyBiYWxhbmNlZCB0cmVlIHN0cnVjdHVyZTpgKTtcbndpbmRvdy5teUJzdC5yZWJhbGFuY2UoKTtcbndpbmRvdy5teUJzdC5wcmV0dHlQcmludCgpO1xuXG5jb25zb2xlLmxvZyhgQmluYXJ5IHNlYXJjaCB0cmVlIGJhbGFuY2VkPyA9ICR7d2luZG93Lm15QnN0LmlzQmFsYW5jZWQoKX1gKTtcbmNvbnNvbGUubG9nKGBCcmVhZHRoLWZpcnN0IG9yZGVyOiBgKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5teUJzdC5sZXZlbE9yZGVyKCkpO1xuY29uc29sZS5sb2coYEluLW9yZGVyOiBgKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5teUJzdC5pbk9yZGVyKCkpO1xuY29uc29sZS5sb2coYFByZS1vcmRlcjogYCk7XG5jb25zb2xlLmxvZyh3aW5kb3cubXlCc3QucHJlT3JkZXIoKSk7XG5jb25zb2xlLmxvZyhgUG9zdC1vcmRlcjogYCk7XG5jb25zb2xlLmxvZyh3aW5kb3cubXlCc3QucG9zdE9yZGVyKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9