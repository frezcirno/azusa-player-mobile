// import './wdyr'; // <--- first import
import 'react-native-get-random-values';
// installs global ReadableStream/WritableStream/TransformStream. Hermes does
// not provide these, and the bili/ytb url resolvers rely on them via fetch.
// web-streams-polyfill v4's bare import is a ponyfill only, so import the
// dedicated polyfill entry to install the globals.
import 'web-streams-polyfill/polyfill';
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import App from './src/App';
import { PlaybackService } from './src/services';
import { name as appName } from './app.json';
import nodejs from '@utils/nodejs';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App); // codePush(App));
nodejs?.start?.('main.js');
TrackPlayer.registerPlaybackService(() => PlaybackService);
