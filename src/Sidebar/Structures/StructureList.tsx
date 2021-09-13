import React from "react";
import { IControlFunctions } from "../../globals";
import { IStructure } from "./StructureData";
import styles from './StructureList.module.scss';
var classNames = require('classnames');

export interface StructureListProps {
    structures: IStructure[];
    controlFunctions: React.MutableRefObject<IControlFunctions>;
}

export const StructureList: React.FC<StructureListProps> = ({ structures, controlFunctions }) => {
    let cn = classNames(styles.structure_list);
    
    return <div className={cn}>
        {structures.map((structure, i) => (
            <div className={styles.structure} key={i} onClick={() => controlFunctions.current.loadStructure ? controlFunctions.current.loadStructure(structure.cells):null}>
                {structure.name}
            </div>
        ))}
    </div>
}