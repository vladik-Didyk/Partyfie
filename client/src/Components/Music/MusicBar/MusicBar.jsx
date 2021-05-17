import React, { useState } from  'react'
import css from './MusicBar.module.css'
import audioFile from '../../../test.mp3'


const MusicBar = props => {
const [img_src , setImg_src] = useState(props.img)
  console.log(props);

  return (
    <div className={css.MusicBar}>     
      
        <img className={css.imgInMusicBar}
             src={props.img} 

             onError={(e)=>{e.target.src="https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/NS-WKMAG0730-1595944356.jpg"}}
             alt='song'
        />
      <div className={css.mainContainerProgresBar}>
        <div className={css.contentOfSong}>
          <h4>{props.name}</h4>
          <p>{props.description}</p>
        </div>
          <div className={css.container_audio}>
            <audio className={css.audioProgresBar} controls>
              <source className={css.file} src={audioFile} type="audio/mpeg"/>
            </audio>
          </div>
      </div> 
    </div>
  )
}

export default MusicBar