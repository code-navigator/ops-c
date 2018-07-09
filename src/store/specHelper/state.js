import Nodes from '@Classes/Nodes'
import Tabs from '@Classes/Tabs'

export default {
  // Node sitting on clipboard
  clippedNode: Object,

  // Currently selected node
  currentNode: Object,

  // Currently selected requirement
  currentRequirement: Object,

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

  // Edit mode
  isEdit: false,

  // Module of URL
  moduleName: 'spechelper',

  // Base tree structure
  // nodes: {
  //   id: '0',
  //   title: 'Root Node',
  //   children: [],
  //   open: false,
  //   readOnly: true,
  //   requirements: []
  // },
  nodes: new Nodes(),

  // Node is on clipboard ready to be pasted
  nodeIsClipped: false,

  // List of requirements for currently selected node
  requirements: [],

  // List of open tabs containing specs and procedures
  tabs: new Tabs()

}
