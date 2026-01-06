import { FormDefinition } from "@/types/filed.type";

export type GridCols = "auto" | 1 | 2 | 3;

export const FormData: FormDefinition = {
  form: {
    // formId: '3f36a2a0-1c7e-4f26-a921-28cfbb21a983',
    ids: {
      formId: "3e8496f9-02ba-4a3a-ba26-ff84dc176936",
      moduleId: "44b8cc54-7531-42ff-8381-13413728fe1d",
      screenId: "580590e8-410d-4b2b-9ec2-6525be6944e1",
    },
    formName: "empDetils",
    formType: "basic",
    breadcrumbs: [
      { label: "Employee Details", url: "/employee/details" },
      { label: "Create Employee Details" },
    ],
    mode: "create",
    layout: {
      gridCols: "auto" as GridCols,
      labelPosition: "top",
    },
    viewMode: false,
    editMode: false,
    fontSize: "small",
    formHeader: {
      header: "Employee Details",
      // title: 'On Board Employee With Details',
    },

    fields: [
      {
        tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
        rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
        fieldId: "username",
        id: "firstName",
        name: "firstName",
        label: "Full Name",
        type: "text",
        value: undefined,
        placeholder: "Enter full name",
        helperText: "Your legal first name as it appears on official documents",
        isDisabled: false,
        isRequired: {
          value: false,
        },
        validation: {
          minLength: {
            value: 2,
          },
          maxLength: {
            value: 50,
          },
          additionalInfo: "",
        },
        autoPopulate: {
          autoFill: false,
          defaultValue: "James",
        },
        behavior: {
          showCharCounter: true,
          showClearIcon: true,
          spellCheck: false,
          autoTrim: true,
        },
        security: {
          auditEnabled: true,
        },
      },
      {
        tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
        rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
        id: "email",
        fieldId: "email",
        name: "email",
        label: "Email",
        type: "email",
        value: undefined,
        placeholder: "Enter your email",
        helperText: "Please enter a valid email address",
        isDisabled: false,
        isRequired: {
          value: true,
        },
        validation: {
          minLength: {
            value: 2,
          },
          maxLength: {
            value: 50,
          },
          additionalInfo: "Please enter a valid email address",
          pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        },
        autoPopulate: {
          autoFill: true,
          defaultValue: "sivaaselvan@conversedatasolutons.onmicrosoft.com",
        },
        icon: {
          suffix: "email",
        },
        behavior: {
          showCharCounter: false,
          showClearIcon: false,
          spellCheck: false,
          autoTrim: false,
        },
        security: {
          auditEnabled: true,
        },
      },
      {
        tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
        rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
        fieldId: "option",
        name: "Normal",
        id: "Normal",
        label: "Normal Select",
        type: "select",
        variant: "default",
        value: undefined,
        childTable: [
          {
            reference: {
              tableName: "options",
              columnName: "id",
            },
          },
        ],
        description: "Choose your preferred Normal",
        placeholder: "Select a Normal",
        options: [
          {
            id: "08ab9123-e63d-49e9-a611-91d8dc777767",
            value: "react",
          },
          {
            id: "4d9c9be2-6ba5-4be6-ac54-7824174d8509",
            value: "excel",
          },
          {
            id: "dc9519b4-fb16-4c7c-bc0b-a921c07303b2",
            value: "sales",
          },
          {
            id: "5116c824-ac2b-46a4-bafc-e9e241762334",
            value: "marketing",
          },
          {
            id: "cdf93c51-e9a8-4734-a115-7c83dad4e342",
            value: "legal",
          },
          {
            id: "d88cb423-7347-452f-950c-2e39125beaee",
            value: "compliance",
          },
          {
            id: "c1bdd877-869b-4319-ada5-c901ad21d236",
            value: "investor relations",
          },
        ],
        dataSource: "static",
        isRequired: {
          value: true,
          message: "Theme is required",
        },
        autoPopulate: {
          defaultValue: undefined,
          referenceField: undefined,
          autoFill: false,
        },
        conditionalLogic: {
          showWhen: [
            {
              field: "userType",
              operator: "equals",
              value: "admin",
              message: "Only shown for admin users",
            },
          ],
        },
        design: {
          icon: {
            enabled: true,
            position: "right",
          },
          dropdown: {
            position: "bottom",
          },
          optionIcon: {
            enabled: true,
            iconName: "",
            position: "left",
            showDisabledIcon: true,
            disabledIconPosition: "left",
          },
        },
        validation: {
          minLength: {
            value: 1,
            message: "Please select at least one option",
          },
          additionalInfo: "This setting affects theme preference",
        },
        customValidation: {
          function: "validateThemeSelection",
          message: "Invalid theme selected",
        },
        behavior: {
          copyPasteRestriction: true,
        },
        security: {
          fieldLevelSecurity: "visible",
          auditEnabled: true,
        },
        isDisabled: false,
        isReadOnly: false,
        isVisible: true,
        auditLog: true,
      },
      {
        tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
        rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
        fieldId: "password",
        id: "password",
        name: "password",
        label: "Password",
        type: "password",
        value: undefined,
        placeholder: "Enter a strong password",
        isDisabled: false,
        isRequired: {
          value: true,
        },
        validation: {
          minLength: {
            value: 8,
          },
          maxLength: {
            value: 64,
          },
          additionalInfo: "Include upper, lower, number, and symbol",
        },
        autoPopulate: {
          autoFill: false,
          defaultValue: "",
        },
        behavior: {
          showCharCounter: false,
          showClearIcon: false,
          spellCheck: false,
          autoTrim: false,
        },
        security: {
          auditEnabled: true,
        },
      },
      {
        tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
        rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
        fieldId: "ssn",
        id: "ssn",
        name: "ssn",
        label: "SSN",
        type: "text",
        value: undefined,
        placeholder: "XXX-XX-XXXX",
        helperText: "Masked for privacy",
        isRequired: {
          value: false,
        },
        autoPopulate: {
          autoFill: false,
          defaultValue: "",
        },
        behavior: {
          dataMasking: {
            enabled: true,
            pattern: "ssn",
            maskChar: "X",
            showFirst: 0,
            showLast: 0,
            unmaskOnFocus: true,
            maskOnBlur: true,
            realTimeMasking: true,
            preserveFormat: true,
          },
          showCharCounter: false,
          showClearIcon: true,
          spellCheck: false,
          autoTrim: true,
          copyPasteRestriction: true,
        },
        security: {
          auditEnabled: true,
        },
      },
      {
        tableId: "57baa795-2661-4339-96b3-51e87f3840bc",
        rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
        fieldId: "groups",
        id: "groups",
        name: "groups",
        label: "Group Select",
        type: "select",
        value: undefined,
        variant: "group",
        description: "Choose your preferred Group",
        placeholder: "Select a Group",
        dataSource: "static",
        childTable: [
          {
            reference: {
              tableName: "options",
              columnName: "id",
            },
          },
        ],
        isRequired: {
          value: true,
          message: "",
        },
        autoPopulate: {
          defaultValue: undefined,
          referenceField: undefined,
          autoFill: false,
        },
        conditionalLogic: {
          showWhen: [
            {
              field: "userType",
              operator: "equals",
              value: "admin",
              message: "Only shown for admin users",
            },
          ],
        },
        design: {
          icon: {
            enabled: true,
            position: "right",
          },
          dropdown: {
            position: "bottom",
          },
          optionIcon: {
            enabled: true,
            iconName: "",
            position: "left",
            showDisabledIcon: true,
            disabledIconPosition: "left",
          },
        },
        validation: {
          minLength: {
            value: 1,
            message: "Please select at least one option",
          },
          additionalInfo: "This setting affects theme preference",
        },
        customValidation: {
          function: "validateThemeSelection",
          message: "Invalid theme selected",
        },
        behavior: {
          copyPasteRestriction: true,
        },
        security: {
          fieldLevelSecurity: "visible",
          auditEnabled: true,
        },
        isDisabled: false,
        isReadOnly: false,
        isVisible: true,
        auditLog: true,
        options: [
          {
            id: "28d3d331-bf2d-414f-959f-711aa319fcc8",
            group: "Technical",
            items: [
              {
                id: "0110cc3b-53b3-4e78-99b5-d62dfe2aee54",
                value: "it",
              },
              {
                id: "406d7fb4-334e-456d-8886-2bfbed8b41fd",
                value: "engineering",
              },
              {
                id: "a0ee7e3f-1eb2-45e8-b20f-377c48dc43d3",
                value: "data science",
              },
              {
                id: "822b5e97-eb7f-484c-b5a7-9ab1b2221573",
                value: "product management",
              },
              {
                id: "fa6033d4-75ad-4415-920b-1cf330de9a39",
                value: "quality assurance",
              },
              {
                id: "483ff01f-0dce-4ad5-9228-f50053b109f3",
                value: "security",
              },
            ],
          },
          {
            id: "5e4dcf51-c682-4794-b9ea-1d844050492a",
            group: "Business",
            items: [
              {
                id: "45f76455-429c-4211-8a21-41b5c9febbad",
                value: "hr",
              },
              {
                id: "8b49cbda-ed2f-495d-890c-07c834231f92",
                value: "finance",
              },
              {
                id: "5c86aacf-82c1-4830-8dd6-ad6fc650c6cd",
                value: "sales",
              },
              {
                id: "0d192e89-4a9f-4040-acc2-d01680f3eec3",
                value: "marketing",
              },
              {
                id: "e061aaf0-1631-453b-a972-f4c17ab3deec",
                value: "legal",
              },
              {
                id: "3a89db4c-401c-4d22-b7f2-be1f66b4d49e",
                value: "compliance",
              },
              {
                id: "055ee025-0952-4aeb-8447-97af233f8b8a",
                value: "investor relations",
              },
            ],
          },
          {
            id: "cdb602e4-2d19-4ad0-b5b3-ecf75bf9ba22",
            group: "Support",
            items: [
              {
                id: "26c59b9b-90fa-4c6f-8f79-001ad7c88291",
                value: "customer support",
              },
              {
                id: "b4554056-8b71-4e53-974c-7327a2b55317",
                value: "operations",
              },
              {
                id: "83059f52-7e18-4b5a-b7b1-8e0fe9bf6d3c",
                value: "procurement",
              },
              {
                id: "86cc03fc-8bf4-4004-a9da-da16eecfe3f1",
                value: "logistics",
              },
              {
                id: "4aefd243-ccc9-4771-b180-e97bf4d8b56e",
                value: "facilities",
              },
              {
                id: "e03af983-315f-4da8-a14a-8ae618257694",
                value: "administration",
              },
            ],
          },
          {
            id: "f9ec164d-ee46-46ff-8f04-2c14532dc19f",
            group: "Specialized",
            items: [
              {
                id: "664fc377-8bae-4557-976b-21529f131d8f",
                value: "design",
              },
              {
                id: "c3ef8310-7547-49a0-b81b-9ab7357c65ac",
                value: "public relations",
              },
              {
                id: "dcfa5316-7549-4613-a825-11087e789051",
                value: "event management",
              },
              {
                id: "5f3b86c6-7ab1-4872-af3c-d4a67b562499",
                value: "training & development",
              },
              {
                id: "b32c1fae-2a5b-4190-be26-57e4c62d2d96",
                value: "medical",
              },
              {
                id: "e2cb84d0-e3e1-40f6-8ac8-51f501dc1b01",
                value: "internal audit",
              },
              {
                id: "daa81697-90be-4551-b96a-6de527f6c3aa",
                value: "research & development",
              },
              {
                id: "922cd930-edd7-4f30-98c1-01b3a7966bc5",
                value: "business intelligence",
              },
            ],
          },
        ],
      },
      {
        tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
        rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
        fieldId: "date",
        id: "dob_mmddyyyy",
        name: "dateOfBirth_mmddyyyy",
        label: "Date of Birth (MM/DD/YYYY)",
        type: "calendar",
        value: undefined,
        placeholder: "mm/dd/yyyy",
        dateFormat: "MM/DD/YYYY",
        helperText: "Select your date of birth",
        isDisabled: false,
        isRequired: {
          value: true,
        },
        behavior: {
          copyPasteRestriction: true,
        },
      },
      // {
      //   tableId: '25d83010-1d30-4a4b-b83c-fef4d46c95fa',
      //   rowId: 'b885246c-4ef8-4e78-984b-5a50bfbdb0c9',
      //   fieldId: 'Without Description',
      //   value: undefined,
      //   id: 'Without Description',
      //   name: 'Without Description',
      //   label: 'Without Description',
      //   type: 'select',
      //   variant: 'default',
      //   placeholder: 'Select a  option',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   childTable: [
      //     {
      //       reference: {
      //         tableName: 'options',
      //         columnName: 'id',
      //       },
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: true,
      //     message: 'Theme is required',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     referenceField: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'userType',
      //         operator: 'equals',
      //         value: 'admin',
      //         message: 'Only shown for admin users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: '',
      //       position: 'left',
      //       showDisabledIcon: false,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Please select at least one option',
      //     },
      //     additionalInfo: 'This setting affects theme preference',
      //   },
      //   customValidation: {
      //     function: 'validateThemeSelection',
      //     message: 'Invalid theme selected',
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'limitedoptions',
      //   value: undefined,

      //   name: 'limitedoptions',
      //   label: 'Limited Options Select',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Choose your preferred limited option',
      //   placeholder: 'Select a limited option',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: true,
      //     message: 'Theme is required',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     referenceField: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'userType',
      //         operator: 'equals',
      //         value: 'admin',
      //         message: 'Only shown for admin users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: '',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'left',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Please select at least one option',
      //     },
      //     additionalInfo: 'This setting affects theme preference',
      //   },
      //   customValidation: {
      //     function: 'validateThemeSelection',
      //     message: 'Invalid theme selected',
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'DisabledOption',
      //   value: undefined,
      //   name: 'Disabled Option',
      //   label: 'Disabled Option  Select',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'DisabledOption option Left Icon position',
      //   placeholder: 'Select a  option',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: true,
      //     message: 'Theme is required',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     referenceField: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'userType',
      //         operator: 'equals',
      //         value: 'admin',
      //         message: 'Only shown for admin users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: '',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'left',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Please select at least one option',
      //     },
      //     additionalInfo: 'This setting affects theme preference',
      //   },
      //   customValidation: {
      //     function: 'validateThemeSelection',
      //     message: 'Invalid theme selected',
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'DisabledOption Right',
      //   value: undefined,

      //   name: 'DisabledOption Right',
      //   label: 'Disabled Option   Select Right Icon position',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Disabled Option Right Icon position',
      //   placeholder: 'Select a  option',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: true,
      //     message: 'Theme is required',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     referenceField: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'userType',
      //         operator: 'equals',
      //         value: 'admin',
      //         message: 'Only shown for admin users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: '',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Please select at least one option',
      //     },
      //     additionalInfo: 'This setting affects theme preference',
      //   },
      //   customValidation: {
      //     function: 'validateThemeSelection',
      //     message: 'Invalid theme selected',
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'DisabledOption without',
      //   value: undefined,

      //   name: 'DisabledOption without',
      //   label: 'Disabled Option Select (No Icon)',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Disabled Option without Icon',
      //   placeholder: 'Select a option',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: true,
      //     message: 'Theme is required',
      //   },
      //   autoPopulate: {
      //     defaultValue: {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     referenceField: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'userType',
      //         operator: 'equals',
      //         value: 'admin',
      //         message: 'Only shown for admin users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: '',
      //       position: 'left',
      //       showDisabledIcon: false,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Please select at least one option',
      //     },
      //     additionalInfo: 'This setting affects theme preference',
      //   },
      //   customValidation: {
      //     function: 'validateThemeSelection',
      //     message: 'Invalid theme selected',
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'Defalut value',
      //   value: undefined,
      //   name: 'Defalut value',
      //   label: 'Defalut value',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Select your Defalut value',
      //   placeholder: 'Defalut value',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: false,
      //     message: '',
      //   },
      //   autoPopulate: {
      //     defaultValue: {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     autoFill: true,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'department',
      //         operator: 'not_equals',
      //         value: 'hr',
      //         message: 'Only for non-HR users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: 'user',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Select at least one',
      //     },
      //   },
      //   customValidation: {
      //     function: 'validateRole',
      //     message: 'Invalid role selected',
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'Dropdown Position (top)',
      //   name: 'Dropdown Position (top)',
      //   value: undefined,

      //   label: 'Dropdown Position (top)',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Select your Dropdown Position (top)',
      //   placeholder: 'Dropdown Position (top)',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: false,
      //     message: '',
      //   },
      //   autoPopulate: {
      //     defaultValue: {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //     autoFill: true,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'department',
      //         operator: 'not_equals',
      //         value: 'hr',
      //         message: 'Only for non-HR users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'top',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: 'user',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Select at least one',
      //     },
      //   },
      //   customValidation: {
      //     function: 'validateRole',
      //     message: 'Invalid role selected',
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'Dropdown Position (Left)',
      //   value: undefined,

      //   name: 'Dropdown Position (Left)',
      //   label: 'Dropdown Position (Left)',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Select your Dropdown Position (Left)',
      //   placeholder: 'Dropdown Position (Left)',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: false,
      //     message: '',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'department',
      //         operator: 'not_equals',
      //         value: 'hr',
      //         message: 'Only for non-HR users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'left',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: 'user',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Select at least one',
      //     },
      //   },
      //   customValidation: {
      //     function: 'validateRole',
      //     message: 'Invalid role selected',
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'Dropdown Position (Right)',
      //   value: undefined,

      //   name: 'Dropdown Position (Right)',
      //   label: 'Dropdown Position (Right)',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Select your Dropdown Position (Right)',
      //   placeholder: 'Dropdown Position (Right)',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: false,
      //     message: '',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'department',
      //         operator: 'not_equals',
      //         value: 'hr',
      //         message: 'Only for non-HR users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'right',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: 'user',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Select at least one',
      //     },
      //   },
      //   customValidation: {
      //     function: 'validateRole',
      //     message: 'Invalid role selected',
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'Copy Past Restriction',
      //   value: undefined,

      //   name: 'Copy Past Restriction',
      //   label: 'Copy Past Restriction',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Select your Copy Past Restriction',
      //   placeholder: 'Copy Past Restriction',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: false,
      //     message: '',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'department',
      //         operator: 'not_equals',
      //         value: 'hr',
      //         message: 'Only for non-HR users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: 'user',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Select at least one',
      //     },
      //   },
      //   customValidation: {
      //     function: 'validateRole',
      //     message: 'Invalid role selected',
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'Disabled Dropdown',
      //   value: undefined,

      //   name: 'Disabled Dropdown',
      //   label: 'Disabled Dropdown',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Select your Disabled Dropdown',
      //   placeholder: 'Disabled Dropdown',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: false,
      //     message: '',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'department',
      //         operator: 'not_equals',
      //         value: 'hr',
      //         message: 'Only for non-HR users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: 'user',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Select at least one',
      //     },
      //   },
      //   customValidation: {
      //     function: 'validateRole',
      //     message: 'Invalid role selected',
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   isDisabled: true,
      //   isReadOnly: false,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'Read Only Dropdown',
      //   value: undefined,

      //   name: 'Read Only Dropdown',
      //   label: 'Read Only Dropdown',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Select your Read Only Dropdown',
      //   placeholder: 'Read Only Dropdown',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: false,
      //     message: '',
      //   },
      //   autoPopulate: {
      //     defaultValue: {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     autoFill: true,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'department',
      //         operator: 'not_equals',
      //         value: 'hr',
      //         message: 'Only for non-HR users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: 'user',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Select at least one',
      //     },
      //   },
      //   customValidation: {
      //     function: 'validateRole',
      //     message: 'Invalid role selected',
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: true,
      //   isVisible: true,
      //   auditLog: true,
      // },
      // {
      //   tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
      //   fieldId: 'Read Only Dropdown without Value',
      //   value: undefined,

      //   name: 'Read Only Dropdown without Value',
      //   label: 'Read Only Dropdown without Value',
      //   type: 'select',
      //   variant: 'default',
      //   description: 'Select your Read Only Dropdown without Value',
      //   placeholder: 'Read Only Dropdown without Value',
      //   options: [
      //     {
      //       id: '9a4eb471-abb5-41d0-998f-38cdc3ab9acd',
      //       value: 'react',
      //     },
      //     {
      //       id: '4d9c9be2-6ba5-4be6-ac54-7824174d8509',
      //       value: 'excel',
      //       disabled: true,
      //     },
      //     {
      //       id: 'dc9519b4-fb16-4c7c-bc0b-a921c07303b2',
      //       value: 'sales',
      //     },
      //     {
      //       id: '5116c824-ac2b-46a4-bafc-e9e241762334',
      //       value: 'marketing',
      //       disabled: true,
      //     },
      //     {
      //       id: 'cdf93c51-e9a8-4734-a115-7c83dad4e342',
      //       value: 'legal',
      //     },
      //     {
      //       id: 'd88cb423-7347-452f-950c-2e39125beaee',
      //       value: 'compliance',
      //     },
      //     {
      //       id: 'c1bdd877-869b-4319-ada5-c901ad21d236',
      //       value: 'investor relations',
      //     },
      //   ],
      //   dataSource: 'static',
      //   isRequired: {
      //     value: false,
      //     message: '',
      //   },
      //   autoPopulate: {
      //     defaultValue: undefined,
      //     autoFill: false,
      //   },
      //   conditionalLogic: {
      //     showWhen: [
      //       {
      //         field: 'department',
      //         operator: 'not_equals',
      //         value: 'hr',
      //         message: 'Only for non-HR users',
      //       },
      //     ],
      //   },
      //   design: {
      //     icon: {
      //       enabled: true,
      //       position: 'right',
      //     },
      //     dropdown: {
      //       position: 'bottom',
      //     },
      //     optionIcon: {
      //       enabled: true,
      //       iconName: 'user',
      //       position: 'left',
      //       showDisabledIcon: true,
      //       disabledIconPosition: 'right',
      //     },
      //   },
      //   validation: {
      //     minLength: {
      //       value: 1,
      //       message: 'Select at least one',
      //     },
      //   },
      //   customValidation: {
      //     function: 'validateRole',
      //     message: 'Invalid role selected',
      //   },
      //   security: {
      //     fieldLevelSecurity: 'visible',
      //     auditEnabled: true,
      //   },
      //   behavior: {
      //     copyPasteRestriction: true,
      //   },
      //   isDisabled: false,
      //   isReadOnly: true,
      //   isVisible: true,
      //   auditLog: true,
      // },
    ],

    // fields: [
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Normal',
    //     name: 'Normal',
    //     label: 'Normal Select',
    //     type: 'select',
    //     value: undefined,
    //     variant: 'group',
    //     description: 'Choose your preferred Normal',
    //     placeholder: 'Select a Normal',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: true,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       referenceField: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'userType',
    //           operator: 'equals',
    //           value: 'admin',
    //           message: 'Only shown for admin users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: '',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'left',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Please select at least one option',
    //       },
    //       additionalInfo: 'This setting affects theme preference',
    //     },
    //     customValidation: {
    //       function: 'validateThemeSelection',
    //       message: 'Invalid theme selected',
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '28d3d331-bf2d-414f-959f-711aa319fcc8',
    //         group: 'Technical',
    //         items: [
    //           {
    //             id: 'ff5474b7-5e3b-4795-9af6-5ee1190175c7',
    //             value: 'it',
    //           },
    //           {
    //             id: '406d7fb4-334e-456d-8886-2bfbed8b41fd',
    //             value: 'engineering',
    //           },
    //           {
    //             id: 'a0ee7e3f-1eb2-45e8-b20f-377c48dc43d3',
    //             value: 'data science',
    //           },
    //           {
    //             id: '822b5e97-eb7f-484c-b5a7-9ab1b2221573',
    //             value: 'product management',
    //           },
    //           {
    //             id: 'fa6033d4-75ad-4415-920b-1cf330de9a39',
    //             value: 'quality assurance',
    //           },
    //           {
    //             id: '483ff01f-0dce-4ad5-9228-f50053b109f3',
    //             value: 'security',
    //           },
    //         ],
    //       },
    //       {
    //         id: '5e4dcf51-c682-4794-b9ea-1d844050492a',
    //         group: 'Business',
    //         items: [
    //           {
    //             id: '45f76455-429c-4211-8a21-41b5c9febbad',
    //             value: 'hr',
    //           },
    //           {
    //             id: '8b49cbda-ed2f-495d-890c-07c834231f92',
    //             value: 'finance',
    //           },
    //           {
    //             id: '5c86aacf-82c1-4830-8dd6-ad6fc650c6cd',
    //             value: 'sales',
    //           },
    //           {
    //             id: '0d192e89-4a9f-4040-acc2-d01680f3eec3',
    //             value: 'marketing',
    //           },
    //           {
    //             id: 'e061aaf0-1631-453b-a972-f4c17ab3deec',
    //             value: 'legal',
    //           },
    //           {
    //             id: '3a89db4c-401c-4d22-b7f2-be1f66b4d49e',
    //             value: 'compliance',
    //           },
    //           {
    //             id: '055ee025-0952-4aeb-8447-97af233f8b8a',
    //             value: 'investor relations',
    //           },
    //         ],
    //       },
    //       {
    //         id: 'cdb602e4-2d19-4ad0-b5b3-ecf75bf9ba22',
    //         group: 'Support',
    //         items: [
    //           {
    //             id: '26c59b9b-90fa-4c6f-8f79-001ad7c88291',
    //             value: 'customer support',
    //           },
    //           {
    //             id: 'b4554056-8b71-4e53-974c-7327a2b55317',
    //             value: 'operations',
    //           },
    //           {
    //             id: '83059f52-7e18-4b5a-b7b1-8e0fe9bf6d3c',
    //             value: 'procurement',
    //           },
    //           {
    //             id: '86cc03fc-8bf4-4004-a9da-da16eecfe3f1',
    //             value: 'logistics',
    //           },
    //           {
    //             id: '4aefd243-ccc9-4771-b180-e97bf4d8b56e',
    //             value: 'facilities',
    //           },
    //           {
    //             id: 'e03af983-315f-4da8-a14a-8ae618257694',
    //             value: 'administration',
    //           },
    //         ],
    //       },
    //       {
    //         id: 'f9ec164d-ee46-46ff-8f04-2c14532dc19f',
    //         group: 'Specialized',
    //         items: [
    //           {
    //             id: '664fc377-8bae-4557-976b-21529f131d8f',
    //             value: 'design',
    //           },
    //           {
    //             id: 'c3ef8310-7547-49a0-b81b-9ab7357c65ac',
    //             value: 'public relations',
    //           },
    //           {
    //             id: 'dcfa5316-7549-4613-a825-11087e789051',
    //             value: 'event management',
    //           },
    //           {
    //             id: '5f3b86c6-7ab1-4872-af3c-d4a67b562499',
    //             value: 'training & development',
    //           },
    //           {
    //             id: 'b32c1fae-2a5b-4190-be26-57e4c62d2d96',
    //             value: 'medical',
    //           },
    //           {
    //             id: 'e2cb84d0-e3e1-40f6-8ac8-51f501dc1b01',
    //             value: 'internal audit',
    //           },
    //           {
    //             id: 'daa81697-90be-4551-b96a-6de527f6c3aa',
    //             value: 'research & development',
    //           },
    //           {
    //             id: '922cd930-edd7-4f30-98c1-01b3a7966bc5',
    //             value: 'business intelligence',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Without Description',
    //     name: 'Without Description',
    //     label: 'Without Description',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     placeholder: 'Select a  option',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: true,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: {
    //         id: '2ad7152f-8488-443d-86d9-ef4a23cc99e4',
    //         value: 'it',
    //       },
    //       referenceField: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'userType',
    //           operator: 'equals',
    //           value: 'admin',
    //           message: 'Only shown for admin users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: '',
    //         position: 'left',
    //         showDisabledIcon: false,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Please select at least one option',
    //       },
    //       additionalInfo: 'This setting affects theme preference',
    //     },
    //     customValidation: {
    //       function: 'validateThemeSelection',
    //       message: 'Invalid theme selected',
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '97155b9d-ba53-4b37-9482-2d0a7f89b48b',
    //         group: 'Technical',
    //         items: [
    //           {
    //             id: '2ad7152f-8488-443d-86d9-ef4a23cc99e4',
    //             value: 'it',
    //           },
    //           {
    //             id: 'a3c81699-a73c-4ec9-a2cb-47b980c84105',
    //             value: 'engineering',
    //           },
    //           {
    //             id: '65947430-46fe-4479-b7a3-7822167a189a',
    //             value: 'data science',
    //           },
    //           {
    //             id: 'a5bb23b0-4c30-42af-9644-36fe4a33afad',
    //             value: 'product management',
    //           },
    //           {
    //             id: '7f25cc11-f1a3-4f35-99f8-604bee8d275d',
    //             value: 'quality assurance',
    //           },
    //           {
    //             id: '36f1c04c-8ff5-4d1a-b8c4-6d18fb0005c9',
    //             value: 'security',
    //           },
    //         ],
    //       },
    //       {
    //         id: 'ba40ced4-fedf-4965-a594-a553beef5f8f',
    //         group: 'Business',
    //         items: [
    //           {
    //             id: '7539d296-df3f-425e-bfb5-fd5a289aaff6',
    //             value: 'hr',
    //           },
    //           {
    //             id: '6224b734-24cd-4fc8-825f-d4146559ad84',
    //             value: 'finance',
    //           },
    //           {
    //             id: '7fe88e8a-ebee-4f4b-a26f-7b64fada18e3',
    //             value: 'sales',
    //           },
    //           {
    //             id: 'df47e946-1ef9-4d93-a219-ede10c33883c',
    //             value: 'marketing',
    //           },
    //           {
    //             id: '01f3cb48-421a-4648-85a7-714344ecea4b',
    //             value: 'legal',
    //           },
    //           {
    //             id: '432f3027-4214-41d8-b5c1-e27228e2c891',
    //             value: 'compliance',
    //           },
    //           {
    //             id: 'c29f5a89-d0ae-4825-b9bd-9139125282e8',
    //             value: 'investor relations',
    //           },
    //         ],
    //       },
    //       {
    //         id: 'ff479a6a-27a1-4ef0-8678-fbf1646a4d72',
    //         group: 'Support',
    //         items: [
    //           {
    //             id: '36eade34-c9ef-424e-a799-1d04ff07819c',
    //             value: 'customer support',
    //           },
    //           {
    //             id: 'a2205dfe-0754-48bf-b8a4-5d23dd138a3d',
    //             value: 'operations',
    //           },
    //           {
    //             id: '2cbbf80e-dc65-40a5-97b1-d67d3bf01379',
    //             value: 'procurement',
    //           },
    //           {
    //             id: '97c817de-091c-432f-b3ea-51719ce8a7fc',
    //             value: 'logistics',
    //           },
    //           {
    //             id: '0a036227-6b8d-4ad7-9ac7-2343ae1d0589',
    //             value: 'facilities',
    //           },
    //           {
    //             id: '228990bc-e73e-4c70-a95f-92f866821fac',
    //             value: 'administration',
    //           },
    //         ],
    //       },
    //       {
    //         id: 'c3d90828-7ae6-42c6-bfec-1c31a40b98d0',
    //         group: 'Specialized',
    //         items: [
    //           {
    //             id: '578b03a6-7e58-4a0f-b8a1-676b1c87f284',
    //             value: 'design',
    //           },
    //           {
    //             id: '6a88203f-fa3d-47a8-94d8-02bd6a3f31eb',
    //             value: 'public relations',
    //           },
    //           {
    //             id: '1c562c19-4a44-4364-90a1-256c23d561ce',
    //             value: 'event management',
    //           },
    //           {
    //             id: 'bc7e5a16-ca60-406e-b433-e4dfdeae3a32',
    //             value: 'training & development',
    //           },
    //           {
    //             id: '515fc187-b76c-4e4c-bf90-1bc55d727a4b',
    //             value: 'medical',
    //           },
    //           {
    //             id: '79abf200-1ebc-43c1-94ca-dd55d8d0f290',
    //             value: 'internal audit',
    //           },
    //           {
    //             id: '0224c1d1-c87e-41b3-8cc5-1c009e6f155a',
    //             value: 'research & development',
    //           },
    //           {
    //             id: '8159d388-0a9f-4837-96a4-d4835b0438ba',
    //             value: 'business intelligence',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'limitedoptions',
    //     name: 'limitedoptions',
    //     label: 'Limited Options Select',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Choose your preferred limited option',
    //     placeholder: 'Select a limited option',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: true,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       referenceField: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'userType',
    //           operator: 'equals',
    //           value: 'admin',
    //           message: 'Only shown for admin users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: '',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'left',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Please select at least one option',
    //       },
    //       additionalInfo: 'This setting affects theme preference',
    //     },
    //     customValidation: {
    //       function: 'validateThemeSelection',
    //       message: 'Invalid theme selected',
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '64555f78-e16a-4a1a-b29d-d103e5adb16e',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '92b15237-4810-4f86-b6f0-600c0f8b5ead',
    //             value: 'delhi',
    //           },
    //           {
    //             id: '512fc00c-3495-4dd7-912f-77fb71420a55',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: '1ac1074e-eaea-45c9-b82b-200a5b5bf46d',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '21092959-89c9-47b0-a218-5da544a2b141',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: '7f2473fb-1f83-4c84-979f-9ec2f29a217f',
    //             value: 'london',
    //           },
    //           {
    //             id: '963c6278-654a-44bc-abdb-87835012e15e',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'DisabledOption',
    //     name: 'Disabled Option',
    //     label: 'Disabled Option  Select',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'DisabledOption option Left Icon position',
    //     placeholder: 'Select a  option',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: true,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       referenceField: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'userType',
    //           operator: 'equals',
    //           value: 'admin',
    //           message: 'Only shown for admin users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: '',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'left',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Please select at least one option',
    //       },
    //       additionalInfo: 'This setting affects theme preference',
    //     },
    //     customValidation: {
    //       function: 'validateThemeSelection',
    //       message: 'Invalid theme selected',
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '36c25957-dd0e-4e18-98fc-79c4eecd166f',
    //         group: 'Aisa',
    //         disabled: true,
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '7e055c29-01b8-49bb-a394-6370203f5102',
    //             value: 'delhi',
    //           },
    //           {
    //             id: '1c2c5991-a188-4bbc-b5e1-af32e1bc57c5',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: '866a2c8a-816c-422d-8226-0c4865f574f5',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: 'ce5e7b87-6550-41c2-9ffc-e9fbad12ace8',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: '42c4d892-a44e-4ffd-a207-4c09fbf604d1',
    //             value: 'london',
    //           },
    //           {
    //             id: 'e42498fa-9674-4229-82ff-ffa837abc65e',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'DisabledOption Right',
    //     name: 'DisabledOption Right',
    //     label: 'Disabled Option   Select Right Icon position',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Disabled Option Right Icon position',
    //     placeholder: 'Select a  option',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: true,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: {
    //         id: '1684c9c3-6129-40d1-a6f6-919b335d21f7',
    //         value: 'moscow',
    //       },
    //       referenceField: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'userType',
    //           operator: 'equals',
    //           value: 'admin',
    //           message: 'Only shown for admin users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: '',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Please select at least one option',
    //       },
    //       additionalInfo: 'This setting affects theme preference',
    //     },
    //     customValidation: {
    //       function: 'validateThemeSelection',
    //       message: 'Invalid theme selected',
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '247cab95-ead9-48aa-8c35-2408a6d28ab7',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '737cccc6-11dc-4342-b5de-ff154f4e7cc9',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'de6266fd-54be-411f-862b-f1b16f798743',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: '9ef38856-9306-45b9-bad1-44e3aa9b2c80',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '7b9f9244-314b-47c5-8995-a8979722fd0b',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: '2b9059c3-56a2-477f-965c-07b498f09a34',
    //             value: 'london',
    //           },
    //           {
    //             id: '1684c9c3-6129-40d1-a6f6-919b335d21f7',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'DisabledOption without',
    //     name: 'DisabledOption without',
    //     label: 'Disabled Option Select (No Icon)',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Disabled Option without Icon',
    //     placeholder: 'Select a  option',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: true,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: {
    //         id: 'db26f842-bef7-43c9-9b11-c0729cd72c13',
    //         value: 'hong kong',
    //       },
    //       referenceField: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'userType',
    //           operator: 'equals',
    //           value: 'admin',
    //           message: 'Only shown for admin users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: false,
    //         iconName: '',
    //         position: 'left',
    //         showDisabledIcon: false,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Please select at least one option',
    //       },
    //       additionalInfo: 'This setting affects theme preference',
    //     },
    //     customValidation: {
    //       function: 'validateThemeSelection',
    //       message: 'Invalid theme selected',
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '883c80d5-8c8f-43ff-9f72-b1e1268fe41e',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '48451ec1-679c-49ae-829d-653031cc4a94',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'db26f842-bef7-43c9-9b11-c0729cd72c13',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: '21470d9d-7288-49f8-addb-9e6a7ef80df8',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '64119402-b0b0-433a-8478-9c83363a64ad',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: '1c7c6e44-760b-4615-bd16-59a14400b173',
    //             value: 'london',
    //           },
    //           {
    //             id: 'cc37b2c9-232a-4587-ab81-76497b4bf9f5',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Defalut value',
    //     name: 'Defalut value',
    //     label: 'Defalut value',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Select your Defalut value',
    //     placeholder: 'Defalut value',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: false,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: {
    //         id: 'db26f842-bef7-43c9-9b11-c0729cd72c13',
    //         value: 'hong kong',
    //       },
    //       autoFill: true,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'department',
    //           operator: 'not_equals',
    //           value: 'hr',
    //           message: 'Only for non-HR users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: 'user',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Select at least one',
    //       },
    //     },
    //     customValidation: {
    //       function: 'validateRole',
    //       message: 'Invalid role selected',
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '48fc7e8b-f91e-4a33-a355-44a91eece296',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '5de2a618-2fda-4501-9260-1df04015d169',
    //             value: 'delhi',
    //           },
    //           {
    //             id: '9d7e39b4-c9be-497a-b0c9-ea6775f33139',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: 'bd3c9c45-1cc3-45a7-82ac-3e5c1bde8970',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '5bc8c0d3-f21f-4e2f-bf21-31de11fb340a',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: 'fd0c8fc4-8cdc-4596-a314-f80ed605f9e2',
    //             value: 'london',
    //           },
    //           {
    //             id: 'c4a36311-37d0-4b84-b2b7-a4d551eb5136',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Dropdown Position (top)',
    //     name: 'Dropdown Position (top)',
    //     label: 'Dropdown Position (top)',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Select your Dropdown Position (top)',
    //     placeholder: 'Dropdown Position (top)',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: false,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'department',
    //           operator: 'not_equals',
    //           value: 'hr',
    //           message: 'Only for non-HR users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'top',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: 'user',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Select at least one',
    //       },
    //     },
    //     customValidation: {
    //       function: 'validateRole',
    //       message: 'Invalid role selected',
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: 'd1dbb694-148b-4e03-a154-97fafd3ad28e',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '7767c237-e276-4cbc-b2fa-dcf0b3dd8950',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'f62ebf6d-ee6d-4d10-9142-76310658d223',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: 'd41dfdff-bb30-4a4d-9dde-c29de6c6d0a2',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '0a226842-847c-4628-b2fb-f887abe90011',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: 'd3149557-56c6-432b-accb-d4f2a2572f9a',
    //             value: 'london',
    //           },
    //           {
    //             id: 'e7d5eebd-05a0-4877-acad-514bf53e88cd',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Dropdown Position (Left)',
    //     name: 'Dropdown Position (Left)',
    //     label: 'Dropdown Position (Left)',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Select your Dropdown Position (Left)',
    //     placeholder: 'Dropdown Position (Left)',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: false,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'department',
    //           operator: 'not_equals',
    //           value: 'hr',
    //           message: 'Only for non-HR users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'left',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: 'user',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Select at least one',
    //       },
    //     },
    //     customValidation: {
    //       function: 'validateRole',
    //       message: 'Invalid role selected',
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '0fc6f98f-46f7-4220-97ea-c742eae02da9',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: 'a3be43fb-3224-4fe0-9a73-dffd469aa50e',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'df3c7ca0-bc84-41f6-a1a9-d126fd780043',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: 'c2716347-c84a-4f1c-88b4-73f7e236bf88',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '1d4ac15f-0631-4f5e-af98-7cf1a57e5683',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: 'f1ec5898-a27e-4aa8-800c-1787f7ea4097',
    //             value: 'london',
    //           },
    //           {
    //             id: 'efbd1e43-26a6-4bb9-8d38-b4f56df3e188',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Dropdown Position (Right)',
    //     name: 'Dropdown Position (Right)',
    //     label: 'Dropdown Position (Right)',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Select your Dropdown Position (Right)',
    //     placeholder: 'Dropdown Position (Right)',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: false,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'department',
    //           operator: 'not_equals',
    //           value: 'hr',
    //           message: 'Only for non-HR users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'right',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: 'user',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Select at least one',
    //       },
    //     },
    //     customValidation: {
    //       function: 'validateRole',
    //       message: 'Invalid role selected',
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: 'd6197bc9-72b5-4f35-814b-699dffff8917',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '87db2b8e-b0f0-446e-ba79-99ceb9ce6c4a',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'fb19275a-fb41-413c-b3e6-0b112d3036d5',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: '4ed3e024-c35f-474e-bdb0-aefd66271c79',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '54d986e6-1c00-49f8-8de8-71a59255d108',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: '43ae0cbf-c68d-4694-9a9b-b8c075ac41a2',
    //             value: 'london',
    //           },
    //           {
    //             id: '3ec98eb9-bb67-49a9-a1d6-cada852852b1',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Copy Past Restriction',
    //     name: 'Copy Past Restriction',
    //     label: 'Copy Past Restriction',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Select your Copy Past Restriction',
    //     placeholder: 'Copy Past Restriction',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: false,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'department',
    //           operator: 'not_equals',
    //           value: 'hr',
    //           message: 'Only for non-HR users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: 'user',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Select at least one',
    //       },
    //     },
    //     customValidation: {
    //       function: 'validateRole',
    //       message: 'Invalid role selected',
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: 'd688e1a3-c338-4050-98e0-c556b0f1fa4b',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '24cf5c73-baeb-4825-a285-ed0e33c9d66b',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'b4bd8790-7401-449c-b900-38bc0e3fb5ce',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: '3ee259c1-3d33-4b53-8821-3aa869f7a6e9',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '3f0acac0-b898-43ed-8fe6-a5550699004e',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: '82013969-80e7-47be-a624-3a6cf1911fde',
    //             value: 'london',
    //           },
    //           {
    //             id: 'b36ad232-328c-4f69-a5b6-771c07b382d2',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Disabled Dropdown',
    //     name: 'Disabled Dropdown',
    //     label: 'Disabled Dropdown',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Select your Disabled Dropdown',
    //     placeholder: 'Disabled Dropdown',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: false,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'department',
    //           operator: 'not_equals',
    //           value: 'hr',
    //           message: 'Only for non-HR users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: 'user',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Select at least one',
    //       },
    //     },
    //     customValidation: {
    //       function: 'validateRole',
    //       message: 'Invalid role selected',
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     isDisabled: true,
    //     isReadOnly: false,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: 'd294df31-eefa-49ed-9281-57f74fa7fe54',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '4ae2ef89-12da-40c9-833a-428d9be56710',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'f3be898c-75a3-44a4-81df-9fe6550b83f3',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: 'c5a925ee-6057-448c-a30b-37d03c284870',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: '2f1db350-0fc1-452b-ac7b-0c2717ef4dfd',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: '25b9c346-5222-4d5a-acb4-deea6eb64f57',
    //             value: 'london',
    //           },
    //           {
    //             id: '81f25893-39f4-4477-8f2d-e89b5b1f3c89',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Read Only Dropdown',
    //     name: 'Read Only Dropdown',
    //     label: 'Read Only Dropdown',
    //     type: 'select',
    //     value: undefined,

    //     variant: 'group',
    //     description: 'Select your Read Only Dropdown',
    //     placeholder: 'Read Only Dropdown',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: false,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: {
    //         id: '25b9c346-5222-4d5a-acb4-deea6eb64f57',
    //         value: 'london',
    //       },
    //       autoFill: true,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'department',
    //           operator: 'not_equals',
    //           value: 'hr',
    //           message: 'Only for non-HR users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: 'user',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Select at least one',
    //       },
    //     },
    //     customValidation: {
    //       function: 'validateRole',
    //       message: 'Invalid role selected',
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: true,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '83886b38-820b-4357-bd70-625eda1a0578',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: '00b57ce5-cdae-47b3-abad-44ff027fd43c',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'f17ab8ab-d1d5-4273-8e36-e721ca20cccd',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: '0655c293-1f5f-4b42-820d-5b5047f0681f',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: 'e6a3d4d2-3c2f-4c38-a632-8af1a1c0042e',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: 'b1edd6d6-ab89-4cbf-9482-d714da1d64ef',
    //             value: 'london',
    //           },
    //           {
    //             id: '830e1d5b-848e-4060-80d9-dcd6545b4e4a',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     tableId: '57baa795-2661-4339-96b3-51e87f3840bc',
    //     fieldId: 'Read Only Dropdown without Value',
    //     name: 'Read Only Dropdown without Value',
    //     label: 'Read Only Dropdown without Value',
    //     type: 'select',
    //     value: undefined,
    //     variant: 'group',
    //     description: 'Select your Read Only Dropdown without Value',
    //     placeholder: 'Read Only Dropdown without Value',
    //     dataSource: 'static',
    //     isRequired: {
    //       value: false,
    //       message: '',
    //     },
    //     autoPopulate: {
    //       defaultValue: undefined,
    //       autoFill: false,
    //     },
    //     conditionalLogic: {
    //       showWhen: [
    //         {
    //           field: 'department',
    //           operator: 'not_equals',
    //           value: 'hr',
    //           message: 'Only for non-HR users',
    //         },
    //       ],
    //     },
    //     design: {
    //       icon: {
    //         enabled: true,
    //         position: 'right',
    //       },
    //       dropdown: {
    //         position: 'bottom',
    //       },
    //       optionIcon: {
    //         enabled: true,
    //         iconName: 'user',
    //         position: 'left',
    //         showDisabledIcon: true,
    //         disabledIconPosition: 'right',
    //       },
    //     },
    //     validation: {
    //       minLength: {
    //         value: 1,
    //         message: 'Select at least one',
    //       },
    //     },
    //     customValidation: {
    //       function: 'validateRole',
    //       message: 'Invalid role selected',
    //     },
    //     security: {
    //       fieldLevelSecurity: 'visible',
    //       auditEnabled: true,
    //     },
    //     behavior: {
    //       copyPasteRestriction: true,
    //     },
    //     isDisabled: false,
    //     isReadOnly: true,
    //     isVisible: true,
    //     auditLog: true,
    //     options: [
    //       {
    //         id: '897422f6-3de6-49bd-b146-ded371784835',
    //         group: 'Aisa',
    //         isOpen: true,
    //         items: [
    //           {
    //             id: 'ebce932c-dc29-485e-9f11-5ce27b8ee369',
    //             value: 'delhi',
    //           },
    //           {
    //             id: 'ed8ffa1c-91d5-4d22-a9df-96b3853021e6',
    //             value: 'hong kong',
    //           },
    //           {
    //             id: '33880be7-847d-44cc-b9e1-0f4320fd158d',
    //             value: 'tokyo',
    //             disabled: true,
    //           },
    //         ],
    //       },
    //       {
    //         id: 'f6ea84d1-d76e-46c1-a1bc-2d32dc7f2459',
    //         group: 'Europe',
    //         items: [
    //           {
    //             id: '8f5e34b8-02ee-4806-afd0-366daad76308',
    //             value: 'london',
    //           },
    //           {
    //             id: '4fd9d32b-ac3f-40cc-80ee-19c3a2b4a743',
    //             value: 'moscow',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
};
