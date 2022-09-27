"use strict";

const { traverse } = require("babel-core");

const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

function Node(root, left = null, right = null) {
  return { root, left, right };
}

function Tree(arr = []) {
  let set = new Set(arr);
  let sortedArr = Array.from(set).sort((a, b) => a - b);

  const insert = (value) => {
    if (!value || tree.root === value) return;
    if (value < tree.root) insert(value);
  };

  return buildTree(sortedArr);
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
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let node = Tree(a);
prettyPrint(node);
