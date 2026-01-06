import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { useMemo, useState } from "react";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navItems: NavItem[];
  navSettings: any;
}

export type NavItem = {
  title: string;
  url?: string;
  icon?: string;
  isActive?: boolean;
  items?: NavItem[];
};

export type SearchItem = {
  label: string;
  url?: string;
};
export function flattenNavItems(
  items: NavItem[],
  parentPath = "",
): SearchItem[] {
  let result: SearchItem[] = [];

  for (const item of items) {
    const currentPath = parentPath
      ? `${parentPath} > ${item.title}`
      : item.title;

    const hasChildren = item.items && item.items.length > 0;
    if (item.url && !hasChildren) {
      result.push({ label: currentPath, url: item.url });
    }

    if (hasChildren) {
      result = result.concat(flattenNavItems(item.items!, currentPath));
    }
  }

  return result;
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === query.toLowerCase();
    return isMatch ? (
      <strong key={index} className="font-bold  ">
        {part}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    );
  });
}

export function SearchCommand({
  open,
  onOpenChange,
  navItems,
  navSettings,
}: SearchCommandProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchItems = useMemo(() => flattenNavItems(navItems), [navItems]);
  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return searchItems.filter((item) =>
      item.label.toLowerCase().includes(query),
    );
  }, [searchTerm, searchItems]);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/15 flex justify-center items-start pt-[75px] p-4"
      onClick={() => {
        onOpenChange(false);
      }}
    >
      <div
        className=" bg-black/15  w-[85%]   md:w-[600px] h-fit rounded-sm "
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Command className=" bg-sidebar rounded-sm">
          <CommandInput
            className="md:w-[600px] pl-[10px] h-[35px] w-[60%] md:h-[50px] font-normal text-foreground rounded-sm cursor-pointer"
            placeholder="Search screen names..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          {searchTerm.length >= 1 && (
            <CommandList className=" p-2  sm:pl-[38px] md:pl-[0px] pl-[34px] hover:bg-transparent bg-sidebar hover:text-primary  data-[selected=true]:bg-transparent ">
              {filteredItems.length === 0 && (
                <CommandEmpty className="text-foreground xs:p-3 sm:p-4 p-0 sm:text-center ">
                  <p className="text-gray-700  text-sm">
                    No matches found for your search. Try rephrasing your query.
                  </p>
                </CommandEmpty>
              )}
              {searchItems.map((item, index) => (
                <CommandItem
                  style={
                    {
                      "--fw": navSettings.textWeight,
                      fontSize: "0.9375rem",
                    } as React.CSSProperties
                  }
                  className="text-foreground bg-sidebar sm:pl-[50px] hover:text-primary hover:bg-transparent data-[selected=true]:bg-transparent cursor-pointer"
                  key={index}
                  onSelect={() => {
                    if (item.url) window.location.href = item.url;
                    onOpenChange(false);
                    setSearchTerm("");
                  }}
                >
                  <span className="hover:text-primary ">
                    {highlightMatch(item.label, searchTerm)}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          )}
        </Command>
      </div>
    </div>
  );
}
