import SafariView from 'react-native-safari-view'
import { Linking } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

export default class Browser {
	static openURL(url) {	
	    SafariView.isAvailable()
			.then(SafariView.show({
				url: url,
				barTintColor: EStyleSheet.value("$primaryColor"),
				tintColor: EStyleSheet.value("$secondaryColor")
			}))
			.catch(error => {
				Linking.openURL(url);
			});	
  	}
}