export class DataMasking {
  private static patterns = {
    ssn: {
      mask: "XXX-XX-XXXX",
      regex: /^(\d{3})-?(\d{2})-?(\d{4})$/,
      format: (value: string) =>
        value.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3"),
    },
    "credit-card": {
      mask: "XXXX XXXX XXXX XXXX",
      regex: /^(\d{4})\s?(\d{4})\s?(\d{4})\s?(\d{4})$/,
      format: (value: string) =>
        value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4"),
    },
    phone: {
      mask: "(XXX) XXX-XXXX",
      regex: /^(\d{3})(\d{3})(\d{4})$/,
      format: (value: string) =>
        value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"),
    },
    email: {
      mask: "XXX@XXXX.com",
      regex: /^([^@]+)@([^.]+)\.(.+)$/,
      format: (value: string) => value,
    },
    license: {
      mask: "XXX-XXX-XXXX",
      regex: /^([A-Z0-9]{3})-?([A-Z0-9]{3})-?([A-Z0-9]{4})$/,
      format: (value: string) =>
        value.replace(/([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})/, "$1-$2-$3"),
    },
    passport: {
      mask: "XXXXXXXXX",
      regex: /^([A-Z0-9]{9})$/,
      format: (value: string) => value.toUpperCase(),
    },
  };

  static maskValue(
    value: string,
    config: any,
    scenario: "display" | "edit" | "export" | "print" = "display",
  ): string {
    if (!config.enabled || !value) return value;

    const scenarioConfig = config.scenarios?.[scenario] || "partial";
    if (scenarioConfig === "full") return value;
    if (scenarioConfig === "masked") {
      return value.replace(/./g, config.maskChar || "X");
    }

    const {
      pattern,
      maskChar = "X",
      showFirst = 0,
      showLast = 0,
      customPattern,
      preserveFormat,
    } = config;

    if (pattern === "custom" && customPattern) {
      return this.applyCustomMask(
        value,
        customPattern,
        maskChar,
        showLast,
        showFirst,
      );
    }

    const patternConfig = this.patterns[pattern as keyof typeof this.patterns];
    if (!patternConfig) return value;

    if (pattern === "email") {
      const emailMatch = value.match(/^([^@]+)@([^.]+)\.(.+)$/);
      if (emailMatch) {
        const [, username, domain, tld] = emailMatch;
        const maskedUsername = this.maskPortion(
          username,
          maskChar,
          showFirst,
          showLast,
        );
        const maskedDomain = this.maskPortion(
          domain,
          maskChar,
          0,
          Math.min(2, domain.length),
        );
        return `${maskedUsername}@${maskedDomain}.${tld}`;
      }
    }

    let formatted = value;
    if (preserveFormat) {
      formatted = patternConfig.format(value.replace(/\D/g, ""));
    }

    if (showFirst > 0 || showLast > 0) {
      return this.maskPortion(formatted, maskChar, showFirst, showLast);
    }

    return formatted.replace(/\d/g, maskChar);
  }

  private static maskPortion(
    value: string,
    maskChar: string,
    showFirst: number,
    showLast: number,
  ): string {
    if (value.length <= showFirst + showLast) return value;

    const firstPart = value.slice(0, showFirst);
    const lastPart = value.slice(-showLast);
    const middlePart = value.slice(showFirst, -showLast || value.length);
    const maskedMiddle = middlePart.replace(/[A-Za-z0-9]/g, maskChar);

    return firstPart + maskedMiddle + lastPart;
  }

  static applyCustomMask(
    value: string,
    pattern: string,
    maskChar: string,
    showLast: number,
    showFirst = 0,
  ): string {
    let masked = "";
    let valueIndex = 0;

    for (let i = 0; i < pattern.length && valueIndex < value.length; i++) {
      if (pattern[i] === "X") {
        if (
          (showFirst > 0 && valueIndex < showFirst) ||
          (showLast > 0 && valueIndex >= value.length - showLast)
        ) {
          masked += value[valueIndex];
        } else {
          masked += maskChar;
        }
        valueIndex++;
      } else {
        masked += pattern[i];
      }
    }

    return masked;
  }

  static formatAsUserTypes(value: string, pattern: string): string {
    if (!pattern || pattern === "custom") return value;

    const patternConfig = this.patterns[pattern as keyof typeof this.patterns];
    if (!patternConfig) return value;

    const digitsOnly = value.replace(/\D/g, "");

    switch (pattern) {
      case "ssn":
        if (digitsOnly.length <= 3) return digitsOnly;
        if (digitsOnly.length <= 5)
          return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
        return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(
          3,
          5,
        )}-${digitsOnly.slice(5, 9)}`;

      case "credit-card":
        return digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

      case "phone":
        if (digitsOnly.length <= 3) return digitsOnly;
        if (digitsOnly.length <= 6)
          return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
        return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
          3,
          6,
        )}-${digitsOnly.slice(6, 10)}`;

      case "license":
        const alphaNumeric = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
        if (alphaNumeric.length <= 3) return alphaNumeric;
        if (alphaNumeric.length <= 6)
          return `${alphaNumeric.slice(0, 3)}-${alphaNumeric.slice(3)}`;
        return `${alphaNumeric.slice(0, 3)}-${alphaNumeric.slice(
          3,
          6,
        )}-${alphaNumeric.slice(6, 10)}`;

      default:
        return value;
    }
  }

  static unmaskValue(maskedValue: string): string {
    return maskedValue.replace(/[^\w@.-]/g, "");
  }

  static validateMaskedInput(value: string, pattern: string): boolean {
    const patternConfig = this.patterns[pattern as keyof typeof this.patterns];
    if (!patternConfig) return true;

    if (pattern === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    const cleanValue = value.replace(/\D/g, "");
    return patternConfig.regex.test(cleanValue);
  }
}
