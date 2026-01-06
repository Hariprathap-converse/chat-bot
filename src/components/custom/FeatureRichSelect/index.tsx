// FeatureRichSelect/index.tsx
import dynamic from "next/dynamic";
import { FeatureRichSelectProps } from "@/types/components/select-config.types";

// Dynamically import components for performance (optional)
const DefaultSelect = dynamic(() => import("./default-select"));
const MultiSelect = dynamic(() => import("./multi-select"), { ssr: false });
// const MultiSelectSearch = dynamic(() => import("./MultiSelectSearch"));

const variantMap: Record<
  string,
  React.ComponentType<FeatureRichSelectProps>
> = {
  default: DefaultSelect,
  multiSelect: MultiSelect,
  multiSelectWithSearch: MultiSelect,
};

export const FeatureRichSelect: React.FC<FeatureRichSelectProps> = (props) => {
  const variant = props.config?.variant || "default";
  const SelectComponent = variantMap[variant] || DefaultSelect;

  return <SelectComponent {...props} />;
};

export default FeatureRichSelect;
