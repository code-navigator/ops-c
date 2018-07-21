export default {
  // Number of active tab
  activeTab: null,

  // Node sitting on clipboard
  clippedNode: Object,

  // Currently selected node
  currentNode: Object,

  // Currently selected requirement
  currentRequirement: Object,

  // List of requirements for currently selected node
  currentRequirements: [],

  // Nodes to delete from database
  deletedNodes: [],

  // Requirements to delete from database
  deletedRequirements: [],

  // Header structure for displaying requirements
  headers: [
    {
      text: 'Item',
      align: 'left',
      value: 'nodeOrder',
      width: '5%',
      sortable: true
    },
    {
      text: 'Description',
      align: 'left',
      value: 'description',
      width: '30%',
      sortable: false
    },
    {
      text: 'Requirement',
      value: 'requirement',
      align: 'left',
      sortable: false
    }
  ],

  // Node is on clipboard ready to be pasted
  isClipped: false,

  // Edit mode
  isEdit: false,

  // Whether requirements are expanded to include parent requirements
  isExpanded: false,

  // Module of URL
  moduleName: 'spechelper',

  // Base tree structure
  nodes: {
    id: '0',
    title: 'Root Node',
    children: [],
    open: false,
    readOnly: true,
    requirements: []
  },

  // List of open tabs containing specs and procedures
  tabs: []
}
