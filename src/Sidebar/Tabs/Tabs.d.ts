import React from "react";

export interface TabItemProps {
    label: string;
    selected?: boolean;
    onTabClick?: () => void;
}

// Tab API
export interface ITabValue {
    label: string;              // Text on the tab
    content: React.ReactNode;   // Contents within the pane
}

// Non-empty array of tabs
export type ITabValues = [ITabValue, ...ITabValue[]];

export interface TabGroupProps {
    tabs: ITabValues;
}