export const metaData = {
  "data" :{
    "view_options": [
      {
        "value": "f5ad065e-92a2-4725-b626-6d44bbb2f58f",
        "label": "Default",
        "order": 1,
        "is_default": true
      },
      {
        "value": "45dfd65e-92a2-4725-b626-6d44bbb2f445f",
        "label": "Out of Stock products only including Experied",
        "order": 4,
        "is_default": false
      },
      {
        "value": "er434-92a2-4725-b626-6d44bbb2f58f",
        "label": "Non-Experied products",
        "order": 2,
        "is_default": false
      },
      {
        "value": "8fd54ed1-ae14-dsdsd-8477-1d8e07f2dcsd4",
        "label": "User Management",
        "order": 3,
        "is_default": false
      }
    ],
    "form_action_url": [
      {
        "create": {
          "form_id": "1",
          "form_url": "/user/1",
          "form_name": "user_create"
        }
      },
      {
        "edit": {
          "form_id": "2",
          "form_url": "/user/2",
          "form_name": "user_edit"
        }
      },
      {
        "show": {
          "form_id": "3",
          "form_url": "/user/3",
          "form_name": "user_show"
        }
      }
    ],
    "table_actions_url": {
      "edit": "/api/user/edit",
      "show": "/api/user/show",
      "delete": "/users-screen/delete-user",
      "table_action": "/users-screen/users-pagination-sorting",
      "view_filter": "/api/user/view",
      "bulk_action": "/users-screen/bulk-actions",
      "more_action": "/users-screen/more-actions"
    },
    "favorite_screens": true,
     "quick_filters": [
      {
        "id": "8fd54ed1-ae14-dsdsd-8477-1d8e07f2dcsd4",
        "filter_type": "Search",
        "field_name": "user_name",
        "field_label": "User Name",
        "placeholder": "Search by Name",
        "order": 3
      },
      {
        "id": "4f45df33-ae14-4455-847857-1d8e07f2dc34f",
        "filter_type": "Dropdown",
        "field_name": "role_type",
        "field_label": "Role Type",
        "placeholder": "Select Role Type",
        "is_lazyload": true,
        "records_limit": 10,
        "order": 2
      },
      {
        "id": "4343fdf4-ae14-4455-8477-1d8e07f2d55b",
        "filter_type": "DateRange",
        "field_name": "latest_login_at",
        "field_label": "Last Login",
        "placeholder": "Select Date Range",
        "order": 5
      },
      {
        "id": "8454d54ed1-ae14-4455-8477-1d8e07f2454t",
        "filter_type": "MappedSearch",
        "placeholder": "Select Column",
        "order": 1,
        "options": [
          {
            "label": "Project Name",
            "value": "project_name"
          },
          {
            "label": "Customer Name",
            "value": "customer_name"
          },
          {
            "label": "Project Status based on task",
            "value": "project_status"
          },
          {
            "label": "Priority Level based on Client Requirement and Task Status",
            "value": "priority"
          },
          {
            "label": "Assigned",
            "value": "assigned"
          }
        ]
      },
      {
        "id": "4f45df33-ae14-4455-8477-1d8e0ss7f2dc34f",
        "filter_type": "Search",
        "field_name": "role_type",
        "field_label": "Role Type",
        "placeholder": "Select Role Type",
        "is_lazyload": true,
        "records_limit": 10,
        "order": 4
      },
    ],
    "columnData": [
  {
    "column_data_id": "cd001",
    "columnName": "Action",
    "columnType": "null",
    "headerName": "Action",
    "columnFilter": false,
    "isResizing": false,
    "size": 300,
    "sortable": false,
    "inLineEditing": false,
  },
  {
    "column_data_id": "cd002",
    "columnName": "user_name",
    "columnType": "String",
    "headerName": "User Name",
    "tableName": "users",
    "columnFilter": true,
    "isResizing": true,
    "size": 100,
    "sortable": true,
    "inLineEditing": true,
  },
  {
    "column_data_id": "cd003",
    "columnName": "first_name",
    "columnType": "String",
    "headerName": "First Name",
    "tableName": "users",
    "columnFilter": true,
    "isResizing": true,
    "size": 150,
    "sortable": true,
    "inLineEditing": true,
  },
  {
    "column_data_id": "cd004",
    "columnName": "last_name",
    "tableName": "users",
    "columnType": "String",
    "headerName": "Last Name",
    "columnFilter": true,
    "isResizing": true,
    "size": 200,
    "sortable": true,
    "inLineEditing": true,
  },
  {
    "column_data_id": "cd005",
    "columnName": "email",
    "columnType": "String",
    "headerName": "Email",
    "tableName": "users",
    "columnFilter": true,
    "isResizing": true,
    "size": 210,
    "sortable": true,
    "inLineEditing": true,
  },
  {
    "column_data_id": "cd006",
    "columnName": "roles",
    "columnType": "Dropdown",
    "headerName": "System Role",
    "tableName": "userroles",
    "associatedKey": "role_name",
    "columnFilter": true,
    "isResizing": true,
    "size": 200,
    "sortable": true,
    "inLineEditing": true,
    "options": [
      { value: "R001", label: "Principal Admin" },
      { value: "R002", label: "paymnet Admin" },
      { value: "R003", label: "dashboard Admin" }
    ]
  },
  {
    "column_data_id": "cd014",
    "columnName": "address",
    "columnType": "String",
    "headerName": "Address",
    "tableName": "addresses",
    "associatedKey": "address1",
    "columnFilter": true,
    "isResizing": true,
    "size": 200,
    "sortable": true,
    "inLineEditing": true,
  },
  {
    "column_data_id": "cd007",
    "columnName": "latest_login_at",
    "columnType": "Date",
    "headerName": "Last Login",
    "tableName": "users",
    "columnFilter": true,
    "isResizing": true,
    "size": 350,
    "sortable": true,
    "inLineEditing": true,
  },
  {
    "column_data_id": "cd008",
    "columnName": "account_locked",
    "columnType": "Binary",
    "headerName": "Lock Status",
    "tableName": "users",
    "columnFilter": true,
    "isResizing": true,
    "size": 100,
    "sortable": true,
    "inLineEditing": true,
  },
  {
    "column_data_id": "cd009",
    "columnName": "is_active",
    "columnType": "Binary",
    "headerName": "Status",
    "tableName": "users",
    "columnFilter": true,
    "isResizing": true,
    "size": 150,
    "sortable": true,
    "inLineEditing": true,
  },
  {
    "column_data_id": "cd010",
    "columnName": "lock/unlock",
    "columnType": "Binary",
    "headerName": "Lock/Unlock",
    "tableName": "users",
    "columnFilter": false,
    "isResizing": true,
    "size": 120,
    "sortable": false,
    "inLineEditing": false,
  },
  {
    "column_data_id": "cd011",
    "columnName": "reset_password",
    "columnType": "null",
    "headerName": "Reset Password",
    "tableName": "users",
    "columnFilter": false,
    "isResizing": true,
    "size": 150,
    "sortable": false,
    "inLineEditing": false,
  },
  {
    "column_data_id": "cd012",
    "columnName": "role_mapping",
    "columnType": "null",
    "headerName": "Role Mapping",
    "tableName": "users",
    "columnFilter": false,
    "isResizing": true,
    "size": 100,
    "sortable": false,
    "inLineEditing": false,
  },
  {
    "column_data_id": "cd013",
    "headerName": "More Actions",
    "columnName": "more_action",
    "columnType": "null",
    "columnFilter": false,
    "isResizing": false,
    "size": 100,
    "sortable": false,
    "inLineEditing": false,
  }
],
    "bulk_actions": [
      {
        "label": "Change Lock status to Lock/Unlock",
        "value": "lockstatus"
      },
      {
        "label": "Change status to Active/Inactive",
        "value": "status"
      }
    ],
    "more_actions": [
      {
        "label": "Duplicate",
        "value": "dup_01"
      },
      {
        "label": "Download",
        "value": "down_01"
      },
      {
        "label": "Share",
        "value": "share_01"
      }
    ]
  }
}

export const globalPreferences = {
  "data": {
    "per_page_values": [
      {
        "label": "10",
        "value": 10
      },
      {
        "label": "20",
        "value": 20
      },
      {
        "label": "50",
        "value": 50
      },
      {
        "label": "100",
        "value": 100
      }
    ],
    "preferences": {
      "density": "comfortable",
      "theme": "dark",
      "per_page": 50,
      "table_resizable": true,
      "table_data_wrap": true
    }
  }
}

// export const metaData = {
//   "data" :{
//     "view_options": [
//       {
//         "value": "f5ad065e-92a2-4725-b626-6d44bbb2f58f",
//         "label": "Default",
//         "order": 1,
//         "is_default": true
//       },
//       {
//         "value": "45dfd65e-92a2-4725-b626-6d44bbb2f445f",
//         "label": "Out of Stock products only including Experied",
//         "order": 3,
//         "is_default": false
//       },
//       {
//         "value": "er434-92a2-4725-b626-6d44bbb2f58f",
//         "label": "Non-Experied products",
//         "order": 2,
//         "is_default": false
//       }
//     ],
//     "form_action_url": [
//       {
//         "create": {
//           "form_id": "1",
//           "form_url": "/user/1",
//           "form_name": "user_create"
//         }
//       },
//       {
//         "edit": {
//           "form_id": "2",
//           "form_url": "/user/2",
//           "form_name": "user_edit"
//         }
//       },
//       {
//         "show": {
//           "form_id": "3",
//           "form_url": "/user/3",
//           "form_name": "user_show"
//         }
//       }
//     ],
//     "table_actions_url": {
//       "edit": "/api/user/edit",
//       "show": "/api/user/show",
//       "delete": "/users-screen/delete-user",
//       "table_action": "/users-screen/users-pagination-sorting",
//       "view_filter": "/api/user/view",
//       "bulk_action": "/users-screen/bulk-actions",
//       "more_action": "/users-screen/more-actions"
//     },
//     "favorite_screens": true,
//     "QuickFilters": [
//       {
//         "id": 'filter_7',
//         "filter_type": 'Date',
//         "field_name": 'latest_login_at',
//         "field_label": 'Last Login',
//         "input_field": [
//           {
//             "placeholder": 'Select date',
//             "type": 'calendar',
//           },
//         ],
//       },
//       {
//         "id": 'filter_1',
//         "filter_type": 'String',
//         "field_name": 'user_name',
//         "field_label": 'User Name',
//         "input_field": [
//           {
//             "placeholder": 'Search this list...',
//             "type": 'text',
//           },
//         ],
//       },
//       {
//         "id": "filter_4",
//         "filter_type": "Dropdown",
//         "type": "single",
//         "field_name": "roleType",
//         "field_label": "Role Type",
//         "input_field": [
//           {
//             "placeholder": "Role Type",
//             "label_icon": true,
//             "options": [
//               {
//                 "label": "System",
//                 "value": "system",
//                 "icon": "RiUserSettingsLine",
//                 "color": "#606EB0"
//               },
//               {
//                 "label": "Application",
//                 "value": "application",
//                 "icon": "GrDocumentUser",
//                 "color": "#F0AD4E"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "id": 'filter_5',
//         "filter_type": 'Dropdown',
//         "type": 'single',
//         "field_name": 'lockStatus',
//         "field_label": 'Lock Status',
//         "input_field": [
//           {
//             "placeholder": 'Lock Status',
//             "label_icon": true,
//             "options": [
//               {
//                 "label": 'Locked',
//                 "value": 'true',
//                 "icon": 'FaLock',
//                 "color": '#F04438',
//               },
//               {
//                 "label": 'Unlocked',
//                 "value": 'false',
//                 "icon": 'FaUnlock',
//                 "color": '#28A745',
//               },
//             ],
//           },
//         ],
//       },
      
//     ],
//     "columnData": [
//   {
//     "column_data_id": "cd001",
//     "columnName": "Action",
//     "columnType": "null",
//     "headerName": "Action",
//     "columnFilter": false,
//     "isResizing": false,
//     "size": 300,
//     "sortable": false,
//     "inLineEditing": false,
//   },
//   {
//     "column_data_id": "cd002",
//     "columnName": "user_name",
//     "columnType": "String",
//     "headerName": "User Name",
//     "tableName": "users",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 100,
//     "sortable": true,
//     "inLineEditing": true,
//   },
//   {
//     "column_data_id": "cd003",
//     "columnName": "first_name",
//     "columnType": "String",
//     "headerName": "First Name",
//     "tableName": "users",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 150,
//     "sortable": true,
//     "inLineEditing": true,
//   },
//   {
//     "column_data_id": "cd004",
//     "columnName": "last_name",
//     "tableName": "users",
//     "columnType": "String",
//     "headerName": "Last Name",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 200,
//     "sortable": true,
//     "inLineEditing": true,
//   },
//   {
//     "column_data_id": "cd005",
//     "columnName": "email",
//     "columnType": "String",
//     "headerName": "Email",
//     "tableName": "users",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 210,
//     "sortable": true,
//     "inLineEditing": true,
//   },
//   {
//     "column_data_id": "cd006",
//     "columnName": "roles",
//     "columnType": "Dropdown",
//     "headerName": "System Role",
//     "tableName": "userroles",
//     "associatedKey": "role_name",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 200,
//     "sortable": true,
//     "inLineEditing": true,
//     "options": [
//       { value: "R001", label: "Principal Admin" },
//       { value: "R002", label: "paymnet Admin" },
//       { value: "R003", label: "dashboard Admin" }
//     ]
//   },
//   {
//     "column_data_id": "cd014",
//     "columnName": "address",
//     "columnType": "String",
//     "headerName": "Address",
//     "tableName": "addresses",
//     "associatedKey": "address1",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 200,
//     "sortable": true,
//     "inLineEditing": true,
//   },
//   {
//     "column_data_id": "cd007",
//     "columnName": "latest_login_at",
//     "columnType": "Date",
//     "headerName": "Last Login",
//     "tableName": "users",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 350,
//     "sortable": true,
//     "inLineEditing": true,
//   },
//   {
//     "column_data_id": "cd008",
//     "columnName": "account_locked",
//     "columnType": "Binary",
//     "headerName": "Lock Status",
//     "tableName": "users",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 100,
//     "sortable": true,
//     "inLineEditing": true,
//   },
//   {
//     "column_data_id": "cd009",
//     "columnName": "is_active",
//     "columnType": "Binary",
//     "headerName": "Status",
//     "tableName": "users",
//     "columnFilter": true,
//     "isResizing": true,
//     "size": 150,
//     "sortable": true,
//     "inLineEditing": true,
//   },
//   {
//     "column_data_id": "cd010",
//     "columnName": "lock/unlock",
//     "columnType": "Binary",
//     "headerName": "Lock/Unlock",
//     "tableName": "users",
//     "columnFilter": false,
//     "isResizing": true,
//     "size": 120,
//     "sortable": false,
//     "inLineEditing": false,
//   },
//   {
//     "column_data_id": "cd011",
//     "columnName": "reset_password",
//     "columnType": "null",
//     "headerName": "Reset Password",
//     "tableName": "users",
//     "columnFilter": false,
//     "isResizing": true,
//     "size": 150,
//     "sortable": false,
//     "inLineEditing": false,
//   },
//   {
//     "column_data_id": "cd012",
//     "columnName": "role_mapping",
//     "columnType": "null",
//     "headerName": "Role Mapping",
//     "tableName": "users",
//     "columnFilter": false,
//     "isResizing": true,
//     "size": 100,
//     "sortable": false,
//     "inLineEditing": false,
//   },
//   {
//     "column_data_id": "cd013",
//     "headerName": "More Actions",
//     "columnName": "more_action",
//     "columnType": "null",
//     "columnFilter": false,
//     "isResizing": false,
//     "size": 100,
//     "sortable": false,
//     "inLineEditing": false,
//   }
// ],
//     "bulk_actions": [
//       {
//         "label": "Change Lock status to Lock/Unlock",
//         "value": "lockstatus"
//       },
//       {
//         "label": "Change status to Active/Inactive",
//         "value": "status"
//       }
//     ],
//     "more_actions": [
//       {
//         "label": "Duplicate",
//         "value": "dup_01"
//       },
//       {
//         "label": "Download",
//         "value": "down_01"
//       },
//       {
//         "label": "Share",
//         "value": "share_01"
//       }
//     ]
//   }
// }

// export const globalPreferences = {
//   "data": {
//     "per_page_values": [
//       {
//         "label": "10",
//         "value": 10
//       },
//       {
//         "label": "20",
//         "value": 20
//       },
//       {
//         "label": "50",
//         "value": 50
//       },
//       {
//         "label": "100",
//         "value": 100
//       }
//     ],
//     "preferences": {
//       "density": "comfortable",
//       "theme": "dark",
//       "per_page": 50,
//       "table_resizable": true,
//       "table_data_wrap": true
//     }
//   }
// }



