import React from 'react';
import { StateProvider } from './store/index';
import Pomodoro from './pages/Pomodoro';

const App = (): JSX.Element => (
  <StateProvider>
    <Pomodoro />
  </StateProvider>
);

export default App;
