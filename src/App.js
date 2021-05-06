import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import NotFoundPage from "./Pages/NotFoundPage";
import LogoutPage from "./Pages/LogoutPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Switch>
         <Route exact path="/" component={HomePage}/>
         <Route path="/login" component={LoginPage}/>
         <Route path="/register" component={RegisterPage}/>
         <Route path="/logout" component={LogoutPage}/>
         <Route path="/verify-mail/:emailVerificationToken" component={EmailVerificationPage}/>
         <Route path="*" component={NotFoundPage}/>
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
