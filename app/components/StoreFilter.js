
import React from 'react'
import { connect } from 'react-redux'

import { Button, DropdownButton, MenuItem } from 'react-bootstrap'

import { subFilters } from '../helpers/store'
import { setFilter } from '../reducers/reduceShop'

const handleClick = (callback, dispatch, filter) => () => {
  callback()
  dispatch(setFilter({ filter }))
}

const StoreFilter = ({ children, dispatch, filter, current, currentSub, onClick }) => {
  let subs = filter && subFilters[filter.toLowerCase()]
  let className = `naked ${filter === current ? `active` : ``}`
  let setSub = ({ name, option }) => dispatch(setFilter({ filter, subFilter: { name, option } }))
  return (
    <span className='filter-container'>
      { subs ? (
        <DropdownButton id={filter} title={filter} className={className}>
          <MenuItem eventKey='0'
            onClick={handleClick(onClick, dispatch, filter)}
          >
            All
          </MenuItem>
          { subs.map(({ name, options }) => ([
            <MenuItem key={name} header>{name}</MenuItem>,
            options.map((x, i) => (
              <MenuItem key={i} eventKey={i}
                className={currentSub && currentSub.option === x ? `active` : ``}
                onClick={() => { setSub({ name: name.toLowerCase(), option: x })}}
              >
                {x}
              </MenuItem>
            )),
          ]))}
        </DropdownButton>
      ) : (
        <Button className={className}
          onClick={handleClick(onClick, dispatch, filter)}
        >
          { children }
        </Button>
      )}
    </span>
  )
}

export default connect()(StoreFilter)
