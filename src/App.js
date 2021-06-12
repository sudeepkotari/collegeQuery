import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import NotFoundPage from "./Pages/NotFoundPage";
import LogoutPage from "./Pages/LogoutPage";
import Questions from "./Pages/Questions";
import ProfilePage from './Pages/ProfilePage';
import PostPage from './Pages/PostPage';
import MyPostContextProvider from './Contexts/MyPostContext';
import EditProfile from './Pages/EditProfile';

const client = new ApolloClient({
  uri: 'https://college-query.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
      <BrowserRouter>
      <MyPostContextProvider>
       <Switch>
         <Route exact path="/" component={HomePage}/>
         <Route path="/login" component={LoginPage}/>
         <Route path="/register" component={RegisterPage}/>
         <Route path="/logout" component={LogoutPage}/>
         <Route path="/questions" component={Questions}/>
         <Route path="/profile" component={ProfilePage}/>
         <Route path="/editprofile" component={EditProfile}/>
         <Route path="/verify-mail/:emailVerificationToken" component={EmailVerificationPage}/>
         <Route path="/post/:postId" component={ PostPage }/>
         <Route path="*" component={NotFoundPage}/>
       </Switch>
       </MyPostContextProvider>
      </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
