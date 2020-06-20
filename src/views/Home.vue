<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedFamilyId"
          :items="families"
          item-text="name"
          item-value="id"
          label="Selecione uma família"
          solo
        ></v-select>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-tabs centered v-model="tab">
          <v-tab>Busca</v-tab>
          <v-tab-item>
            <v-row justify="center" align="center" no-gutters>
              <v-col cols="12">
                <search-nodes-cards :nodes="treeViewNodes" @treeClicked="showNodeInTree"></search-nodes-cards>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab @click="clearSearchedNodeInTree">Árvore de tópicos</v-tab>
          <v-tab-item>
            <v-row justify="center" no-gutters>
              <v-col cols="12" sm="6">
                <treeview
                  :nodes="treeViewNodes"
                  :searchedNode="searchedNodeInTree"
                  :openAll="openAllNodesInTree"
                ></treeview>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row justify="center" no-gutters>
      <v-col cols="12">
        <selected-nodes-btn :selectedNodes="selectedNodes"></selected-nodes-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Treeview from "../components/Treeview.vue";
import SearchNodesCards from "../components/SearchNodesCards.vue";
import SelectedNodesBtn from "../components/SelectedNodesBtn.vue";

export default {
  name: "Home",
  components: {
    Treeview,
    SearchNodesCards,
    SelectedNodesBtn
  },

  created() {
    this.$store.dispatch("getFamiliesNodesFromMockServer");
  },

  data: () => ({
    tab: null,
    searchedNodeInTree: null,
    openAllNodesInTree: false
  }),

  computed: {
    selectedFamilyId: {
      get: function() {
        return this.$store.getters.selectedFamilyId;
      },

      set: function(selectedFamilyId) {
        this.$store.commit("setSelectedFamilyId", selectedFamilyId);
      }
    },

    families() {
      return this.$store.getters.families;
    },

    treeViewNodes() {
      return this.$store.getters.treeviewNodes;
    },

    selectedNodes() {
      return this.$store.getters.selectedNodes;
    }
  },

  methods: {
    showNodeInTree(node) {
      this.searchedNodeInTree = node.name;
      this.openAllNodesInTree = true;
      this.tab = 1;
    },

    clearSearchedNodeInTree() {
      this.searchedNodeInTree = null;
      this.openAllNodesInTree = false;
    }
  }
};
</script>
