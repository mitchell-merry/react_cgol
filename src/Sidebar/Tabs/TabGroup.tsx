import React, { useState } from "react";
import styles from './TabGroup.module.scss';
import { TabItem } from "./TabItem";
import { TabGroupProps } from "./Tabs";
var classNames = require('classnames');

export const TabGroup: React.FC<TabGroupProps> = ({ tabs }) => {
    const [ currentTabIdx, setCurrentTabIdx ] = useState(0);

    let cn = classNames();
    
    return <div className={styles.tab_group}>
        <div className={styles.tab_item_row}>
            {tabs.map((tab, tabIdx) => (
                <TabItem key={tabIdx}
                    label={tab.label}
                    selected={currentTabIdx === tabIdx}
                    onTabClick={() => setCurrentTabIdx(tabIdx)}
                />
            ))}
        </div>
        <div className={styles.content}>
            {tabs[currentTabIdx].content}
        </div>
    </div>
}