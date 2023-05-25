import mergeSort from "./mergeSort";
import cleanArray from "./cleanArray";

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
  const cleanedArray = cleanArray(array);
  const sortedArray = mergeSort(cleanedArray);
  const uniqueSortedArray = [...new Set(sortedArray)];
  // Set the root and its values with recursive function
  const root = buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1);

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
  const getHeightInternal = (currentNode = root) => {
    // Base case
    if (currentNode === null) return -1;
    // Recursive case for left and right nodes
    const leftHeight = getHeightInternal(currentNode.left);
    const rightHeight = getHeightInternal(currentNode.right);
    // Return the incremented height. Null nodes cancel out since they have value -1.
    return Math.max(leftHeight, rightHeight) + 1;
  };

  // High level method that doesn't expose currentNode to users
  const getHeight = () => getHeightInternal(root);

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
  };
};

export default Tree;
