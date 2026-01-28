import { FormDefinition, FieldConfig } from "@/types/filed.type";
import { GridCols } from "@/mock-data/form-filed-json";

export function transformBackendFormToDefinition(backendData: any): FormDefinition {
    const { intent, fields, action } = backendData;

    // Format intent for header (e.g., "apply_leave" -> "Apply Leave")
    const formattedHeader = intent
        ? intent
            .split("_")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "Dynamic Form";

    const mappedFields: FieldConfig[] = (fields || []).map((field: any) => ({
        ...field,
        // Ensure basic required properties for FieldConfig if missing
        value: field.value ?? undefined,
        isDisabled: field.isDisabled ?? false,
        isVisible: field.isVisible ?? true,
        isRequired: field.isRequired || { value: false },
        validation: field.validation || {},
        behavior: field.behavior || {},
        security: field.security || {},
        autoPopulate: field.autoPopulate || { autoFill: false },
    }));

    return {
        form: {
            ids: {
                formId: backendData.id || "dynamic-form-id",
                moduleId: "dynamic-module",
                screenId: "dynamic-screen",
            },
            formName: intent || "dynamicForm",
            formType: "basic",
            breadcrumbs: [
                { label: formattedHeader },
            ],
            mode: "create",
            layout: {
                gridCols: "auto" as GridCols,
                labelPosition: "top",
            },
            fontSize: "small",
            formHeader: {
                header: formattedHeader,
                buttonText: intent?.includes("create") || intent?.includes("add") ? "Create" : "Submit",
            },
            viewMode: false,
            editMode: false,
            fields: mappedFields,
        },
    };
}
