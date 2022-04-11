import Tab from '../../components/Tab.jsx'
import React from 'react'


const Desarrollo = () => {

  const tabContent =[
    {
      title:"Chennai",
      content:"fdfd"
    },
    {
      title:"Chennai",
      content:"asrfafaf"
    },
    {
      title:"Chennai",
      content:"fdfd"
    },
  ]

  return (
    <div>
      Este es el desarrollo web
      <div className="row">
        <div className="col text-center">
          <h2>Tab componenet</h2>
          <div className="row text-left">
            <Tab active={1}>
              {
                tabContent.map((tab,idx)=>(
                  <Tab.TabPane key ={`Tab-${idx}`} tab={tab.title}>
                        {tab.content}
                  </Tab.TabPane>
                  )) 
              }

            </Tab>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Desarrollo