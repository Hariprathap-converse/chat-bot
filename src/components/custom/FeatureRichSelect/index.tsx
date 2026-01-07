
import dynamic from "next/dynamic";
import { FeatureRichSelectProps } from "@/types/components/select-config.types";

const DefaultSelect = dynamic(() => import("./default-select"));
const MultiSelect = dynamic(() => import("./multi-select"), { ssr: false });

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
