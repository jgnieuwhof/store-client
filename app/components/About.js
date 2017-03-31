
import React from 'react'

import Page from './Page'
import about from '../img/content/about.jpg'

let About = () => {
  return (
    <Page title='About' className='about-container'>
      <div id="lipsum">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus enim vitae euismod luctus. Nam ut tellus et justo pellentesque porttitor. Aliquam at felis non sem pulvinar ultricies ac eget mauris. Fusce pretium ante lorem, ut egestas felis accumsan eu. In posuere tempus libero. Phasellus non velit tincidunt, tincidunt turpis vehicula, consectetur lorem. Suspendisse potenti. Donec faucibus ut diam et tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eget lacus pharetra, posuere est luctus, interdum dui. Phasellus tellus magna, efficitur vitae vestibulum ut, imperdiet quis leo. Integer ac orci finibus neque fringilla viverra in non tortor. Sed pellentesque lacinia tellus, sit amet pretium tellus. Etiam quis est elit. Duis quis est eu sem accumsan molestie.
        </p>
        <p>
          Duis et fringilla elit. Quisque dictum nibh sed nunc pulvinar, vitae aliquet arcu iaculis. Nunc faucibus nunc vitae auctor viverra. Nunc lobortis scelerisque nibh et condimentum. In non diam sodales justo aliquam imperdiet. Maecenas tempor magna vel felis egestas, aliquet ornare odio sagittis. Aliquam ut ligula at metus egestas hendrerit cursus cursus justo. Phasellus non ipsum tortor. Phasellus in tortor ac purus efficitur consequat vel auctor mi. Nam elit lacus, consequat vel aliquam in, rutrum sit amet massa. Suspendisse mi massa, aliquet nec nisi eget, euismod elementum metus. Nam consectetur ligula in libero posuere, quis fermentum magna elementum. Nunc eget lectus quis ligula iaculis hendrerit. Vivamus a rutrum neque.
        </p>
        <p className='center-content'>
          <img src={about} className='img-responsive' style={{ maxWidth: 500 }} />
        </p>
      </div>
    </Page>
  )
}

export default About
