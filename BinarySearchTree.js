"use strict";

// import { traverse } from "babel-core";

// const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const binarySearchTreeExample = {
  value: 5,
  left: {
    value: 2,
    left: {
      value: 1,
      left: null,
      right: null,
    },
    right: {
      value: 3,
      left: null,
      right: {
        value: 4,
        left: null,
        right: null,
      },
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: {
        value: 9,
        left: null,
        right: null,
      },
    },
  },
};

function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(arr = []) {
  let set = new Set(arr);
  let sortedArr = Array.from(set).sort((a, b) => a - b);
  let root = buildTree(sortedArr);

  const insert = (value) => {
    if (!value || root.data === value) return;
    // if (value < root.data && root.left === null) root.left = value;
    // else if (value > root.data && root.right === null) root.right = value;
    // if (value < root.data) insert(value, root.left);
    // else if (value > root.data) insert(value, root.right);
    if (value < root.data) {
      if (root.left === null) root.left = value;
      else insert(value, root.left);
    } else if (value > root.data) {
      if (root.right === null) root.right = value;
      else insert(value, root.right);
    }
  };

  const remove = (value, root = root) => {
    if (root.data === null) return null;
    else if (value < root.data) {
      root.left = remove(value, root.left);
      return root;
    } else if (value > root.data) {
      root.right = remove(value, root.right);
      return root;
    } else if (value === root.data) {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;
      else {
        root.right = lift(root.right, root);
        return root;
      }
    }
    const lift = (node, nodeToRemove) => {
      if (node.left) {
        node.left = lift(node.left, nodeToRemove);
        return node;
      } else {
        nodeToRemove.data = node.data;
        return node.right;
      }
    };
  };

  const find = (value, root = root) => {
    if (!root.data || value === root.data) return root;
    else if (value < root.data) return find(value, root.left);
    else if (value > root.data) return find(value, root.right);
  };

  return { root, insert, remove, find };
}

function buildTree(arr = [], start = 0, end = arr.length - 1) {
  if (start > end) return null;
  let mid = parseInt((start + end) / 2);
  let root = Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let node = Tree(a);
node.insert(10);
prettyPrint(node);
