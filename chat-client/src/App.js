import {useState, useEffect} from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import './styles/main.css';
import Chatbox from "./components/chatroom/Chatbox";
import Home from "./components/Home";
import {tokenCheck} from "./utils/auth";

function App() {
  const [user, setUser] = useState({id: '', username: ''})

  useEffect(() => {
    tokenCheck(setUser)
  }, [])

  return (
    <div className="main-container">
      <Switch>
        <Route path='/' exact>
          <Home user={user} setUser={setUser}/>
        </Route>
        <Route path='/chat/:chatid'>
          <Chatbox user={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
