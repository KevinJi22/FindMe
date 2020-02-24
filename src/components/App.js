import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchBar from './SearchBar';
import BusinessList from './BusinessList';
import NotFound from './NotFound';

const App = () => {
  const [input, setInput] = useState('');
  const [focus, setFocus] = useState(null);

  const handleOutsideClick = e => {
    if (e.target.nodeName !== 'INPUT') {
      setFocus(null);
    }
  };

  return (
    <div>
      <Router>
        <SearchBar
          input={input}
          setInput={setInput}
          focus={focus}
          setFocus={setFocus}
          handleOutsideClick={handleOutsideClick}
        />
        <Switch>
          <Route
            exact
            path="/"
            // render={props => (
            //   <Home/>
            // )}
          />
          <Route
            path="/search/:termID/:locID/:pageID"
            render={props => (
              <BusinessList
                {...props}
                handleOutsideClick={handleOutsideClick}
              />
            )}
          />
          <Route
            render={props => (
              <NotFound {...props} handleOutsideClick={handleOutsideClick} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
