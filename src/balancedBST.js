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

const binarySearch = (value, root) => {
  // If root is invalid return undefined
  if (!root) return undefined;
  // Value already exists at root
  if (root.value === value) return root;

  // Base case for resolving to the left
  if (root.value > value && !root.left) {
    return root;
  }
  // Base case for resolving to the right
  if (root.value < value && !root.right) {
    return root;
  }

  // Recursive case for moving left
  if (root.value > value && root.left) {
    return binarySearch(value, root.left);
  }
  // Recursive case for moving right
  if (root.value < value && root.right) {
    return binarySearch(value, root.right);
  }

  // Some other thing went wrong so return undefined
  return undefined;
};

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
    // Return undefined if a non number value passed
    if (typeof value !== "number" || Number.isNaN(value)) return undefined;
    // Find the insertion point info
    const insertionPoint = binarySearch(value, root);
    // If return false, data already exists so return false
    if (insertionPoint === false) return false;
    // Value should be set to left of returned node
    if (insertionPoint.side === "left") {
      insertionPoint.root.left = Node(value);
      return insertionPoint.root.left;
    }
    // Or to the right
    if (insertionPoint.side === "right") {
      insertionPoint.root.right = Node(value);
      return insertionPoint.root.right;
    }
    // Some other thing went wrong so return undefined
    return undefined;
  };

  const remove = (value) => {
    // Find the node
    // How many children?
    // Case 0 children just remove reference in parent node
    // Case 1 child replace reference in parent node with child node
    // Case 2 children replace reference in parent node with the next biggest item (right subtree, far left)
  };

  // Return the base root and tree methods
  return {
    get root() {
      return root;
    },
    prettyPrint: () => prettyPrint(root),
    insert,
  };
};

export default Tree;
