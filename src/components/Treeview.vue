<template>
  <div>
    <v-card class="text my-2" color="grey lighten-4">
      <v-treeview
        :key="openAll"
        v-model="selectedNodes"
        v-if="search"
        return-object
        :items="nodes"
        color="primary"
        selected-color="primary"
        selectable
        dense
        hoverable
        shaped
        transition
        expand-icon="mdi-chevron-down"
        on-icon="mdi-checkbox-marked-circle"
        off-icon="mdi-checkbox-blank-circle-outline"
        indeterminate-icon="mdi-checkbox-blank-circle"
        :search="search"
        :filter="customFilter"
        :open-all="openAll"
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.children.length > 0">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
        </template>
      </v-treeview>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["nodes", "searchedNode", "openAll"],

  computed: {
    selectedFamilyId() {
      return this.$store.getters.selectedFamilyId;
    },

    families() {
      return this.$store.getters.families;
    },

    search() {
      if (this.searchedNode) {
        return this.searchedNode;
      } else {
        const selectedFamily = this.families.find(
          family => family.id == this.selectedFamilyId
        );

        if (selectedFamily) {
          return selectedFamily.name;
        } else {
          return null;
        }
      }
    },

    customFilter() {
      return (item, search, textKey) =>
        item[textKey].indexOf(search) > -1 &&
        item.family_id == this.selectedFamilyId;
    },

    selectedNodes: {
      get: function() {
        return this.$store.getters.selectedNodes;
      },
      set: function(selectedNodes) {
        this.$store.commit("setSelectedNodes", selectedNodes);
      }
    }
  }
};
</script>

<style>
.v-treeview-node__label {
  white-space: normal !important;
  overflow-wrap: break-word !important;
}
</style>