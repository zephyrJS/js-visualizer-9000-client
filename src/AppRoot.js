/* @flow */
import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';

import Header from './components/Header';
import RunOrEditButton from './components/RunOrEditButton';
import ExampleSelector from './components/ExampleSelector';
import CodeEditor from './components/CodeEditor';
import CallStack from './components/CallStack';
import TaskQueue from './components/TaskQueue';
import MicrotaskQueue from './components/MicrotaskQueue';
import ExecutionModelStepper from './components/ExecutionModelStepper';
import StatsTable from './components/StatsTable';
import FabControls from './components/FabControls';

const theme = createMuiTheme({
  palette: {
    primary: yellow,
    secondary: blue,
  },
});

const styles = {
  container: {
    backgroundColor: blueGrey['100'],
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  codeControlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRightContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
};

const AppRoot = ({
  classes,
  mode,
  code,
  tasks,
  microtasks,
  frames,
  markers,
  isAutoPlaying,
  hasReachedEnd,
  currentStep,
  onChangeCode,
  onClickRun,
  onClickEdit,
  onClickPauseAutoStep,
  onClickAutoStep,
  onClickStepBack,
  onClickStep,
}: {|
  mode: 'editing' | 'running' | 'visualizing',
  code: string,
  tasks: { id: string, name: string }[],
  microtasks: { name: string }[],
  frames: { name: string }[],
  markers: { start: number, end: number }[],
  isAutoPlaying: boolean,
  hasReachedEnd: boolean,
  currentStep: 'runTasks' | 'runMicrotasks' | 'rerender',
  onChangeCode: string => any,
  onClickRun: void => any,
  onClickEdit: void => any,
  onClickPauseAutoStep: void => any,
  onClickAutoStep: void => any,
  onClickStepBack: void => any,
  onClickStep: void => any,
|}) => (
  <MuiThemeProvider theme={theme}>
    <div style={styles.container}>

      <div style={styles.leftContainer}>
        <Header />
        <div style={styles.codeControlsContainer}>
          {/*// TODO: Disable this while "running"*/}
          <ExampleSelector />
          <RunOrEditButton
            mode={mode}
            onClickRun={onClickRun}
            onClickEdit={onClickEdit}
          />
        </div>
        <CodeEditor
          code={code}
          markers={markers}
          locked={mode !== 'editing'}
          onChangeCode={onChangeCode}
        />
      </div>

      <div style={styles.rightContainer}>
        <div>
          <TaskQueue tasks={tasks} />
          <MicrotaskQueue microtasks={microtasks} />
        </div>
        <div style={styles.bottomRightContainer}>
          <CallStack frames={frames} />
          <ExecutionModelStepper step={currentStep} />
          <StatsTable />
        </div>
      </div>

      <FabControls
        visible={mode === 'visualizing'}
        isAutoPlaying={isAutoPlaying}
        hasReachedEnd={hasReachedEnd}
        onClickPauseAutoStep={onClickPauseAutoStep}
        onClickAutoStep={onClickAutoStep}
        onClickStepBack={onClickStepBack}
        onClickStep={onClickStep}
      />

    </div>
  </MuiThemeProvider>
);

export default AppRoot;
