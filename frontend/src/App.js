import React, { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Router from "./components/router/index";
import axios from "axios";
import { getUser } from './actions/user.actions';
import { useDispatch } from 'react-redux';

const App = () => {
  const [uid, setuid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() =>{
    const fetchToken = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}me`,
      withCredentials: true
    })
      .then(res => {
        console.log(res); 
        setuid(res.data)
      })
      .catch(error => console.log("No token"))
    }
    fetchToken();

    if (uid) dispatch(getUser(uid))

  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Router/>
    </UidContext.Provider>
  );
};

export default App;
