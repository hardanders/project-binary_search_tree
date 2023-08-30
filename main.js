function driver(array = randArray(), origTree = null) {
    let tree;
    if (!(origTree === null)) tree = origTree;
    else tree = new Tree(array);

    tree.print();
    if (tree.isBalanced()) {
        console.log("Tree is balanced");
    } else {
        console.log("Tree is unbalanced - stopping");
        return;
    };

    console.log("-----Testing Order Functions-----")
    console.log(`Level Order: ${tree.levelOrder()}`);
    console.log(`Pre Order: ${tree.preOrder()}`);
    console.log(`Post Order: ${tree.postOrder()}`);
    console.log(`In Order: ${tree.inOrder()}`);
    console.log("---------------------------------");

    console.log("Unbalancing with additional nodes...");
    for (let i=0; i<5; i++) {
        tree.insert(Math.ceil((Math.random() * (500-100)) + 100));
    };
    tree.print();
    console.log(`Is tree balanced?: ${tree.isBalanced()}`)
    if (tree.isBalanced()) {
        return "It's balanced? Something broke";
    } else {
        console.log("Balancing...");
        tree.rebalance();
        console.log(tree.array);
    }

    console.log(tree);
    
    console.log("---------------------------------");
    tree.print();
    if (tree.isBalanced()) {
        console.log("Tree is balanced");
    } else {
        console.log("Tree is unbalanced - stopping");
        return;
    };

    console.log("-----Testing Order Functions-----")
    console.log(`Level Order: ${tree.levelOrder()}`);
    console.log(`Pre Order: ${tree.preOrder()}`);
    console.log(`Post Order: ${tree.postOrder()}`);
    console.log(`In Order: ${tree.inOrder()}`);
    console.log("---------------------------------");
    
    return tree;
};

function randArray() {
    let array = [];
    for (let i=0; i<10; i++) {
        let num = Math.ceil(Math.random() * 100);
        array.push(num);
    };
    return array;
}