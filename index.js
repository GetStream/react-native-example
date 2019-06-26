import { registerRootComponent} from 'expo';
import {activateKeepAwake} from 'expo-keep-awake'
import App from './App';

if (process.env.NODE_ENV === 'development') {
  activateKeepAwake();
}

registerRootComponent(App);
