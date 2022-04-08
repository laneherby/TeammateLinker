import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import './styles/index.css';
import './fonts/Kanit-BoldItalic.ttf';
import './fonts/Kanit-Bold.ttf';
import 'typeface-roboto';
import { DataProvider } from './context/MainContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#303030"
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <DataProvider>
      <App />
    </DataProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
