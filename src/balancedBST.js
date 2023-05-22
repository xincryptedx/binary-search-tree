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
  // Clean and sort the array
  const cleanedArray = cleanArray(array);
  const sortedArray = mergeSort(cleanedArray);
  const uniqueSortedArray = [...new Set(sortedArray)];

  // Base case
  if (start > end) return null;

  // Set root node to middle element

  // Build tree with right array and set to right
  // Same with left
  // Finally return the root node

  if (uniqueSortedArray) return uniqueSortedArray;
  return "no";
};

const Tree = (array) => {
  if (!Array.isArray(array)) return undefined;
  const root = buildTree(array, 0, array.length - 1);
  return {
    get root() {
      return root;
    },
  };
};

export default Tree;
