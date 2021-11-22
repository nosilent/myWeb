import './App.css'
import './assets/common.css'
import Header from './common/Header'
import Menu from './common/Menu'
import Main from './common/Main'
import Err404 from './common/404'
import axios from 'axios'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useState,useEffect, useRef } from 'react'

function App() {
  const [tabs,setTabs] = useState([])
  const [config,setConfig] = useState(null)
  const [menu,setMenu] = useState([])

  const rMenu = useRef()
  const rContent = useRef()
  const initLocation = ()=>{
    rMenu.current.scrollTop = 0
    rContent.current.scrollTop = 0
  }
  const menuTo = e =>{
    if(e.target.tagName === 'A'){
      e.target.defaultprevent()
    }
    if(e.target.tagName === 'P'){
      let flag = e.target.dataset.a
      let current = rContent.current.querySelector(`.${flag}`)
      rContent.current.scrollTop = current.offsetTop - 48
    }
  }
  useEffect(()=>{
    axios.get('/build/config.json').then(res =>{
      setTabs(res.data.navData||[])
      setConfig(res.data||{})
    } )
  },[])
  return (
    <div className='app'>
      <Header tabs={ tabs }></Header>
      {
        config 
        && 
        <div className='main'>
          <div className='menu' ref={rMenu} onClick={menuTo}>
            <Menu menu={menu}></Menu>
          </div>
          <div className='content' ref={rContent}>
              <Switch>
                <Route exact path={`/${config.docs}/:name`} render={ props=><Main  {...props} setMenu={setMenu} initLocation={initLocation} /> }></Route>
                <Route path='/404' component={ Err404 }></Route>
                <Redirect from='/' to={ `/${config.docs}/${config.index}` }></Redirect>
              </Switch>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
