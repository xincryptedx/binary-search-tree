const Node = (value = null, left = null, right = null) => {
  const newNode = {
    value,
    left,
    right,
  };
  return newNode;
};

const buildTree = (array) => {};

const Tree = (array) => {
  const root = buildTree(array);
  return {
    get root() {
      return root;
    },
  };
};
