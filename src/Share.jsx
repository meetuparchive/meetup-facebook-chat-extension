import React, { Component } from 'react';
import moment from 'moment';
import shareIcon from './img/ic_send_lg_blue@2x.png';

function generateDuotone(keyPhoto, photoGradient) {
  if (!keyPhoto) {
    return `${window.location.protocol}//${window.location.hostname}/fallback_blue.png`;
  } else if(!photoGradient) {
    return keyPhoto.photo_link;
  }

  var duotone = 'dt' + photoGradient.dark_color + 'x' + photoGradient.light_color;
  var spec = 'event/rx500x600/' + duotone + '/';
  var base = 'https://a248.e.akamai.net/secure.meetupstatic.com/photo_api/';
  var duotoneUrl = base + spec + keyPhoto.id + '.jpeg';

  return duotoneUrl;
}

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
            image_url: generateDuotone(event.group.key_photo, event.group.photo_gradient),
            subtitle: moment(event.time).format('LLLL'),
            default_action: {
              type: 'web_url',
              url: event.link
            },
            buttons: [{
               type :'web_url',
               //  https://beta2.meetup.com/:urlname/events/:eventId/rsvp?response={no, yes}
               url : `${event.link.replace('www.', 'beta2.')}rsvp?response=yes`,
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
