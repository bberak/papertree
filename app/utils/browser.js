import SafariView from "react-native-safari-view";
import { Linking, StatusBar } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default class Browser {
	static openURL(url) {
		SafariView.isAvailable()
			.then(() => {
				const showSubscription = SafariView.addEventListener(
					"onShow",
					() => {
						StatusBar.setBarStyle("default");
						SafariView.removeEventListener(showSubscription);
					}
				);

				const dismissSubscription = SafariView.addEventListener(
					"onDismiss",
					() => {
						StatusBar.setBarStyle("light-content");
						SafariView.removeEventListener(dismissSubscription);
					}
				);

				return SafariView.show({
					url: url
				});
			})
			.catch(error => {
				Linking.openURL(url);
			});
	}
}
