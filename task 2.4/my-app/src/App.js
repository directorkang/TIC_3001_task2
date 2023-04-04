// App.js

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import ContactDetail from './ContactDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ContactList} />
        <Route path="/add" exact component={ContactForm} />
        <Route path="/edit/:id" exact component={ContactForm} />
        <Route path="/:id" exact component={ContactDetail} />
      </Switch>
    </Router>
  );
}

export default App;
