import BalancedBST from "./balancedBST";

window.bbst = BalancedBST;

// Testing Purposes Only
/* function randomArray() {
  const arr = [];
  const maxValue = 1000;
  for (let i = 0; i <= 35; i += 1) {
    arr.push(Math.floor(Math.random() * maxValue));
  }
  return arr;
}

window.myBst = BalancedBST(randomArray());
window.myBst.prettyPrint();
console.log(`Binary search tree balanced? = ${window.myBst.isBalanced()}`);
console.log(`Breadth-first order: `);
console.log(window.myBst.levelOrder());
console.log(`In-order: `);
console.log(window.myBst.inOrder());
console.log(`Pre-order: `);
console.log(window.myBst.preOrder());
console.log(`Post-order: `);
console.log(window.myBst.postOrder());

const newVals = randomArray();
console.log(`Adding new values:`);
console.log(newVals);
newVals.forEach((val) => {
  window.myBst.insert(val);
});
console.log(`New tree structure:`);
window.myBst.prettyPrint();

console.log(`Rebalancing tree... New balanced tree structure:`);
window.myBst.rebalance();
window.myBst.prettyPrint();

console.log(`Binary search tree balanced? = ${window.myBst.isBalanced()}`);
console.log(`Breadth-first order: `);
console.log(window.myBst.levelOrder());
console.log(`In-order: `);
console.log(window.myBst.inOrder());
console.log(`Pre-order: `);
console.log(window.myBst.preOrder());
console.log(`Post-order: `);
console.log(window.myBst.postOrder());
 */
