import React from 'react'

const  MessageResponse = props => {
  
return <div className={'MessageResponse'}>
{props.serverRes.message}
</div>

}
export default MessageResponse