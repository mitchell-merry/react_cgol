import React, { useRef } from 'react';
import styles from './App.module.scss';
import { Sidebar } from './Sidebar/Sidebar';
import { Grid } from './Grid/Grid';
import { IControlFunctions } from './globals';


function App() {
  const controlFunctions = useRef<IControlFunctions>({doWrap: false});
  
  return (
    <div className={styles.App}>
      <Grid controlFunctions={controlFunctions} />
      <Sidebar controlFunctions={controlFunctions} />
    </div>
  );
}

export default App;