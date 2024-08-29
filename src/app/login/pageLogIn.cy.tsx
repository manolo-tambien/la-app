import React from 'react'
import LogIn from './page'

describe('<LogIn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LogIn />)
  })
})