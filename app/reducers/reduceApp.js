import u from 'updeep'

import { app as appActions } from '../actions'
import { lsSet, lsGet } from '../helpers/localStorage'

// ============================================================================
// App Action Creators
// ============================================================================

export const setEmail = ({ email }) => (
  { type: appActions.SET_EMAIL, payload: { email } }
)

// ============================================================================
// App Reducer
// ============================================================================

const defaultState = {
  email: lsGet(`email`),
}

export default function (state = defaultState, action) {
  let update
  switch (action.type) {

  // ------------------------------------------------------------------------
  case appActions.SET_EMAIL:
    let { email } = action.payload
    lsSet(`email`, email)
    update = { email }
    break

  }

  return update ? u(update, state) : state
}
