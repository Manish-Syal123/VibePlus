import { TreeItem } from "@/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

interface TreeViewProps {
  data: TreeItem[];
  value?: string | null;
  onSelect?: (value: string) => void;
}

export const TreeView = ({ data, value, onSelect }: TreeViewProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => (
                  <Tree key={index} item={item} selectedValue={value} onSelect={onSelect} parentPath="" />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
};

interface TreeProps {
  item: TreeItem;
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
  parentPath: string;
}
const Tree = ({ item, selectedValue, onSelect, parentPath }: TreeProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;

  if (!items.length) {
    // It's a file
    const isSelected = selectedValue === currentPath;
    return (
      <SidebarMenuButton
        isActive={isSelected}
        className="flex items-center gap-2 w-full data-[active=true]:bg-accent hover:bg-accent/50"
        onClick={() => onSelect?.(currentPath)}
      >
        <FileIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">{name}</span>
      </SidebarMenuButton>
    );
  }

  // It's a folder
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90" defaultOpen>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex items-center gap-2 w-full">
            <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform" />
            <FolderIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="pl-6 ml-1 border-l border-border/50">
            {items.map((subItem, index) => (
              <Tree
                key={index}
                item={subItem}
                selectedValue={selectedValue}
                onSelect={onSelect}
                parentPath={currentPath}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
