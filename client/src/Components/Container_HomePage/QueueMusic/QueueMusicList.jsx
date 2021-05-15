import React, { useState } from 'react'
import css from './QueueMusicList.module.css'


const data =  [{
  title: '1',
  img: 'good1',
  sext: 'ok',
  _id: 222111,
  timeOfSong: '2:33',
  file: 'jpg',
},
{title: '2',
img: 'good2',
sext: 'ok',
_id: 222111,
timeOfSong: '2:042',
file: 'jpg',
},
{title: 'dd4',
img: 'good',
sext: 'ok4',
_id: 222111,
timeOfSong: '2:044',
file: 'jpg',
},{title: 'dd5',
img: 'good',
sext: 'ok5',
_id: 222111,
timeOfSong: '2:54',
file: 'jpg',
},
]


const QueueMusicList =props => {


  // const [musicData, setMusicData]  = useState(data)
  
  // musicData.map(song => {
  //   console.log(song);
  
  // })
  
  
return (
  
  <div className={css.QueueMusic}>
        <ul>

        </ul>
  </div>
)

}

export default QueueMusicList