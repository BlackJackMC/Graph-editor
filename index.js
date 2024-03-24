let tree = new SegmentTree((1 << 31 | 1), Math.max);
tree.assign([1, 5, 2, 6, 8, 4, 2], true);
tree.build();

function transformNode(node) {
    if (!node) return;
    const children = [node.left, node.right].filter(n => n).map(transformNode).filter(n => n);
    return {
        name: node.id,
        value: node.value,
        ...(children.length > 0 && { children })
    };
}

const treeClone = transformNode({ ...tree.head });
const root = d3.hierarchy(treeClone);
const treeLayout = d3.tree().size([500, 500]);
const treeData = treeLayout(root);

console.log(treeClone);
console.log(root);
console.log(root.descendants());


const svg = d3.select("svg#map");
const gTree = svg.append("g")
                 .attr("transform", "translate(50, 50)");

gTree.selectAll(".link")
     .data(treeData.links())
     .enter().append("path")
             .attr("stroke", "white")
             .attr("stroke-width", 3)
             .attr("fill", "transparent")
             .attr("class", "link")
             .attr("d", d3.linkVertical()
                          .x(d => d.x)
                          .y(d => d.y));

const gNode = gTree.selectAll(".node")
               .data(root.descendants())
               .enter().append("g")
                       .attr("class", "node")
                       .attr("transform", d => `translate(${d.x}, ${d.y})`);

gNode.append("circle")
     .attr("r", 20)
     .attr("stroke", "white")
     .attr("stroke-width", 3);

gNode.append("text")
     .attr("text-anchor", "middle")
     .attr("dominant-baseline", "middle")
     .attr("fill", "white")
     .text(d => d.data.value);