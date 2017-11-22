
import React from 'react'
import { SocialIcons } from 'react-social-icons'

const urls = [
  `https://www.instagram.com/rambleonsilver/`,
  `https://www.facebook.com/RambleOnSilver/`,
  `https://www.pinterest.ca/rambleonsilverco/`,
  `mailto:rambleonsilverco@gmail.com`,
]

export default ({ dark }) => (
  <div className='social-icon-container'>
    <SocialIcons urls={urls} color={ dark ? `black` : `white` } />
  </div>
)
