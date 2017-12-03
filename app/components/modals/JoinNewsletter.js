import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import { default as JoinNewsletterForm } from '../JoinNewsletter'
import { modalClose } from '../../reducers/reduceModal'

class JoinNewsletter extends Component {
  state = {
    success: false,
  }

  render() {
    let { success } = this.state
    let { email, show } = this.props
    return (
      <div className='login-modal-container'>
        <Modal show={show} onHide={this.closeModal}>
          <Modal.Body className='text-center'>
            <button type="button" className='close' onClick={this.closeModal}>&times;</button>
            { email ? (
              <div>
                <h4>{ success ? `Thanks, w` : `W` }e're so glad you're with us!</h4>
              </div>
            ) : (
              <div>
                <h4>Want in on exclusive deals and offers?</h4>
                <p>
                  Be the first to know by joining our mailing list.
                  As a member you'll enjoy early access to sales, get insider information
                  on upcoming lines and products, and more.
                </p>
                <p>
                  No spam. Just the good stuff, we promise.
                </p>
              </div>
            )}
            <JoinNewsletterForm className='top-buffer' hideLabel onSuccess={this.onSuccess} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  closeModal = () => this.props.dispatch(modalClose())
  onSuccess = () => this.setState({ success: true })
}

export default connect(s => ({
  email: s.app.email,
}))(JoinNewsletter)
