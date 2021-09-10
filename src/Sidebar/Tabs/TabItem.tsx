import React from "react";
import styles from './TabItem.module.scss';
import { TabItemProps } from "./Tabs";
var classNames = require('classnames');

export const TabItem: React.FC<TabItemProps> = ({ label, selected, onTabClick }) => {
    let cn = classNames(styles.tab_item, { [styles.selected]: selected });
    
    return <div className={cn} onClick={onTabClick ? () => onTabClick() : undefined}>
        {label}
    </div>
}