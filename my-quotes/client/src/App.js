import './App.css';
import Tags from './components/tags'
import  Quotes from './components/quotes';
import { Switch, Route,useLocation } from 'react-router-dom';
import { ApolloProvider} from '@apollo/client';
// import { useApolloClient } from '@apollo/client';
import {useEffect} from 'react'

function App({client}) {
  let location = useLocation()
  // const client = useApolloClient();
  
  useEffect(
    () => {
      client.cache.evict({ fieldName: 'me' });
      client.cache.gc();
      client.cache.reset();
client.resetStore(); //
    },
    [location]
  )
  
  return (
    <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/" component={Tags} />
          <Route
            exact
            path={`/quotes/:tag`}
            component={Quotes}
          />
        </Switch>
  </ApolloProvider>
  );
}

export default App;
