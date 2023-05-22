const cleanArray = (array) => {
  const cleanedArray = [];
  if (!Array.isArray(array)) return cleanedArray;
  for (let i = 0; i < array.length; i += 1) {
    if (typeof array[i] === "number") {
      cleanedArray.push(array[i]);
    }
  }
  return cleanedArray;
};

export default cleanArray;
