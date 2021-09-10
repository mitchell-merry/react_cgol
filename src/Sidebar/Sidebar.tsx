import React from "react";
import { IControlFunctions } from "../globals";
import { Controls } from "./Controls/Controls";
import styles from './Sidebar.module.scss';
import { TabGroup } from "./Tabs/TabGroup";
import { ITabValues } from "./Tabs/Tabs";
var classNames = require('classnames');

export interface SidebarProps { 
    controlFunctions: React.MutableRefObject<IControlFunctions>;
}

export const Sidebar: React.FC<SidebarProps> = ({ controlFunctions }) => {
    let cn = classNames(
        styles.controls
    );

    const tabs: ITabValues = [
        {
            label: "Controls",
            content: <Controls controlFunctions={controlFunctions} />
        },
        {
            label: "Structures",
            content: <>YO</>
        }
    ]

    return <div className={cn}>
        <TabGroup tabs={tabs} />
    </div>
}