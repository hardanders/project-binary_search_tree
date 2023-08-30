class Tree {
    constructor(array) {
        this.array = this.sortArray(array) || null;
        this.root = this.buildTree() || null;
        this.print = () => {
            this.prettyPrint();
        };
    };

    sortArray(array = this.array) {
        const sorted = [...new Set(array)].sort((a, b) => a - b);
        return sorted;
      }

    buildTree(array = this.array) {
        // Set start/mid/end points
        let start = 0;
        let end = array.length - 1;
        let mid = Math.floor((start+end)/2);

        // Base Case
        if (start > end) return null;
        
        // Fill in root data
        let data = new Node(array[mid]);

        // Recursively fill left/right trees
        data.left = this.buildTree(array.slice(0,mid));
        data.right = this.buildTree(array.slice(mid+1));

        // Return root node
        return data;
    };

    insert(value, key = this.root) {
        // Base case
        if (key === null) {
            this.array.push(value);
            return key = new Node(value);
        };

        // Recursively insert value
        if (value > key.data) key.right = this.insert(value, key.right);
        else if (value < key.data) key.left = this.insert(value, key.left);

        // Return node to insert
        return key;
    };

    remove(value, key = this.root) {
        if (key === null) return key;

        // Recursively find value in tree
        if (value > key.data) {
            key.right = this.remove(value, key.right);
            return key;
        } else if (value < key.data) {
            key.left = this.remove(value, key.left);
            return key;
        };

        // Single child exists
        if (key.left === null) return key.right;
        else if (key.right === null) return key.left;

        // Both children exist
        else {
            let base = key;
            let trail = key.right;

            // Find the next largest value on trailing side
            while (!(trail.left === null)) {
                base = trail;
                trail = base.left;
            };

            // Set trailing children as base-case children
            if (!(base === key)) base.left = trail.right;
            else base.right = trail.right;

            // Set trailing data as base-case data
            key.data = trail.data;

            // Return base-case node
            return key;
        };
    };

    find(value, key = this.root) {
        // Base case
        if (key === null) return "Value not found";

        // Recursively find value
        if (value > key.data) return this.find(value, key.right);
        else if (value < key.data) return this.find(value, key.left);

        // Return node containing value
        return key;
    };

    levelOrder(func = null) {
        // Initialize variables
        let queue = [];
        let tempArray = [];
        let key = this.root;

        // While loop to iterate through nodes
        while (tempArray.length < this.getNodeCount()) {
            tempArray.push(key);
            if (!(key.left === null)) queue.push(key.left);
            if (!(key.right === null)) queue.push(key.right);
            key = queue.shift();
        };

        // Process returned array through provided function...
        if (!(func === null)) {
            tempArray.forEach((node) => {
                func(node);
            })
            return tempArray;
        // ... or return an array of values
        } else {
            let valueArray = [];
            tempArray.forEach((node) => {
                valueArray.push(node.data);
            });
            return valueArray;
        };
    };

    inOrder(func = null, key = this.root) {
        if (key === null) return;

        // Initialize empty array
        let tempArray = [];

        // Recursive calls to push nodes inOrder
        if (!(key.left === null)) tempArray.push(...this.inOrder(null, key.left));
        tempArray.push(key);
        if (!(key.right === null)) tempArray.push(...this.inOrder(null, key.right));
        

        // If all values are evaluated
        if (tempArray.length >= this.getNodeCount()) {
            // ...process returned array through provided function...
            if (func) {
                tempArray.forEach((node) => {
                    func(node);
                })
                return tempArray;
            // ... or return an array of values
            } else {
                let valueArray = [];
                tempArray.forEach((node) => {
                    valueArray.push(node.data);
                });
                return valueArray;
            };
        };

        // Base case return
        return tempArray;

    };

    preOrder(func = null, key = this.root) {
        // Initialize empty array
        let tempArray = [];

        // Recursive calls to push nodes preOrder
        tempArray.push(key);
        if (!(key.left === null)) tempArray.push(...this.preOrder(null, key.left));
        if (!(key.right === null)) tempArray.push(...this.preOrder(null, key.right));

        // If all values are evaluated...
        if (tempArray.length >= this.getNodeCount()) {
            // ...process returned array through provided function...
            if (func) {
                tempArray.forEach((node) => {
                    func(node);
                })
                return tempArray;
            // ... or return an array of values
            } else {
                let valueArray = [];
                tempArray.forEach((node) => {
                    valueArray.push(node.data);
                });
                return valueArray;
            };
        };
        // Base case return
        return tempArray;
    };

    postOrder(func = null, key = this.root) {
        // Initialize empty array
        let tempArray = [];

        // Recursive calls to push nodes postOrder
        if (!(key.left === null)) tempArray.push(...this.postOrder(null, key.left));
        if (!(key.right === null)) tempArray.push(...this.postOrder(null, key.right));
        tempArray.push(key);

        // If all values are evaluated...
        if (tempArray.length >= this.getNodeCount()) {
            // ...process returned array through provided function...
            if (func) {
                tempArray.forEach((node) => {
                    func(node);
                })
                return tempArray;
            // ... or return an array of values
            } else {
                let valueArray = [];
                tempArray.forEach((node) => {
                    valueArray.push(node.data);
                });
                return valueArray;
            };
        };
        // Base case return
        return tempArray;        
    };

    height(key = this.root) {
        // Base case
        if (key === null) return 0;

        // Traverse left/right subtrees
        let left = this.height(key.left);
        let right = this.height(key.right);

        // Add and return height of the tree
        if (left > right) return left + 1;
        else return right + 1;
    };

    depth(node, key = this.root, depth = 0) {
        // Base case
        if (node === null || key === null) return 0;

        // Traverse relevant subtree
        if (node.data > key.data) {
            return this.depth(node, key.right, depth += 1);
        } else if (node.data < key.data) {
            return this.depth(node, key.left, depth += 1);
        };

        // Return depth
        return `Depth: ${depth + 1}`;
    };

    isBalanced() {
        // Get left height
        let leftHeight = this.height(this.root.left);
        // Get right height
        let rightHeight = this.height(this.root.right);
        // Get variance
        let v = Math.abs(leftHeight - rightHeight);
        // Result
        if (v < 2) return true;
        else return false;
    };

    rebalance(tree = this) {
        // Update the array to include all nodes
        tree.array = tree.inOrder();
        // Rebuild the tree
        tree.root = tree.buildTree();
        // Return rebuilt tree
        return tree;     
    };

    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };

    getNodeCount(key = this.root) {
        // Base case
        if (key === null) return 0;

        // Get left count and add to counter
        counter += this.getNodeCount(key.left);
        // Get right count and add to counter
        counter += this.getNodeCount(key.right);
        // Return value + 1 (root)
        return counter + 1;
    };
};