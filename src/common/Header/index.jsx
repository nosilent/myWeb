import  { Menu  } from 'antd'
import { withRouter  } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header(props){
  const [active,setActive] = useState('')

  const subMenu = node =>(
    <Menu.SubMenu  popupOffset={[-50,0]} title={<span>{ node.text } <i className='iconfont icon-xiala'></i> </span>} key={node.text}>
      { node.children.map(item => <Menu.Item key={ item.url }> { item.icon && <svg className="icon" dangerouslySetInnerHTML={{__html:`<use xlink:href="#icon-${item.icon}"></use>`}}></svg> }  { item.text } </Menu.Item>)}
    </Menu.SubMenu>
  )

  const onItemClick = ({ item, key, keyPath, domEvent })=>{
    props.history.push(`/${key}`)
    setActive(key)
  }

  useEffect(()=>{
    setActive(props.location.pathname.slice(1))
  },[])

  return (
    <Menu selectedKeys={[active]} mode="horizontal" className='tc fixed top' triggerSubMenuAction='click' onClick={onItemClick}>
      { 
        props.tabs.map( item => Array.isArray(item.children)
          ? subMenu(item)
          : (<Menu.Item key={ item.url }> { item.icon && <svg className="icon" dangerouslySetInnerHTML={{__html:`<use xlink:href="#icon-${item.icon}"></use>`}}></svg> }  { item.text } </Menu.Item>)
        ) 
      }
    </Menu>
  )
}

export default withRouter(Header)