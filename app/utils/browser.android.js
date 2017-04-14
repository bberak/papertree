import { Linking } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
    ANIMATIONS_SLIDE,
    ANIMATIONS_FADE,
    CustomTabs
} from 'react-native-custom-tabs';

export default class Browser {
	static openURL(url) {	
	    CustomTabs.openURL(url, {
		  toolbarColor: EStyleSheet.value("$primaryColor"),
		  enableUrlBarHiding: true,
		  showPageTitle: true,
		  enableDefaultShare: true,
		  animations: ANIMATIONS_SLIDE, // or ANIMATIONS_FADE
		}).catch(error => {
			Linking.openURL(url);
		});
  	}
}