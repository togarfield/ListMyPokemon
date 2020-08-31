import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPokemon from './components/ListPokemon';
import DetailPokemon from './components/DetailPokemon';
import Navbar from './components/Navbar';
import MyPokemonList from './components/MyPokemonList';
import { GlobalProvider } from './context/GlobalState';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ListPokemon} />
            <Route exact path="/detailpokemon" component={DetailPokemon} />
            <Route exact path="/mypokemonlist" component={MyPokemonList} />
          </Switch>
        </Router>
      </GlobalProvider>
      <CssBaseline/>
    </ThemeProvider>
  )
}

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f4f5fd'
    }
  }
})

export default App;