import React, { useRef, useState } from 'react'
import { FaLessThanEqual } from 'react-icons/fa6';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = (props) => {

  const inputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      //Updates the image states
      props.setImage(file);

      //Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview)
    }
  };

  const handleRemoveImage = () => {

    //removes the image
    props.setImage(null);
    setPreviewUrl(null);
  }

  const onChooseFile = () => {
    inputRef.current.click();
  };


  return (
    <div className='flex justify-center mb-8'>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!props.image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-purple-200 rounded-full relative'>
          <LuUser className='text-4xl text-primary' />

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img src={previewUrl}
            alt="profile photo"
            className='w-20 h-20 rounded-full object-cover'
          />

          <button type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector
