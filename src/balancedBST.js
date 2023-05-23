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

const insert = (value) => {
  // Find where to insert value
  // Start at root and compare values to move left or right
  // If reaches a null value then...
  // Handle case - value already exists
  // Handle case - inserting at "end" of branch
};

const Tree = (array) => {
  if (!Array.isArray(array)) return undefined;
  // Clean and sort the array
  const cleanedArray = cleanArray(array);
  const sortedArray = mergeSort(cleanedArray);
  const uniqueSortedArray = [...new Set(sortedArray)];
  // Set the root and its values with recursive function
  const root = buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1);

  // Return the base root of the whole tree and tree methods
  return {
    get root() {
      return root;
    },
    prettyPrint: () => prettyPrint(root),
    insert,
  };
};

export default Tree;
