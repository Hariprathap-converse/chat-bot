import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const ModelSelection = () => {
  return (
    <Select>
      <SelectTrigger className="bg-card cursor-pointer  focus:ring-0 focus-visible:ring-0 border-none shadow-none  p-2 px-3  transition-colors font-medium rounded-md">
        <SelectValue placeholder="Select model" />
      </SelectTrigger>

      <SelectContent className="bg-card border-none shadow-md rounded-md  pl-1">
        <SelectGroup>
          <SelectLabel>LLM Models</SelectLabel>

          <SelectItem className="cursor-pointer" value="gpt-5">
            GPT-5
          </SelectItem>
          <SelectItem className="cursor-pointer" value="gpt-4.1">
            GPT-4.1
          </SelectItem>
          <SelectItem className="cursor-pointer" value="gpt-4o">
            GPT-4o
          </SelectItem>
          <SelectItem className="cursor-pointer" value="gpt-4o-mini">
            GPT-4o Mini
          </SelectItem>
          <SelectItem className="cursor-pointer" value="deepseek">
            DeepSeek
          </SelectItem>
          <SelectItem className="cursor-pointer" value="claude">
            Claude
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ModelSelection;
