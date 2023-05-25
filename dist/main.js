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


/* window.bbst = BalancedBST;

// Testing Purposes Only
function randomArray() {
  const arr = [];
  const maxValue = 1000;
  for (let i = 0; i <= 35; i += 1) {
    arr.push(Math.floor(Math.random() * maxValue));
  }
  return arr;
}

window.myBst = BalancedBST(randomArray());
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
 */

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEMsMEJBQTBCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEMsMEJBQTBCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9iYWxhbmNlZEJTVC5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvY2xlYW5BcnJheS5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvbWVyZ2VTb3J0LmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWVyZ2VTb3J0IGZyb20gXCIuL21lcmdlU29ydFwiO1xuaW1wb3J0IGNsZWFuQXJyYXkgZnJvbSBcIi4vY2xlYW5BcnJheVwiO1xuXG5jb25zdCBOb2RlID0gKHZhbHVlID0gbnVsbCwgbGVmdCA9IG51bGwsIHJpZ2h0ID0gbnVsbCkgPT4ge1xuICBjb25zdCBuZXdOb2RlID0ge1xuICAgIHZhbHVlLFxuICAgIGxlZnQsXG4gICAgcmlnaHQsXG4gIH07XG4gIHJldHVybiBuZXdOb2RlO1xufTtcblxuY29uc3QgYnVpbGRUcmVlID0gKGFycmF5LCBzdGFydCwgZW5kKSA9PiB7XG4gIC8vIEJhc2UgY2FzZVxuICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xuICAvLyBTZXQgcm9vdCBub2RlIHRvIG1pZGRsZSBlbGVtZW50XG4gIGNvbnN0IG1pZCA9IE51bWJlci5wYXJzZUludCgoc3RhcnQgKyBlbmQpIC8gMiwgMTApO1xuICBjb25zdCByb290ID0gTm9kZShhcnJheVttaWRdKTtcbiAgLy8gU2V0IGxlZnQgbm9kZSByZWZcbiAgcm9vdC5sZWZ0ID0gYnVpbGRUcmVlKGFycmF5LCBzdGFydCwgbWlkIC0gMSk7XG4gIC8vIFNldCByaWdodCBub2RlIHJlZlxuICByb290LnJpZ2h0ID0gYnVpbGRUcmVlKGFycmF5LCBtaWQgKyAxLCBlbmQpO1xuICAvLyBGaW5hbGx5IHJldHVybiB0aGUgcm9vdCBub2RlXG4gIHJldHVybiByb290O1xufTtcblxuY29uc3QgYmluYXJ5U2VhcmNoID0gKHZhbHVlLCByb290LCBvcHRpb25zID0ge30sIHBhcmVudCA9IG51bGwpID0+IHtcbiAgLy8gUmV0dXJuIHVuZGVmaW5lZCBpZiBhIG5vbiBudW1iZXIgdmFsdWUgcGFzc2VkXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgfHwgTnVtYmVyLmlzTmFOKHZhbHVlKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgLy8gSWYgcm9vdCBpcyBpbnZhbGlkIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKCFyb290KSByZXR1cm4gdW5kZWZpbmVkO1xuICAvLyBCYXNlIGNhc2VcbiAgaWYgKHJvb3QudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgaWYgKG9wdGlvbnMucGFyZW50KSByZXR1cm4geyByb290LCBwYXJlbnQgfTtcbiAgICByZXR1cm4gcm9vdDtcbiAgfVxuICAvLyBBZGRpdGlvbmFsIGJhc2UgY2FzZSBsb2dpYyBmb3IgZmluZGluZyBpbnNlcnRpb24gcG9pbnRzXG4gIGlmIChvcHRpb25zLmluc2VydGlvbikge1xuICAgIC8vIEJhc2UgY2FzZSBmb3IgcmVzb2x2aW5nIHRvIHRoZSBsZWZ0XG4gICAgaWYgKHJvb3QudmFsdWUgPiB2YWx1ZSAmJiAhcm9vdC5sZWZ0KSB7XG4gICAgICBpZiAob3B0aW9ucy5wYXJlbnQpIHJldHVybiB7IHJvb3QsIHBhcmVudCB9O1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICAgIC8vIEJhc2UgY2FzZSBmb3IgcmVzb2x2aW5nIHRvIHRoZSByaWdodFxuICAgIGlmIChyb290LnZhbHVlIDwgdmFsdWUgJiYgIXJvb3QucmlnaHQpIHtcbiAgICAgIGlmIChvcHRpb25zLnBhcmVudCkgcmV0dXJuIHsgcm9vdCwgcGFyZW50IH07XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG4gIH1cblxuICAvLyBSZWN1cnNpdmUgY2FzZSBmb3IgbW92aW5nIGxlZnRcbiAgaWYgKHJvb3QudmFsdWUgPiB2YWx1ZSAmJiByb290LmxlZnQpIHtcbiAgICByZXR1cm4gYmluYXJ5U2VhcmNoKHZhbHVlLCByb290LmxlZnQsIG9wdGlvbnMsIHJvb3QpO1xuICB9XG4gIC8vIFJlY3Vyc2l2ZSBjYXNlIGZvciBtb3ZpbmcgcmlnaHRcbiAgaWYgKHJvb3QudmFsdWUgPCB2YWx1ZSAmJiByb290LnJpZ2h0KSB7XG4gICAgcmV0dXJuIGJpbmFyeVNlYXJjaCh2YWx1ZSwgcm9vdC5yaWdodCwgb3B0aW9ucywgcm9vdCk7XG4gIH1cblxuICAvLyBTb21lIG90aGVyIHRoaW5nIHdlbnQgd3Jvbmcgc28gcmV0dXJuIHVuZGVmaW5lZFxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgbmV4dEdyZWF0ZXJWYWx1ZSA9IChyb290KSA9PiB7XG4gIC8vIElmIHJvb3QgaXMgaW52YWxpZCBvciBkb2Vzbid0IGhhdmUgMiBjaGlsZHJlbiByZXR1cm4gdW5kZWZpbmVkXG4gIGlmICghcm9vdCB8fCAhKHJvb3QucmlnaHQgJiYgcm9vdC5sZWZ0KSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgLy8gTW92ZSB0byB0aGUgcmlnaHQgc3VidHJlZVxuICBsZXQgY3VycmVudE5vZGUgPSByb290LnJpZ2h0O1xuICAvLyBNb3ZlIHRvIHRoZSBsZWZ0IHVudGlsIG5leHQgaXMgbnVsbFxuICB3aGlsZSAoY3VycmVudE5vZGUubGVmdCkge1xuICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubGVmdDtcbiAgfVxuICAvLyBUaGF0IG5vZGUgaXMgdGhlIG5leHQgZ3JlYXRlciB2YWx1ZSBmcm9tIHRoZSBwcm92aWRlZCByb290XG4gIHJldHVybiBjdXJyZW50Tm9kZTtcbn07XG5cbi8vIENvcGllZCBmcm9tIGh0dHBzOi8vd3d3LnRoZW9kaW5wcm9qZWN0LmNvbS9sZXNzb25zL2phdmFzY3JpcHQtYmluYXJ5LXNlYXJjaC10cmVlc1xuY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgIHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XG4gIH1cbiAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUudmFsdWV9YCk7XG4gIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICBwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcbiAgfVxufTtcblxuY29uc3QgVHJlZSA9IChhcnJheSkgPT4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAvLyBDbGVhbiBhbmQgc29ydCB0aGUgYXJyYXlcbiAgY29uc3QgY2xlYW5lZEFycmF5ID0gY2xlYW5BcnJheShhcnJheSk7XG4gIGNvbnN0IHNvcnRlZEFycmF5ID0gbWVyZ2VTb3J0KGNsZWFuZWRBcnJheSk7XG4gIGNvbnN0IHVuaXF1ZVNvcnRlZEFycmF5ID0gWy4uLm5ldyBTZXQoc29ydGVkQXJyYXkpXTtcbiAgLy8gU2V0IHRoZSByb290IGFuZCBpdHMgdmFsdWVzIHdpdGggcmVjdXJzaXZlIGZ1bmN0aW9uXG4gIGxldCByb290ID0gYnVpbGRUcmVlKHVuaXF1ZVNvcnRlZEFycmF5LCAwLCB1bmlxdWVTb3J0ZWRBcnJheS5sZW5ndGggLSAxKTtcblxuICBjb25zdCBpbnNlcnQgPSAodmFsdWUpID0+IHtcbiAgICAvLyBGaW5kIHRoZSBpbnNlcnRpb24gcG9pbnQgaW5mb1xuICAgIGNvbnN0IGluc2VydGlvblBvaW50ID0gYmluYXJ5U2VhcmNoKHZhbHVlLCByb290LCB7IGluc2VydGlvbjogdHJ1ZSB9KTtcbiAgICAvLyBJZiBkYXRhIGFscmVhZHkgZXhpc3RzIHJldHVybiBmYWxzZVxuICAgIGlmIChpbnNlcnRpb25Qb2ludC52YWx1ZSA9PT0gdmFsdWUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBJZiBkYXRhIG9mIGluc2VydGlvbiBwb2ludCBpcyBudWxsLCBpdCBtdXN0IGJlIGEgbnVsbCByb290IHNvIGluc2VydCB0aGVyZVxuICAgIGlmIChpbnNlcnRpb25Qb2ludC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgaW5zZXJ0aW9uUG9pbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHJldHVybiBpbnNlcnRpb25Qb2ludDtcbiAgICB9XG4gICAgLy8gVmFsdWUgc2hvdWxkIGJlIHNldCB0byBsZWZ0IG9mIHJldHVybmVkIG5vZGVcbiAgICBpZiAoaW5zZXJ0aW9uUG9pbnQudmFsdWUgPiB2YWx1ZSkge1xuICAgICAgaW5zZXJ0aW9uUG9pbnQubGVmdCA9IE5vZGUodmFsdWUpO1xuICAgICAgcmV0dXJuIGluc2VydGlvblBvaW50LmxlZnQ7XG4gICAgfVxuICAgIC8vIE9yIHRvIHRoZSByaWdodFxuICAgIGlmIChpbnNlcnRpb25Qb2ludC52YWx1ZSA8IHZhbHVlKSB7XG4gICAgICBpbnNlcnRpb25Qb2ludC5yaWdodCA9IE5vZGUodmFsdWUpO1xuICAgICAgcmV0dXJuIGluc2VydGlvblBvaW50LnJpZ2h0O1xuICAgIH1cbiAgICAvLyBTb21lIG90aGVyIHRoaW5nIHdlbnQgd3Jvbmcgc28gcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlID0gKHZhbHVlKSA9PiB7XG4gICAgLy8gRmluZCBhbmQgc3RvcmUgbmV4dCBncmVhdGVyIGluIG9yZGVyIG5vZGUsIHN0b3JlIGl0J3MgY29udGVudHMgaW4gdGVtcCBub2RlXG4gICAgLy8gRGVsZXRlIHRoYXQgbmV4dCBncmVhdGVyIGluIG9yZGVyIG5vZGUgd2l0aCByZWN1cnNpdmUgY2FsbFxuICAgIC8vIFNldCB0aGUgXCJyZW1vdmVkXCIgbm9kZXMgdmFsdWVzIHRvIHRoZSB0ZW1wIG5vZGVcblxuICAgIC8vIEZpbmQgdGhlIG5vZGVcbiAgICBjb25zdCBub2RlVG9SZW1vdmUgPSBiaW5hcnlTZWFyY2godmFsdWUsIHJvb3QsIHsgcGFyZW50OiB0cnVlIH0pO1xuICAgIC8vIElmIG5vZGUgaXNuJ3QgZm91bmQgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBpZiAoIW5vZGVUb1JlbW92ZSB8fCBub2RlVG9SZW1vdmUucm9vdC52YWx1ZSAhPT0gdmFsdWUpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICAvLyBTZXQgdGhlIG5vZGVzIHBhcmVudCBub2RlXG4gICAgY29uc3QgeyBwYXJlbnQgfSA9IG5vZGVUb1JlbW92ZTtcblxuICAgIC8vIEhvdyBtYW55IGNoaWxkcmVuP1xuICAgIGxldCBjaGlsZCA9IG51bGw7XG4gICAgbGV0IGNoaWxkQ291bnQgPSBudWxsO1xuICAgIGlmICghbm9kZVRvUmVtb3ZlLnJvb3QubGVmdCAmJiAhbm9kZVRvUmVtb3ZlLnJvb3QucmlnaHQpIHtcbiAgICAgIGNoaWxkQ291bnQgPSAwO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoIW5vZGVUb1JlbW92ZS5yb290LmxlZnQgJiYgbm9kZVRvUmVtb3ZlLnJvb3QucmlnaHQpIHx8XG4gICAgICAobm9kZVRvUmVtb3ZlLnJvb3QubGVmdCAmJiAhbm9kZVRvUmVtb3ZlLnJvb3QucmlnaHQpXG4gICAgKSB7XG4gICAgICBjaGlsZENvdW50ID0gMTtcbiAgICB9IGVsc2UgaWYgKG5vZGVUb1JlbW92ZS5yb290LmxlZnQgJiYgbm9kZVRvUmVtb3ZlLnJvb3QucmlnaHQpIHtcbiAgICAgIGNoaWxkQ291bnQgPSAyO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgbm9kZSBiYXNlZCBvbiBjYXNlIG9mIGNoaWxkcmVuIGFuZCBpZiByb290XG4gICAgLy8gTm8gY2hpbGRyZW4gYW5kIGlzIHJvb3QgdGhlbiBzZXQgcm9vdCB2YWx1ZXMgdG8gbnVsbFxuICAgIGlmIChjaGlsZENvdW50ID09PSAwICYmICFwYXJlbnQpIHtcbiAgICAgIG5vZGVUb1JlbW92ZS5yb290LnZhbHVlID0gbnVsbDtcbiAgICAgIG5vZGVUb1JlbW92ZS5yb290LnJpZ2h0ID0gbnVsbDtcbiAgICAgIG5vZGVUb1JlbW92ZS5yb290LmxlZnQgPSBudWxsO1xuICAgICAgY29uc29sZS5sb2coYFJlbW92ZWQgcm9vdC5gKTtcbiAgICB9XG4gICAgLy8gTm8gY2hpbGRyZW4gYW5kIG5vdCByb290LCBqdXN0IGRlbGV0ZSByZWZlcmVuY2UgdG8gbGVhZlxuICAgIGlmIChjaGlsZENvdW50ID09PSAwICYmIHBhcmVudCkge1xuICAgICAgaWYgKHBhcmVudC5sZWZ0ID09PSBub2RlVG9SZW1vdmUucm9vdCkgcGFyZW50LmxlZnQgPSBudWxsO1xuICAgICAgZWxzZSBpZiAocGFyZW50LnJpZ2h0ID09PSBub2RlVG9SZW1vdmUucm9vdCkgcGFyZW50LnJpZ2h0ID0gbnVsbDtcbiAgICAgIGNvbnNvbGUubG9nKGBSZW1vdmVkOiAke25vZGVUb1JlbW92ZS5yb290LnZhbHVlfSBmcm9tICR7cGFyZW50LnZhbHVlfWApO1xuICAgIH1cbiAgICAvLyBKdXN0IG9uZSBjaGlsZCwgYnV0IG5vZGVUb1JlbW92ZSBpcyByb290XG4gICAgZWxzZSBpZiAoY2hpbGRDb3VudCA9PT0gMSAmJiAhcGFyZW50KSB7XG4gICAgICBjaGlsZCA9IG5vZGVUb1JlbW92ZS5yb290LmxlZnRcbiAgICAgICAgPyBub2RlVG9SZW1vdmUucm9vdC5sZWZ0XG4gICAgICAgIDogbm9kZVRvUmVtb3ZlLnJvb3QucmlnaHQ7XG4gICAgICBjb25zdCB0ZW1wTm9kZSA9IE5vZGUoY2hpbGQudmFsdWUpO1xuICAgICAgcmVtb3ZlKGNoaWxkLnZhbHVlKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgUmVtb3ZlZCByb290OiAke25vZGVUb1JlbW92ZS5yb290LnZhbHVlfSBhbmQgcmVwbGFjZWQgd2l0aDogJHt0ZW1wTm9kZS52YWx1ZX1gXG4gICAgICApO1xuICAgICAgbm9kZVRvUmVtb3ZlLnJvb3QudmFsdWUgPSB0ZW1wTm9kZS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSnVzdCBvbmUgY2hpbGQsIHJlcGxhY2UgcmVmZXJlbmNlIGluIHBhcmVudCBub2RlIHdpdGggY2hpbGQgbm9kZVxuICAgIGVsc2UgaWYgKGNoaWxkQ291bnQgPT09IDEgJiYgcGFyZW50KSB7XG4gICAgICBjaGlsZCA9IG5vZGVUb1JlbW92ZS5yb290LmxlZnRcbiAgICAgICAgPyBub2RlVG9SZW1vdmUucm9vdC5sZWZ0XG4gICAgICAgIDogbm9kZVRvUmVtb3ZlLnJvb3QucmlnaHQ7XG4gICAgICBpZiAocGFyZW50LmxlZnQgPT09IG5vZGVUb1JlbW92ZS5yb290KSB7XG4gICAgICAgIHBhcmVudC5sZWZ0ID0gY2hpbGQ7XG4gICAgICB9IGVsc2UgaWYgKHBhcmVudC5yaWdodCA9PT0gbm9kZVRvUmVtb3ZlLnJvb3QpIHtcbiAgICAgICAgcGFyZW50LnJpZ2h0ID0gY2hpbGQ7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFJlbW92ZWQ6ICR7bm9kZVRvUmVtb3ZlLnJvb3QudmFsdWV9IGZyb20gJHtwYXJlbnQudmFsdWV9IGFuZCBhdHRhdGNoZWQgJHtjaGlsZC52YWx1ZX1gXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBUd28gY2hpbGRyZW4gaXMgbW9yZSBjb21wbGljYXRlZFxuICAgIGVsc2UgaWYgKGNoaWxkQ291bnQgPT09IDIpIHtcbiAgICAgIC8vIEZpbmQgYW5kIHN0b3JlIG5leHQgZ3JlYXRlciBpbiBvcmRlciBub2RlLCBzdG9yZSBpdCdzIGNvbnRlbnRzIGluIHRlbXAgbm9kZVxuICAgICAgY29uc3QgbmV4dEdyZWF0ZXJOb2RlID0gbmV4dEdyZWF0ZXJWYWx1ZShub2RlVG9SZW1vdmUucm9vdCk7XG4gICAgICBjb25zdCB0ZW1wTm9kZSA9IE5vZGUoXG4gICAgICAgIG5leHRHcmVhdGVyTm9kZS52YWx1ZSxcbiAgICAgICAgbmV4dEdyZWF0ZXJOb2RlLmxlZnQsXG4gICAgICAgIG5leHRHcmVhdGVyTm9kZS5yaWdodFxuICAgICAgKTtcbiAgICAgIC8vIERlbGV0ZSB0aGF0IG5leHQgZ3JlYXRlciBpbiBvcmRlciBub2RlIHdpdGggcmVjdXJzaXZlIGNhbGxcbiAgICAgIHJlbW92ZShuZXh0R3JlYXRlck5vZGUudmFsdWUpO1xuICAgICAgLy8gU2V0IHRoZSBub2RlVG9SZW1vdmUncyB2YWx1ZSB0byB0aGUgdGVtcCBub2RlIHZhbHVlXG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFJlbW92ZWQ6ICR7bm9kZVRvUmVtb3ZlLnJvb3QudmFsdWV9IGFuZCByZXBsYWNlZCBpdCB3aXRoICR7dGVtcE5vZGUudmFsdWV9YFxuICAgICAgKTtcbiAgICAgIG5vZGVUb1JlbW92ZS5yb290LnZhbHVlID0gdGVtcE5vZGUudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBub2RlVG9SZW1vdmU7XG4gIH07XG5cbiAgY29uc3QgZmluZCA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IGZvdW5kTm9kZSA9IGJpbmFyeVNlYXJjaCh2YWx1ZSwgcm9vdCk7XG4gICAgaWYgKGZvdW5kTm9kZSkgcmV0dXJuIGZvdW5kTm9kZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgbGV2ZWxPcmRlciA9IChmbikgPT4ge1xuICAgIGlmICghcm9vdCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCB2YWxpZEZuID0gZm4gJiYgdHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgLy8gVHJhdmVyc2Ugbm9kZXNcbiAgICBjb25zdCBxID0gW3Jvb3RdO1xuICAgIGNvbnN0IHJldHVybkFycmF5ID0gW107XG4gICAgd2hpbGUgKHEubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHFbMF0ubGVmdCkgcS5wdXNoKHFbMF0ubGVmdCk7XG4gICAgICBpZiAocVswXS5yaWdodCkgcS5wdXNoKHFbMF0ucmlnaHQpO1xuICAgICAgaWYgKHZhbGlkRm4pIHtcbiAgICAgICAgZm4ocVswXS52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm5BcnJheS5wdXNoKHFbMF0udmFsdWUpO1xuICAgICAgfVxuICAgICAgcS5zaGlmdCgpO1xuICAgIH1cbiAgICBpZiAoIXZhbGlkRm4pIHJldHVybiByZXR1cm5BcnJheTtcbiAgICByZXR1cm4gZm47XG4gIH07XG5cbiAgLy8gSGVscGVyIG1ldGhvZHMgdXNlZCBmb3IgdHJhdmVyc2FsIGluIGRlcHRoIGZpcnN0XG4gIC8vIEluIG9yZGVyXG4gIGNvbnN0IGluT3JkZXJJbnRlcm5hbCA9IChmbiwgY3VycmVudE5vZGUsIHZhbGlkRm4sIHJldHVyblZhbHVlcykgPT4ge1xuICAgIC8vIEhhbmRsZSBub2RlJ3MgbGVmdCBjaGlsZFxuICAgIGlmIChjdXJyZW50Tm9kZS5sZWZ0KVxuICAgICAgaW5PcmRlckludGVybmFsKGZuLCBjdXJyZW50Tm9kZS5sZWZ0LCB2YWxpZEZuLCByZXR1cm5WYWx1ZXMpO1xuICAgIC8vIEhhbmRsZSBub2RlXG4gICAgaWYgKHZhbGlkRm4pIGZuKGN1cnJlbnROb2RlKTtcbiAgICBlbHNlIHJldHVyblZhbHVlcy5wdXNoKGN1cnJlbnROb2RlLnZhbHVlKTtcbiAgICAvLyBIYW5kbGUgbm9kZSdzIHJpZ2h0IGNoaWxkXG4gICAgaWYgKGN1cnJlbnROb2RlLnJpZ2h0KVxuICAgICAgaW5PcmRlckludGVybmFsKGZuLCBjdXJyZW50Tm9kZS5yaWdodCwgdmFsaWRGbiwgcmV0dXJuVmFsdWVzKTtcbiAgfTtcbiAgLy8gUHJlIE9yZGVyXG4gIGNvbnN0IHByZU9yZGVySW50ZXJuYWwgPSAoZm4sIGN1cnJlbnROb2RlLCB2YWxpZEZuLCByZXR1cm5WYWx1ZXMpID0+IHtcbiAgICAvLyBIYW5kbGUgbm9kZVxuICAgIGlmICh2YWxpZEZuKSBmbihjdXJyZW50Tm9kZSk7XG4gICAgZWxzZSByZXR1cm5WYWx1ZXMucHVzaChjdXJyZW50Tm9kZS52YWx1ZSk7XG4gICAgLy8gSGFuZGxlIG5vZGUncyBsZWZ0IGNoaWxkXG4gICAgaWYgKGN1cnJlbnROb2RlLmxlZnQpXG4gICAgICBwcmVPcmRlckludGVybmFsKGZuLCBjdXJyZW50Tm9kZS5sZWZ0LCB2YWxpZEZuLCByZXR1cm5WYWx1ZXMpO1xuICAgIC8vIEhhbmRsZSBub2RlJ3MgcmlnaHQgY2hpbGRcbiAgICBpZiAoY3VycmVudE5vZGUucmlnaHQpXG4gICAgICBwcmVPcmRlckludGVybmFsKGZuLCBjdXJyZW50Tm9kZS5yaWdodCwgdmFsaWRGbiwgcmV0dXJuVmFsdWVzKTtcbiAgfTtcbiAgLy8gUG9zdCBvcmRlclxuICBjb25zdCBwb3N0T3JkZXJJbnRlcm5hbCA9IChmbiwgY3VycmVudE5vZGUsIHZhbGlkRm4sIHJldHVyblZhbHVlcykgPT4ge1xuICAgIC8vIEhhbmRsZSBub2RlJ3MgbGVmdCBjaGlsZFxuICAgIGlmIChjdXJyZW50Tm9kZS5sZWZ0KVxuICAgICAgcG9zdE9yZGVySW50ZXJuYWwoZm4sIGN1cnJlbnROb2RlLmxlZnQsIHZhbGlkRm4sIHJldHVyblZhbHVlcyk7XG4gICAgLy8gSGFuZGxlIG5vZGUncyByaWdodCBjaGlsZFxuICAgIGlmIChjdXJyZW50Tm9kZS5yaWdodClcbiAgICAgIHBvc3RPcmRlckludGVybmFsKGZuLCBjdXJyZW50Tm9kZS5yaWdodCwgdmFsaWRGbiwgcmV0dXJuVmFsdWVzKTtcbiAgICAvLyBIYW5kbGUgbm9kZVxuICAgIGlmICh2YWxpZEZuKSBmbihjdXJyZW50Tm9kZSk7XG4gICAgZWxzZSByZXR1cm5WYWx1ZXMucHVzaChjdXJyZW50Tm9kZS52YWx1ZSk7XG4gIH07XG5cbiAgLy8gR2VuZXJpYyB0cmF2ZXJzYWwgZnVuY3Rpb24gZm9yIHZhbGlkYXRpb24gYW5kIG91dHB1dCBoYW5kbGluZ1xuICBjb25zdCB0cmF2ZXJzZSA9IChmbiwgdHJhdmVyc2FsRm4pID0+IHtcbiAgICAvLyBWYWxpZGF0aW9uXG4gICAgaWYgKCFyb290KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHZhbGlkRm4gPSB0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIjtcbiAgICAvLyBBcnJheSB0byBzdG9yZSByZXR1cm4gdmFsdWVzIGlmIG5vdCB2YWxpZEZuXG4gICAgY29uc3QgcmV0dXJuVmFsdWVzID0gW107XG4gICAgLy8gQ2FsbCBpbnRlcm5hbCB3aXRoIHZhbGlkIGZuXG4gICAgaWYgKHZhbGlkRm4pIHtcbiAgICAgIHRyYXZlcnNhbEZuKGZuLCByb290LCB2YWxpZEZuLCByZXR1cm5WYWx1ZXMpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gSWYgbm90IHZhbGlkIGZuIGNhbGwgaW50ZXJuYWwgYW5kIHJldHVybiB2YWx1ZXNcbiAgICB0cmF2ZXJzYWxGbihmbiwgcm9vdCwgdmFsaWRGbiwgcmV0dXJuVmFsdWVzKTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWVzO1xuICB9O1xuXG4gIC8vIEhpZ2ggbGV2ZWwgbWV0aG9kcyBmb3IgdHJhdmVyc2FsXG4gIGNvbnN0IGluT3JkZXIgPSAoZm4pID0+IHRyYXZlcnNlKGZuLCBpbk9yZGVySW50ZXJuYWwpO1xuICBjb25zdCBwcmVPcmRlciA9IChmbikgPT4gdHJhdmVyc2UoZm4sIHByZU9yZGVySW50ZXJuYWwpO1xuICBjb25zdCBwb3N0T3JkZXIgPSAoZm4pID0+IHRyYXZlcnNlKGZuLCBwb3N0T3JkZXJJbnRlcm5hbCk7XG5cbiAgLy8gR2V0IHRoZSBhY2N1cmF0ZSAwLWJhc2VkIGhlaWdodCBvZiB0aGUgdHJlZS5cbiAgY29uc3QgZ2V0SGVpZ2h0ID0gKGN1cnJlbnROb2RlID0gcm9vdCkgPT4ge1xuICAgIC8vIEJhc2UgY2FzZVxuICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgLy8gUmVjdXJzaXZlIGNhc2UgZm9yIGxlZnQgYW5kIHJpZ2h0IG5vZGVzXG4gICAgY29uc3QgbGVmdEhlaWdodCA9IGdldEhlaWdodChjdXJyZW50Tm9kZS5sZWZ0KTtcbiAgICBjb25zdCByaWdodEhlaWdodCA9IGdldEhlaWdodChjdXJyZW50Tm9kZS5yaWdodCk7XG4gICAgLy8gUmV0dXJuIHRoZSBpbmNyZW1lbnRlZCBoZWlnaHRcbiAgICByZXR1cm4gTWF0aC5tYXgobGVmdEhlaWdodCwgcmlnaHRIZWlnaHQpICsgMTtcbiAgfTtcblxuICAvLyBHZXQgdGhlIGRlcHRoIG9mIGEgZ2l2ZW4gbm9kZVxuICBjb25zdCBnZXREZXB0aEludGVybmFsID0gKGN1cnJlbnROb2RlLCB0YXJnZXROb2RlLCBkZXB0aCA9IDApID0+IHtcbiAgICAvLyBCYXNlIGNhc2UgaWYgY3VycmVudCBub2RlIGlzIG51bGxcbiAgICBpZiAoY3VycmVudE5vZGUgPT09IG51bGwpIHJldHVybiAtMTtcbiAgICAvLyBJZiBub2RlIGZvdW5kIHJldHVybiB0aGUgY3VycmVudCBkZXB0aFxuICAgIGlmIChjdXJyZW50Tm9kZS52YWx1ZSA9PT0gdGFyZ2V0Tm9kZS52YWx1ZSkgcmV0dXJuIGRlcHRoO1xuICAgIC8vIE90aGVyd2lzZSBrZWVwIHNlYXJjaGluZyBhbmQgaW5jcmVtZW50aW5nIGRlcHRoXG4gICAgY29uc3QgbGVmdERlcHRoID0gZ2V0RGVwdGhJbnRlcm5hbChjdXJyZW50Tm9kZS5sZWZ0LCB0YXJnZXROb2RlLCBkZXB0aCArIDEpO1xuICAgIGNvbnN0IHJpZ2h0RGVwdGggPSBnZXREZXB0aEludGVybmFsKFxuICAgICAgY3VycmVudE5vZGUucmlnaHQsXG4gICAgICB0YXJnZXROb2RlLFxuICAgICAgZGVwdGggKyAxXG4gICAgKTtcbiAgICAvLyBEZXB0aCBvbmx5IHJldHVybmVkIHdoZW4gdGFyZ2V0IGZvdW5kIGVsc2UgLTEgc28gdGhhdCBjYW4gYmUgdXNlZCB0byB2YWxpZGF0ZSB3aGVyZSB0YXJnZXQgdmFsdWUgaXMgZm91bmRcbiAgICBpZiAobGVmdERlcHRoICE9PSAtMSkgcmV0dXJuIGxlZnREZXB0aDtcbiAgICBpZiAocmlnaHREZXB0aCAhPT0gLTEpIHJldHVybiByaWdodERlcHRoO1xuICAgIC8vIElmIHRhcmdldCBub2RlIG5vdCBpbiBjdXJyZW50IHN1YnRyZWUgcmV0dXJuIC0xXG4gICAgcmV0dXJuIC0xO1xuICB9O1xuICAvLyBIaWdoIGxldmVsIG1ldGhvZCB0aGF0IGRvZXNuJ3QgZXhwb3NlIGN1cnJlbnROb2RlIG9yIGRlcHRoIHBhcmFtcyB0byB1c2Vyc1xuICBjb25zdCBnZXREZXB0aCA9IChub2RlKSA9PiBnZXREZXB0aEludGVybmFsKHJvb3QsIG5vZGUpO1xuXG4gIGNvbnN0IGlzQmFsYW5jZWRJbnRlcm5hbCA9IChjdXJyZW50Tm9kZSkgPT4ge1xuICAgIC8vIEJhc2UgY2FzZSBpZiByb290IGlzIGVtcHR5LCB3aGljaCBpcyBiYWxhbmNlZFxuICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgLy8gR2V0IGhlaWdodCBvZiBsZWZ0IGFuZCByaWdodCBzdWJ0cmVlc1xuICAgIGNvbnN0IGxlZnRIZWlnaHQgPSBnZXRIZWlnaHQoY3VycmVudE5vZGUubGVmdCk7XG4gICAgY29uc3QgcmlnaHRIZWlnaHQgPSBnZXRIZWlnaHQoY3VycmVudE5vZGUucmlnaHQpO1xuICAgIC8vIENoZWNrIGhlaWdodCBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIHN1YnRyZWVzXG4gICAgaWYgKE1hdGguYWJzKGxlZnRIZWlnaHQgLSByaWdodEhlaWdodCkgPiAxKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gQWxzbyBjaGVjayB0aGF0IGJvdGggc3VidHJlZXMgdGhlbXNlbHZlcyBhcmUgYmFsYW5jZWRcbiAgICByZXR1cm4gKFxuICAgICAgaXNCYWxhbmNlZEludGVybmFsKGN1cnJlbnROb2RlLmxlZnQpICYmXG4gICAgICBpc0JhbGFuY2VkSW50ZXJuYWwoY3VycmVudE5vZGUucmlnaHQpXG4gICAgKTtcbiAgfTtcbiAgLy8gSGlnaCBsZXZlbCBtZXRob2QgdGhhdCBkb2Vzbid0IGV4cG9zZSBjdXJyZW50Tm9kZSB0byB1c2Vyc1xuICBjb25zdCBpc0JhbGFuY2VkID0gKCkgPT4gaXNCYWxhbmNlZEludGVybmFsKHJvb3QpO1xuXG4gIGNvbnN0IHJlYmFsYW5jZSA9ICgpID0+IHtcbiAgICBpZiAoaXNCYWxhbmNlZCgpKSByZXR1cm4gcm9vdDtcbiAgICBjb25zdCBpbk9yZGVyVmFsdWVzID0gaW5PcmRlcigpO1xuICAgIHJvb3QgPSBidWlsZFRyZWUoaW5PcmRlclZhbHVlcywgMCwgaW5PcmRlclZhbHVlcy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gcm9vdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIGJhc2Ugcm9vdCBhbmQgdHJlZSBtZXRob2RzXG4gIHJldHVybiB7XG4gICAgZ2V0IHJvb3QoKSB7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9LFxuICAgIHByZXR0eVByaW50OiAoKSA9PiBwcmV0dHlQcmludChyb290KSxcbiAgICBpbnNlcnQsXG4gICAgcmVtb3ZlLFxuICAgIGZpbmQsXG4gICAgbGV2ZWxPcmRlcixcbiAgICBpbk9yZGVyLFxuICAgIHByZU9yZGVyLFxuICAgIHBvc3RPcmRlcixcbiAgICBnZXRIZWlnaHQsXG4gICAgZ2V0RGVwdGgsXG4gICAgaXNCYWxhbmNlZCxcbiAgICByZWJhbGFuY2UsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUcmVlO1xuIiwiY29uc3QgY2xlYW5BcnJheSA9IChhcnJheSkgPT4ge1xuICBjb25zdCBjbGVhbmVkQXJyYXkgPSBbXTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkgcmV0dXJuIGNsZWFuZWRBcnJheTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh0eXBlb2YgYXJyYXlbaV0gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNsZWFuZWRBcnJheS5wdXNoKGFycmF5W2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsZWFuZWRBcnJheTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFuQXJyYXk7XG4iLCJjb25zdCBtZXJnZSA9IChsZWZ0LCByaWdodCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgd2hpbGUgKGxlZnQubGVuZ3RoID4gMCAmJiByaWdodC5sZW5ndGggPiAwKSB7XG4gICAgaWYgKGxlZnRbMF0gPD0gcmlnaHRbMF0pIHtcbiAgICAgIHJlc3VsdC5wdXNoKGxlZnQuc2hpZnQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuICAgIH1cbiAgfVxuICB3aGlsZSAobGVmdC5sZW5ndGggPiAwKSB7XG4gICAgcmVzdWx0LnB1c2gobGVmdC5zaGlmdCgpKTtcbiAgfVxuICB3aGlsZSAocmlnaHQubGVuZ3RoID4gMCkge1xuICAgIHJlc3VsdC5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBtZXJnZVNvcnRJbnRzID0gKGxpc3QpID0+IHtcbiAgLy8gQmFzZSBjYXNlXG4gIGlmIChsaXN0Lmxlbmd0aCA8PSAxKSByZXR1cm4gbGlzdDtcblxuICAvLyBSZWN1cnNpdmUgY2FzZVxuICBsZXQgbGVmdCA9IFtdO1xuICBsZXQgcmlnaHQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoaSA8IGxpc3QubGVuZ3RoIC8gMikge1xuICAgICAgbGVmdC5wdXNoKGxpc3RbaV0pO1xuICAgIH0gZWxzZSByaWdodC5wdXNoKGxpc3RbaV0pO1xuICB9XG4gIGxlZnQgPSBtZXJnZVNvcnRJbnRzKGxlZnQpO1xuICByaWdodCA9IG1lcmdlU29ydEludHMocmlnaHQpO1xuXG4gIHJldHVybiBtZXJnZShsZWZ0LCByaWdodCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZVNvcnRJbnRzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQmFsYW5jZWRCU1QgZnJvbSBcIi4vYmFsYW5jZWRCU1RcIjtcblxuLyogd2luZG93LmJic3QgPSBCYWxhbmNlZEJTVDtcblxuLy8gVGVzdGluZyBQdXJwb3NlcyBPbmx5XG5mdW5jdGlvbiByYW5kb21BcnJheSgpIHtcbiAgY29uc3QgYXJyID0gW107XG4gIGNvbnN0IG1heFZhbHVlID0gMTAwMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMzU7IGkgKz0gMSkge1xuICAgIGFyci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxud2luZG93Lm15QnN0ID0gQmFsYW5jZWRCU1QocmFuZG9tQXJyYXkoKSk7XG53aW5kb3cubXlCc3QucHJldHR5UHJpbnQoKTtcbmNvbnNvbGUubG9nKGBCaW5hcnkgc2VhcmNoIHRyZWUgYmFsYW5jZWQ/ID0gJHt3aW5kb3cubXlCc3QuaXNCYWxhbmNlZCgpfWApO1xuY29uc29sZS5sb2coYEJyZWFkdGgtZmlyc3Qgb3JkZXI6IGApO1xuY29uc29sZS5sb2cod2luZG93Lm15QnN0LmxldmVsT3JkZXIoKSk7XG5jb25zb2xlLmxvZyhgSW4tb3JkZXI6IGApO1xuY29uc29sZS5sb2cod2luZG93Lm15QnN0LmluT3JkZXIoKSk7XG5jb25zb2xlLmxvZyhgUHJlLW9yZGVyOiBgKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5teUJzdC5wcmVPcmRlcigpKTtcbmNvbnNvbGUubG9nKGBQb3N0LW9yZGVyOiBgKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5teUJzdC5wb3N0T3JkZXIoKSk7XG5cbmNvbnN0IG5ld1ZhbHMgPSByYW5kb21BcnJheSgpO1xuY29uc29sZS5sb2coYEFkZGluZyBuZXcgdmFsdWVzOmApO1xuY29uc29sZS5sb2cobmV3VmFscyk7XG5uZXdWYWxzLmZvckVhY2goKHZhbCkgPT4ge1xuICB3aW5kb3cubXlCc3QuaW5zZXJ0KHZhbCk7XG59KTtcbmNvbnNvbGUubG9nKGBOZXcgdHJlZSBzdHJ1Y3R1cmU6YCk7XG53aW5kb3cubXlCc3QucHJldHR5UHJpbnQoKTtcblxuY29uc29sZS5sb2coYFJlYmFsYW5jaW5nIHRyZWUuLi4gTmV3IGJhbGFuY2VkIHRyZWUgc3RydWN0dXJlOmApO1xud2luZG93Lm15QnN0LnJlYmFsYW5jZSgpO1xud2luZG93Lm15QnN0LnByZXR0eVByaW50KCk7XG5cbmNvbnNvbGUubG9nKGBCaW5hcnkgc2VhcmNoIHRyZWUgYmFsYW5jZWQ/ID0gJHt3aW5kb3cubXlCc3QuaXNCYWxhbmNlZCgpfWApO1xuY29uc29sZS5sb2coYEJyZWFkdGgtZmlyc3Qgb3JkZXI6IGApO1xuY29uc29sZS5sb2cod2luZG93Lm15QnN0LmxldmVsT3JkZXIoKSk7XG5jb25zb2xlLmxvZyhgSW4tb3JkZXI6IGApO1xuY29uc29sZS5sb2cod2luZG93Lm15QnN0LmluT3JkZXIoKSk7XG5jb25zb2xlLmxvZyhgUHJlLW9yZGVyOiBgKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5teUJzdC5wcmVPcmRlcigpKTtcbmNvbnNvbGUubG9nKGBQb3N0LW9yZGVyOiBgKTtcbmNvbnNvbGUubG9nKHdpbmRvdy5teUJzdC5wb3N0T3JkZXIoKSk7XG4gKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==