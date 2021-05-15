import React from 'react'
import css from './HomePage.module.css'
import QueueMusic_Container from './QueueMusic/QueueMusic_Contanier'


const HomePage =props => {

return (
  
  <div className={css.HomePage}>
        <QueueMusic_Container/>
  </div>
)

}

export default HomePage