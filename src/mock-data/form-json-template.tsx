export const template = {
  form: {
    ids: {
      formId: "e83c9b3f-4542-4bee-8283-04c7b25425e5",
      moduleId: "44b8cc54-7531-42ff-8381-13413728fe1d",
      screenId: "580590e8-410d-4b2b-9ec2-6525be6944e1",
    },
    formName: "userProfile",
    formType: "basic",
    layout: {
      gridCols: "auto",
      labelPosition: "top",
    },
    mode: "edit",
    viewMode: false,
    editMode: false,
    fontSize: "medium",
    formHeader: {
      header: "User Profile",
      title: "Create or Update Your Profile",
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
            id: "9a4eb471-abb5-41d0-998f-38cdc3ab9acd",
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
    ],
  },
};
export const template2 = {
  form: {
    ids: {
      formId: "e83c9b3f-4542-4bee-8283-04c7b25425e5",
      moduleId: "44b8cc54-7531-42ff-8381-13413728fe1d",
      screenId: "580590e8-410d-4b2b-9ec2-6525be6944e1",
    },
    formName: "userProfile",
    formType: "stepper",
    breadcrumbs: [
      { label: "Employee Details", url: "/employee/details" },
      { label: "Create Employee Details" },
    ],
    mode: "create",
    layout: {
      gridCols: "auto",
      labelPosition: "top",
    },
    viewMode: false,
    editMode: false,
    fontSize: "small",
    formHeader: {
      header: "Employee Details",
      title: "On Board Employee With Details",
    },
    stepper: {
      steps: [
        {
          id: 1,
          key: "basic",
          label: "Basic Info",
          fields: [
            {
              tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
              rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
              fieldId: "email",
              id: "email",
              name: "email",
              label: "Email",
              type: "email",
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
                pattern: "a-zA-Z0-9@._-",
              },
              autoPopulate: {
                autofill: true,
                defaultValue:
                  "sivaaselvan@conversedatasolutons.onmicrosoft.com",
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
              fieldId: "disabled",
              id: "disabled",
              name: "disabled",
              label: "Disabled mode",
              type: "text",
              placeholder: "Enter full name",
              isDisabled: true,
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
                additionalInfo: "",
              },
              autoPopulate: {
                autofill: false,
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
          ],
        },
        {
          id: 2,
          key: "work",
          label: "Work Details",
          fields: [
            {
              tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
              rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
              fieldId: "username",
              id: "username",
              name: "username",
              label: "Username",
              type: "text",
              placeholder: "Enter your username",
              helperText: "Unique identifier for login",
              isDisabled: false,
              isRequired: {
                value: true,
              },
              validation: {
                minLength: {
                  value: 3,
                },
                maxLength: {
                  value: 20,
                },
                additionalInfo: "Must be alphanumeric",
              },
              autoPopulate: {
                autofill: true,
                defaultValue: "user123",
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
              fieldId: "password",
              id: "password",
              name: "password",
              label: "Password",
              type: "password",
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
                autofill: false,
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
              placeholder: "XXX-XX-XXXX",
              helperText: "Masked for privacy",
              isRequired: {
                value: false,
              },
              autoPopulate: {
                autofill: false,
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
          ],
        },
        {
          id: 3,
          key: "bank",
          label: "Bank Information",
          fields: [
            {
              tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
              rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
              fieldId: "firstName",
              id: "firstName",
              name: "firstName",
              label: "Full Name",
              type: "text",
              placeholder: "Enter full name",
              helperText:
                "Your legal first name as it appears on official documents",
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
                autofill: false,
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
              fieldId: "lastName",
              id: "lastName",
              name: "lastName",
              label: "Last Name",
              type: "text",
              placeholder: "Enter Last name",
              helperText:
                "Your legal first name as it appears on official documents",
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
              },
              autoPopulate: {
                autofill: false,
                defaultValue: "James",
              },
              behavior: {
                showCharCounter: false,
                showClearIcon: false,
                spellCheck: false,
                autoTrim: true,
              },
              security: {
                auditEnabled: true,
              },
            },
          ],
        },
        {
          id: 4,
          key: "review",
          label: "Review & Submit",
          fields: [
            {
              tableId: "25d83010-1d30-4a4b-b83c-fef4d46c95fa",
              rowId: "b885246c-4ef8-4e78-984b-5a50bfbdb0c9",
              fieldId: "firstName",
              id: "firstName",
              name: "firstName",
              label: "Full Name",
              type: "text",
              placeholder: "Enter full name",
              helperText:
                "Your legal first name as it appears on official documents",
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
                autofill: false,
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
              fieldId: "lastName",
              id: "lastName",
              name: "lastName",
              label: "Last Name",
              type: "text",
              placeholder: "Enter Last name",
              helperText:
                "Your legal first name as it appears on official documents",
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
              },
              autoPopulate: {
                autofill: false,
                defaultValue: "James",
              },
              behavior: {
                showCharCounter: false,
                showClearIcon: false,
                spellCheck: false,
                autoTrim: true,
              },
              security: {
                auditEnabled: true,
              },
            },
          ],
        },
        {
          id: 5,
          key: "basic",
          label: "identification",
          fields: [
            {
              id: "email",
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "Enter your email",
              helperText: "Please enter a valid email address",
              isDisabled: false,
              isRequired: {
                value: true,
              },
              validation: {
                minLength: { value: 2 },
                maxLength: { value: 50 },
                additionalInfo: "Must be a valid email address",
                pattern: "^[\\w.-]+@[\\w.-]+\\.\\w{2,}$",
              },
              autoPopulate: {
                autofill: true,
                defaultValue: "example@email.com",
              },
              icon: {
                suffix: "email",
              },
              behavior: {
                showCharCounter: false,
                showClearIcon: true,
                spellCheck: false,
                autoTrim: true,
              },
              security: {
                auditEnabled: true,
              },
            },
            {
              id: "firstName",
              name: "firstName",
              label: "First Name",
              type: "text",
              placeholder: "Enter your first name",
              isDisabled: false,
              isRequired: {
                value: true,
              },
              validation: {
                minLength: { value: 2 },
                maxLength: { value: 30 },
              },
              autoPopulate: {
                autofill: false,
                defaultValue: "",
              },
              behavior: {
                showCharCounter: true,
                showClearIcon: true,
                spellCheck: true,
                autoTrim: true,
              },
              security: {
                auditEnabled: true,
              },
            },
          ],
        },
        {
          id: 6,
          key: "preferences",
          label: "Preferences",
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
              helperText:
                "Your legal first name as it appears on official documents",
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
                defaultValue:
                  "sivaaselvan@conversedatasolutons.onmicrosoft.com",
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
                  id: "9a4eb471-abb5-41d0-998f-38cdc3ab9acd",
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
          ],
        },
      ],
    },
  },
};
