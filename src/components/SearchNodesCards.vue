<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="search"
          label="Pesquisar parente..."
          hint="Tente pesquisas como 'Neto'"
          prepend-inner-icon="mdi-magnify"
          rounded
          solo-inverted
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-data-iterator
      :items="nodes"
      :search="search"
      :items-per-page="10"
      hide-default-footer
      v-if="search"
    >
      <template v-slot:default="props">
        <v-row align="center" justify="center">
          <v-col v-for="item in props.items" :key="item.name" cols="12" sm="8">
            <v-card elevation="7">
              <v-card-title>
                <v-row>
                  <v-col cols="2">
                    <v-icon
                      large
                      color="primary"
                      v-if="isNodeSelected(item)"
                      @click="removeSelectedNode(item)"
                    >mdi-checkbox-marked-circle</v-icon>
                    <v-icon
                      large
                      color="primary"
                      v-else
                      @click="addSelectedNode(item)"
                    >mdi-checkbox-blank-circle-outline</v-icon>
                  </v-col>
                  <v-col cols="10">
                    <span>{{ item.name }}</span>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-actions>
                <v-row>
                  <v-col cols="6">
                    <v-btn color="primary" rounded text disabled>
                      <v-icon>mdi-star-outline</v-icon>
                      <span>Favorito</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn color="primary" rounded text @click="showNodeInTree(item)">
                      <v-icon>mdi-file-tree</v-icon>
                      <span>Árvore</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: null
  }),

  computed: {
    nodes() {
      const selectedFamilyId = this.$store.getters.selectedFamilyId;
      const treeLeaves = this.$store.getters.treeLeaves;

      return treeLeaves.filter(node => node.family_id == selectedFamilyId);
    },

    selectedNodes() {
      return this.$store.getters.selectedNodes;
    }
  },

  methods: {
    isNodeSelected(node) {
      if (this.selectedNodes.some(selectedNode => selectedNode.id == node.id)) {
        return true;
      } else {
        return false;
      }
    },

    removeSelectedNode(node) {
      const selectedNodesCopy = this.selectedNodes;
      const nodeIndex = selectedNodesCopy.findIndex(
        selectedNode => selectedNode.id == node.id
      );
      selectedNodesCopy.splice(nodeIndex, 1);

      this.$store.commit("setSelectedNodes", selectedNodesCopy);
    },

    addSelectedNode(node) {
      const selectedNodesCopy = this.selectedNodes;
      selectedNodesCopy.push(node);

      this.$store.commit("setSelectedNodes", selectedNodesCopy);
    },

    showNodeInTree(node) {
      this.$emit("treeClicked", node);
    }
  }
};
</script>