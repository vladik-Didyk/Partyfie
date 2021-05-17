import React, { useState } from 'react'
import QueueMusicItem from './QueueMusicItem'



const data =  [{
  title: '1',
  img: 'good1',
  description: 'ok',
  _id: 222111,
  timeOfSong: '2:33',
  file: 'jpg',
},
{title: '2',
img: 'good2',
description: 'ok',
_id: 222111,
timeOfSong: '2:042',
file: 'jpg',
},
{title: 'dd4',
img: 'good',
description: 'ok4',
_id: 222111,
timeOfSong: '2:044',
file: 'jpg',
},{title: 'dd5',
img: 'good',
description: 'ok5',
_id: 222111,
timeOfSong: '2:54',
file: 'jpg',
},
]


const QueueMusicList = props => {


  const [musicData, setMusicData]  = useState(data)
  
  // musicData.map(song => {
  //   console.log(song);
  
  // })
  const fullQueueOfMusic = musicData.map(song=><QueueMusicItem song={song} />)
  console.log( fullQueueOfMusic)
return (
  
  <div className='QueueMusicList'>
        <ul>
            {fullQueueOfMusic}
        </ul>
  </div>
)

}


export default QueueMusicList