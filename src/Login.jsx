import React from 'react';

const OAUTH_URL = 'https://secure.meetup.com/oauth2/authorize/?client_id=7qg853jmutabhudnkvqklo1vek&response_type=token&redirect_uri=https://meetup-facebook-chat-extension.herokuapp.com/&scope=rsvp+ageless'

const Login = () => <a href={OAUTH_URL}>Login</a>;

export default Login;
