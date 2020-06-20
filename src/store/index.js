import Vue from 'vue'
import Vuex from 'vuex'
import TreeFlattener from "../services/TreeFlattener";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    families: [{ id: 1, name: "Família Costa" }, { id: 2, name: "Família Figueroa" }],
    treeviewNodes: [],
    treeLeaves: [],
    selectedFamilyId: 1,
    selectedNodes: []
  },
  getters: {
    families(state) {
      return state.families;
    },

    treeviewNodes(state) {
      return state.treeviewNodes;
    },

    treeLeaves(state) {
      return state.treeLeaves;
    },

    selectedFamilyId(state) {
      return state.selectedFamilyId;
    },

    selectedNodes(state) {
      return state.selectedNodes;
    }
  },
  mutations: {
    setTreeviewNodes(state, treeviewNodes) {
      state.treeviewNodes = treeviewNodes;
    },

    setTreeLeaves(state, treeLeaves) {
      state.treeLeaves = treeLeaves;
    },

    setSelectedFamilyId(state, selectedFamilyId) {
      state.selectedFamilyId = selectedFamilyId;
    },

    setSelectedNodes(state, selectedNodes) {
      state.selectedNodes = selectedNodes;
    },
  },
  actions: {
    getFamiliesNodesFromMockServer(context, payload) {
      const nodesCostaFamily = [
        {
          id: 17,
          family_id: 1,
          name: "Família Costa",
          children: [
            {
              id: 1,
              family_id: 1,
              name: "Pai Costa",
              children: [
                {
                  id: 2,
                  family_id: 1,
                  name: "Filho Costa",
                  children: [
                    {
                      id: 3,
                      family_id: 1,
                      name: "Neto Costa",
                      children: []
                    },
                    {
                      id: 13,
                      family_id: 1,
                      name: "Neto Costa 2",
                      children: []
                    },
                    {
                      id: 30,
                      family_id: 1,
                      name: "João",
                      children: []
                    },
                  ]
                }
              ]
            },
            {
              id: 7,
              family_id: 1,
              name: "Tio Costa",
              children: [
                {
                  id: 8,
                  family_id: 1,
                  name: "Primo Costa",
                  children: [
                    {
                      id: 9,
                      family_id: 1,
                      name: "Primo neto Costa",
                      children: []
                    },
                    {
                      id: 14,
                      family_id: 1,
                      name: "Primo neto Costa 2",
                      children: []
                    },
                    {
                      id: 19,
                      family_id: 1,
                      name: "Amigo 1",
                      children: []
                    },
                    {
                      id: 20,
                      family_id: 1,
                      name: "Amigo 2",
                      children: []
                    },
                  ]
                }
              ]
            },
          ]
        }
      ];

      const nodesFigueroaFamily = [
        {
          id: 18,
          family_id: 2,
          name: "Família Figueroa",
          children: [
            {
              id: 4,
              family_id: 2,
              name: "Pai Figueroa",
              children: [
                {
                  id: 5,
                  family_id: 2,
                  name: "Filho Figueroa",
                  children: [
                    {
                      id: 6,
                      family_id: 2,
                      name: "Neto Figueroa",
                      children: []
                    },
                    {
                      id: 15,
                      family_id: 2,
                      name: "Neto Figueroa 2",
                      children: []
                    },
                    {
                      id: 31,
                      family_id: 2,
                      name: "João",
                      children: []
                    },
                  ]
                }
              ]
            },
            {
              id: 10,
              family_id: 2,
              name: "Tio Figueroa",
              children: [
                {
                  id: 11,
                  family_id: 2,
                  name: "Primo Figueroa",
                  children: [
                    {
                      id: 12,
                      family_id: 2,
                      name: "Primo neto Figueroa",
                      children: []
                    },
                    {
                      id: 16,
                      family_id: 2,
                      name: "Primo neto Figueroa 2",
                      children: []
                    }
                  ]
                }
              ]
            },
          ]
        }
      ];

      const treeviewNodes = [...nodesCostaFamily, ...nodesFigueroaFamily];
      const treeLeaves = TreeFlattener.getTreeLeavesWithParentTags(treeviewNodes);

      context.commit('setTreeviewNodes', treeviewNodes);
      context.commit('setTreeLeaves', treeLeaves);
    }
  },
  modules: {
  }
})
