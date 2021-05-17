import React from 'react';
import css from './QueueMusic.module.css'




const QueueMusicItem =props => {

  console.log(props);
  console.log('http://4.bp.blogspot.com/_z4Fx9I4K83w/TU2vrG_eBHI/AAAAAAAABxc/9swMUdvnapM/s1600/Donny+Hathaway+-+A+song+for+you+-+music+sheet.jpg')
  
return (
  
  <li className={css.QueueMusicItem}>
        <div className={css.imgDiv}> 
        <img className={css.imgOfSong}
         src={props.song.img}
         onError={(e)=>{e.target.src="http://4.bp.blogspot.com/_z4Fx9I4K83w/TU2vrG_eBHI/AAAAAAAABxc/9swMUdvnapM/s1600/Donny+Hathaway+-+A+song+for+you+-+music+sheet.jpg"}}
         alt='song'
         /> 
         </div>

         <div className={css.containerOfSong}>
           <div>
          title = {props.song.title}
          description = {props.song.description}
          time = {props.song.timeOfSong}
          </div>
          
          <div className={css.ContainerOfBtnsForSong}>
            <button>Star</button>
            <button>Delete</button>
          </div>
        </div>
        {/* {props.song} */}
  </li>
)

}

export default QueueMusicItem