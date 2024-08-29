import React from 'react'
import ClientProvider from './ClientProvider'

describe('<ClientProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ClientProvider />)
  })
})