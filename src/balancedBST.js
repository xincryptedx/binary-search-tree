import mergeSort from "./mergeSort";

const Node = (value = null, left = null, right = null) => {
  const newNode = {
    value,
    left,
    right,
  };
  return newNode;
};

const buildTree = (array) => {
  const sortedArray = mergeSort(array);
  console.log(sortedArray);
  const uniqueSortedArray = [...new Set(sortedArray)];
  console.log(uniqueSortedArray);
  // Set root node to middle element
  // Build tree with right array and set to right
  // Same with left
  // Finally return the root node
  if (uniqueSortedArray) return uniqueSortedArray;
  return "no";
};

const Tree = (array) => {
  if (!Array.isArray(array)) return undefined;
  const root = buildTree(array);
  return {
    get root() {
      return root;
    },
  };
};

export default Tree;
