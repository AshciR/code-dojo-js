/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} node
 * @return {TreeNode}
 */
const invertTree = function (node) {
    if (!node) return node;
    let left = node.left;
    node.left = invertTree(node.right);
    node.right = invertTree(left);
    return node;

};

function TreeNode(val, left, right) {

    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)

    return this;
}

function buildTree() {

    return new TreeNode(
        2,
        new TreeNode(1, null, null),
        new TreeNode(3, null, null),
    );
}

const tree = buildTree();
invertTree(tree);