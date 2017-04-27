import React, { Component } from 'react';

const doShare = () => {
  var messageToShare = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [{
          title: 'I took Peters "Which Hat Are You?" Quiz',
          image_url: 'https://bot.peters-hats.com/img/hats/fez.jpg',
          subtitle: 'My result: Fez',
          default_action: {
            type: 'web_url',
            url: 'https://bot.peters-hats.com/view_quiz_results.php?user=24601'
          },
          buttons: [{
             type :'web_url',
             url :'https://bot.peters-hats.com/hatquiz.php?referer=24601',
             title :'Take the Quiz'
          }]
        }]
      }
    }
  };

  MessengerExtensions.beginShareFlow(function success(response) { // eslint-disable-line no-undef
    console.log(response);
  }, function error(errorCode, errorMessage) {
    console.log(errorCode, errorMessage);
  },
  messageToShare,
  'current_thread');
}

export default class Share extends Component {

  handleClick() {
    doShare();
  }

  render() {
    return <button className='button' onClick={this.handleClick}>Share</button>;
  }
}
