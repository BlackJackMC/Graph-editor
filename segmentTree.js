class SegmentTree {
    constructor(INVALID, merge) {
        this.head = new Node();
        this.init(INVALID, merge);
    }

    init(INVALID, merge) {
        this.INVALID = INVALID;
        this.merge = merge;
        this.isInit = true;
    }

    assign(input, is0Indexed = false) {
        if (is0Indexed) {
            input.unshift(0);
        }
        this.temp = input;
        this.l = 1;
        this.r = input.length - is0Indexed;
    }

    __build(l, r, curr) {
        if (l == r) {
            curr.value = this.temp[l];
        } else {
            let mid = (l + r) >> 1;
            curr.add_child();
            this.__build(l, mid, curr.left);
            this.__build(mid + 1, r, curr.right);

            curr.value = this.merge(curr.left.value, curr.right.value);
        }
    }

    __get(u, v, l, r, curr) {
        if (u <= l && r <= v) {
            return curr.value;
        } else if (r < u || l > v) {
            return this.INVALID;
        } else {
            let mid = (l + r) >> 1;
            curr.add_child();
            return this.merge(this.__get(u, v, l, mid, curr.left), this.__get(u, v, mid + 1, r, curr.right));
        }
    }

    __update(newValue, u, v, l, r, curr) {
        if (u <= l && r <= v) {
            curr.value = newValue;
        } else if (r < u || l > v) {
            return;
        } else {
            let mid = (l + r) >> 1;
            curr.add_child();
            this.__update(newValue, u, v, l, mid, curr.left);
            this.__update(newValue, u, v, mid + 1, r, curr.right);

            curr.value = this.merge(curr.left.value, curr.right.value);
        }
    }

    build() {
        if (this.isInit) {
            this.__build(this.l, this.r, this.head);
            this.isBuild = true;
        } else {
            throw new Error("Segment tree is not initialized");
        }
    }

    get(l, r) {
        if (!this.isBuild) {
            this.__build(this.l, this.r, this.head);
        }
        return this.__get(l, r, this.l, this.r, this.head);
    }

    update(newValue, l, r) {
        this.__update(newValue, l, r, this.l, this.r, this.head);
    }
}
