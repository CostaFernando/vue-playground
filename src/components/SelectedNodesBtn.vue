<template>
  <v-speed-dial bottom fixed style="width: 300px;">
    <template v-slot:activator>
      <v-btn color="blue darken-2" dark rounded large>
        <v-badge color="green" :content="selectedNodes.length">Filtros</v-badge>
      </v-btn>
    </template>
    <v-card class="pa-2">
      <v-row align="center" v-if="selectedNodes.length > 0">
        <v-col cols="12" v-for="(node,i) in selectedNodes" :key="node.id">
          <v-chip close class="ma-1" @click:close="deleteSelectedNode(i)">{{node.name}}</v-chip>
        </v-col>
      </v-row>
      <span v-else>Nenhum filtro selecionado</span>
    </v-card>
  </v-speed-dial>
</template>

<script>
export default {
  props: ["selectedNodes"],

  methods: {
    deleteSelectedNode(nodeIndex) {
      const selectedNodesCopy = JSON.parse(JSON.stringify(this.selectedNodes));
      selectedNodesCopy.splice(nodeIndex, 1);

      this.$store.commit("setSelectedNodes", selectedNodesCopy);
    }
  }
};
</script>