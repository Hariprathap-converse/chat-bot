import { CrossFieldValidation } from "@/types/components/form-config.type";

export class CrossFieldValidator {
  static validate(
    fieldValue: any,
    validation: CrossFieldValidation,
    formData: Record<string, any>,
  ): string | null {
    const {
      dependsOn,
      rule,
      value,
      errorMessage,
      caseSensitive = true,
      minDifference,
      maxDifference,
    } = validation;

    const dependentValues = dependsOn.map((fieldName) => formData[fieldName]);

    if (
      dependentValues.some(
        (val) => val === undefined || val === null || val === "",
      )
    ) {
      if (rule !== "not_equals" && rule !== "different_day") return null;
    }

    switch (rule) {
      case "equals":
        const compareValue = value !== undefined ? value : dependentValues[0];
        const fieldStr = caseSensitive
          ? String(fieldValue)
          : String(fieldValue).toLowerCase();
        const compareStr = caseSensitive
          ? String(compareValue)
          : String(compareValue).toLowerCase();
        if (fieldStr !== compareStr) {
          return errorMessage || `Must match ${dependsOn[0]}`;
        }
        break;

      case "not_equals":
        const notCompareValue =
          value !== undefined ? value : dependentValues[0];
        const notFieldStr = caseSensitive
          ? String(fieldValue)
          : String(fieldValue).toLowerCase();
        const notCompareStr = caseSensitive
          ? String(notCompareValue)
          : String(notCompareValue).toLowerCase();
        if (notFieldStr === notCompareStr) {
          return errorMessage || `Must not match ${dependsOn[0]}`;
        }
        break;

      case "greater_than":
        const gtValue = value !== undefined ? value : dependentValues[0];
        if (Number(fieldValue) <= Number(gtValue)) {
          return errorMessage || `Must be greater than ${dependsOn[0]}`;
        }
        break;

      case "less_than":
        const ltValue = value !== undefined ? value : dependentValues[0];
        if (Number(fieldValue) >= Number(ltValue)) {
          return errorMessage || `Must be less than ${dependsOn[0]}`;
        }
        break;

      case "greater_equal":
        const geValue = value !== undefined ? value : dependentValues[0];
        if (Number(fieldValue) < Number(geValue)) {
          return (
            errorMessage || `Must be greater than or equal to ${dependsOn[0]}`
          );
        }
        break;

      case "less_equal":
        const leValue = value !== undefined ? value : dependentValues[0];
        if (Number(fieldValue) > Number(leValue)) {
          return (
            errorMessage || `Must be less than or equal to ${dependsOn[0]}`
          );
        }
        break;

      case "contains":
        const containsValue = value !== undefined ? value : dependentValues[0];
        const containsFieldStr = caseSensitive
          ? String(fieldValue)
          : String(fieldValue).toLowerCase();
        const containsSearchStr = caseSensitive
          ? String(containsValue)
          : String(containsValue).toLowerCase();
        if (!containsFieldStr.includes(containsSearchStr)) {
          return errorMessage || `Must contain "${containsValue}"`;
        }
        break;

      case "not_contains":
        const notContainsValue =
          value !== undefined ? value : dependentValues[0];
        const notContainsFieldStr = caseSensitive
          ? String(fieldValue)
          : String(fieldValue).toLowerCase();
        const notContainsSearchStr = caseSensitive
          ? String(notContainsValue)
          : String(notContainsValue).toLowerCase();
        if (notContainsFieldStr.includes(notContainsSearchStr)) {
          return errorMessage || `Must not contain "${notContainsValue}"`;
        }
        break;

      case "starts_with":
        const startsValue = value !== undefined ? value : dependentValues[0];
        const startsFieldStr = caseSensitive
          ? String(fieldValue)
          : String(fieldValue).toLowerCase();
        const startsSearchStr = caseSensitive
          ? String(startsValue)
          : String(startsValue).toLowerCase();
        if (!startsFieldStr.startsWith(startsSearchStr)) {
          return errorMessage || `Must start with "${startsValue}"`;
        }
        break;

      case "ends_with":
        const endsValue = value !== undefined ? value : dependentValues[0];
        const endsFieldStr = caseSensitive
          ? String(fieldValue)
          : String(fieldValue).toLowerCase();
        const endsSearchStr = caseSensitive
          ? String(endsValue)
          : String(endsValue).toLowerCase();
        if (!endsFieldStr.endsWith(endsSearchStr)) {
          return errorMessage || `Must end with "${endsValue}"`;
        }
        break;

      case "after":
        const afterDate = new Date(dependentValues[0]);
        const fieldDate = new Date(fieldValue);
        if (fieldDate <= afterDate) {
          return errorMessage || `Must be after ${dependsOn[0]}`;
        }
        break;

      case "before":
        const beforeDate = new Date(dependentValues[0]);
        const beforeFieldDate = new Date(fieldValue);
        if (beforeFieldDate >= beforeDate) {
          return errorMessage || `Must be before ${dependsOn[0]}`;
        }
        break;

      case "same_day":
        const sameDayDate = new Date(dependentValues[0]);
        const sameDayFieldDate = new Date(fieldValue);
        if (sameDayDate.toDateString() !== sameDayFieldDate.toDateString()) {
          return errorMessage || `Must be on the same day as ${dependsOn[0]}`;
        }
        break;

      case "different_day":
        const diffDayDate = new Date(dependentValues[0]);
        const diffDayFieldDate = new Date(fieldValue);
        if (diffDayDate.toDateString() === diffDayFieldDate.toDateString()) {
          return (
            errorMessage || `Must be on a different day than ${dependsOn[0]}`
          );
        }
        break;

      case "min_difference":
        const minDiffValue = Number(dependentValues[0]);
        const minDiffFieldValue = Number(fieldValue);
        const minActualDiff = Math.abs(minDiffFieldValue - minDiffValue);
        if (minDifference && minActualDiff < minDifference) {
          return (
            errorMessage ||
            `Must have at least ${minDifference} difference from ${dependsOn[0]}`
          );
        }
        break;

      case "max_difference":
        const maxDiffValue = Number(dependentValues[0]);
        const maxDiffFieldValue = Number(fieldValue);
        const maxActualDiff = Math.abs(maxDiffFieldValue - maxDiffValue);
        if (maxDifference && maxActualDiff > maxDifference) {
          return (
            errorMessage ||
            `Must have at most ${maxDifference} difference from ${dependsOn[0]}`
          );
        }
        break;

      default:
        return null;
    }

    return null;
  }

  static validateMultiple(
    fieldValue: any,
    validations: CrossFieldValidation[],
    formData: Record<string, any>,
  ): string | null {
    for (const validation of validations) {
      const error = this.validate(fieldValue, validation, formData);
      if (error) return error;
    }
    return null;
  }
}
