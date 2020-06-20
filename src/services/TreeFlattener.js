export default {
    getTreeLeavesWithParentTags: function (treeNodes, treeLeaves = [], parentName = null) {
        treeNodes.forEach(node => {
            if (node.children.length > 0) {
                this.getTreeLeavesWithParentTags(node.children, treeLeaves, node.name);
            } else {
                node.tags = [parentName];
                treeLeaves.push(node);
            }
        });

        return treeLeaves;
    }
};