const Node = (value = null, left = null, right = null) => {
  const newNode = {
    value,
    left,
    right,
  };
  return newNode;
};

const buildTree = (array) => {
  // Sort array and remove duplicates
  // Set root node to middle element
  // Build tree with right array and set to right
  // Same with left
  // Finally return the root node
  if (array) return "yes";
  return "no";
};

const Tree = (array) => {
  const root = buildTree(array);
  return {
    get root() {
      return root;
    },
  };
};

export default Tree;
