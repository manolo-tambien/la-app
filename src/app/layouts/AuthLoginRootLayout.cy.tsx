import React from 'react'
import RootLayout from './AuthLogin'

describe('<RootLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RootLayout />)
  })
})