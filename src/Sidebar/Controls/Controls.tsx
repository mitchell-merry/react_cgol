import React from "react";
import { IControlFunctions } from "../../globals";
import styles from './Controls.module.scss';
var classNames = require('classnames');

export interface ControlsProps {
    controlFunctions: React.MutableRefObject<IControlFunctions>;
}

export const Controls: React.FC<ControlsProps> = ({ controlFunctions }) => {
    let cn = classNames();
    
    

    return <div className={cn}>
        <button onClick={() => safeCall(controlFunctions.current.advance)}>Advance</button>
        
        <button>Undo</button>
        
        <button>Clear History</button>
        
        <button onClick={() => safeCall(controlFunctions.current.reset)}>Reset</button>

        <button onClick={() => safeCall(controlFunctions.current.randomise)}>Randomise</button>
        <input type="checkbox" />
    </div>
}

function safeCall(func: (() => void) | undefined): void {
    if(func === undefined) return;
    func();
}