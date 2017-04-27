import React from 'react';
import { button as buttonStyle } from './style.js'

const OAUTH_URL = 'https://secure.meetup.com/oauth2/authorize/?client_id=7qg853jmutabhudnkvqklo1vek&response_type=token&redirect_uri=https://meetup-facebook-chat-extension.herokuapp.com/&scope=rsvp+ageless'

const Login = () =>
  <a style={buttonStyle} className='button button--primary' href={OAUTH_URL}>Login</a>;

export default Login;
