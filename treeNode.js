class Node {
    constructor(value = undefined, id = 1) {
        this.value = value;
        this.id = id;
        this.left = null;
        this.right = null;
    }

    add_child() {
        if (!this.left) {
            this.left = new Node(undefined, 2 * this.id);
        }
        if (!this.right) {
            this.right = new Node(undefined, 2 * this.id + 1);
        }
    }
}