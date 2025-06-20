<<<<<<< HEAD
const awsmobile = {
  ...
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_3fP8HB0Me',
    userPoolWebClientId: '5u4h8am0vq2mideg3iuo429pnp',
    authenticationFlowType: 'USER_SRP_AUTH',
  },
};
=======
const awsmobile = {

  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_3fP8HB0Me',
    userPoolWebClientId: '5u4h8am0vq2mideg3iuo429pnp',
    authenticationFlowType: 'USER_SRP_AUTH',
  },

  oauth: {
  domain: '3fp8hb0me.auth.us-east-1.amazoncognito.com',
  scope: ['email', 'profile', 'openid'],
  redirectSignIn: 'http://localhost:3000/',
  redirectSignOut: 'http://localhost:3000/',
  responseType: 'code'
}

};
export default awsmobile;
>>>>>>> cdec110 (WIP: Testing Amplify deployment after loginWith error)
