import u from 'updeep'
import { modal } from '../actions'

// ============================================================================
// Modal Action Creators
// ============================================================================
export let modalOpen = ({ modalComponent }) => {
  return (dispatch) => {
    dispatch({ type: modal.CLOSE })
    setTimeout(() => {
      dispatch({ type: modal.OPEN, modalComponent })
    }, 10)
  }
}
export let modalClose = () => ({ type: modal.CLOSE })

// ============================================================================
// Modal Reducer
// ============================================================================
let defaultState = {
  show: false,
  activeModal: null,
}

export default function reduceModals(state = defaultState, action) {
  let update
  switch (action.type) {

  // ------------------------------------------------------------------------
  case modal.OPEN:
    update = { show: true, activeModal: action.modalComponent }
    break

  // ------------------------------------------------------------------------
  case modal.CLOSE:
    update = { show: false, activeModal: null }
    break

  }

  return update ? u(update, state) : state
}
