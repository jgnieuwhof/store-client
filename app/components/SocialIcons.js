
import React from 'react'
import { SocialIcon } from 'react-social-icons'

const urls = [
  `https://www.instagram.com/rambleonsilver/`,
  `https://www.facebook.com/RambleOnSilver/`,
  `https://www.pinterest.ca/rambleonsilverco/`,
  `mailto:rambleonsilverco@gmail.com`,
]

export default ({}) => (
  <div className='social-icon-container'>
    { urls.map(x => (
      <SocialIcon key={x} url={x} />
    ))
    }
  </div>
)
