import React from 'react'
import { getInitials } from '../../Utils/Helper';

const CharAvatar = (props) => {
  return (
    <div className={`${props.width || 'w-12'} ${props.height || 'h-12'} ${props.style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
      {getInitials(props.fullName || "")}
    </div>
  )
}

export default CharAvatar
