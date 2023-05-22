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
  const mid = (start + end) / 2;
  const root = Node(array[mid]);
  // Build tree with right array and set to right
  // Same with left
  // Finally return the root node

  return root;
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
  };
};

export default Tree;
