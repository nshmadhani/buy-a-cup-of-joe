import * as UAuthWeb3Modal from '@uauth/web3modal'
import UAuthSPA from '@uauth/js'
import Web3Modal from 'web3modal'

// These options are used to construct the UAuthSPA instance.
export const uauthOptions = {
  clientID: 'wJEIhbY/AzkRh7G1l2+j7CFEl0r8trKJOwY38UaHIU0=',
  clientSecret: 'motjIxAAejscUApcIX3A/qpefhFbUKHYDY1iDPCWGV4=',
  redirectUri: 'https://buy-a-cup-of-joe.vercel.app/callback',
  // Must include both the openid and wallet scopes.
  scope: 'openid wallet email:optional',
}

const providerOptions = {
  // Currently the package isn't inside the web3modal library currently. For now,
  // users must use this libary to create a custom web3modal provider.

  // All custom `web3modal` providers must be registered using the "custom-"
  // prefix.
  'custom-uauth': {
    // The UI Assets
    display: UAuthWeb3Modal.display,

    // The Connector
    connector: UAuthWeb3Modal.connector,
    shouldLoginWithRedirect: true,

    // The SPA libary
    package: UAuthSPA,

    // The SPA libary options
    options: uauthOptions,
  },

}

const web3modal = new Web3Modal({providerOptions})

// Register the web3modal so the connector has access to it.
UAuthWeb3Modal.registerWeb3Modal(web3modal)

export default web3modal