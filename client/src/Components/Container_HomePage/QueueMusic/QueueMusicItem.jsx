import React from 'react'
import QueueMusicList from './QueueMusicList'




const QueueMusicItem =props => {

  
  
return (
  
  <div className={css.QueueMusic}>
        <ul>
          <QueueMusicList/>
        </ul>
  </div>
)

}

export default QueueMusicItem