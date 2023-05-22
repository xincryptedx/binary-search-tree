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

export default mergeSortInts;
