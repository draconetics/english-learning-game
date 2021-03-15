import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SentencePage from './pages/sentencePage/SentencePage';
import WordPage from './pages/wordPage/WordPage';
import TranslateWordGame from './pages/translateGame/TranslateWordGame';
import TranslateSentenceGame from './pages/translateGame/TranslateSentenceGame';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <ul className="App__menu">
          <li>
            <Link to="/">Word</Link>
          </li>
          <li>
            <Link to="/sentences">Sentences</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <WordPage />
          </Route>
          <Route path="/sentences">
            <SentencePage />
          </Route>
          <Route path="/game01">
            <TranslateWordGame />
          </Route>
          <Route path="/game02">
            <TranslateSentenceGame />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
