import React, { Component } from 'react';
import moment from 'moment';
import shareIcon from './img/ic_send_lg_blue@2x.png';

export default class Share extends Component {

  static defaultProps = {
    event: {}
  };

  handleClick = () => {
    const { event } = this.props;
    const messageToShare = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: event.name,
            image_url: ((event.group || {}).key_photo || {}).photo_link,
            subtitle: moment(event.time).format('LLLL'),
            default_action: {
              type: 'web_url',
              url: event.link
            },
            buttons: [{
               type :'web_url',
               url : event.link,
               title : 'I want to go!'
            }]
          }]
        }
      }
    };

    MessengerExtensions.beginShareFlow(function success(response) { // eslint-disable-line no-undef
      if(response.is_sent === true){
        // User shared. We're done here!
        MessengerExtensions.requestCloseBrowser(); // eslint-disable-line no-undef
      }
      else{
        // User canceled their share!
      }
    }, function error(errorCode, errorMessage) {
      console.log(errorCode, errorMessage);
    },
    messageToShare,
    'current_thread');
  }

  render() {
    return (
      <img onClick={this.handleClick} width={20} height={20} src={shareIcon} alt='share' />
    );
  }
}
