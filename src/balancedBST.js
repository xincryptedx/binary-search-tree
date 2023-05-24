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
    const insertionPoint = binarySearch(value, root, { insertion: true });
    // If data already exists return false
    if (insertionPoint.value === value) return false;
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

    // Remove the node based on case of children
    // No children, just delete reference to leaf
    if (childCount === 0) {
      if (parent.left === nodeToRemove.root) parent.left = null;
      else if (parent.right === nodeToRemove.root) parent.right = null;
      console.log(`Removed: ${nodeToRemove.root.value} from ${parent.value}`);
    }
    // Just one child, replace reference in parent node with child node
    else if (childCount === 1) {
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

  // Return the base root and tree methods
  return {
    get root() {
      return root;
    },
    prettyPrint: () => prettyPrint(root),
    insert,
    remove,
  };
};

export default Tree;
