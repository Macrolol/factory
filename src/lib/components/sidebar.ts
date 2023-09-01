import type { ComponentType } from "svelte";

export interface SidebarOption{
    name: string;
    icon: ComponentType | string;
    path?: string;
    nested_links?: SidebarOption[];
}
