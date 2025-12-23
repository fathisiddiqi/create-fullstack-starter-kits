import {
	createStaticNavigation,
	StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "@module/chat";

const RootStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
	},
	screens: {
		Main: {
			screen: Chat,
			options: {
				headerShown: false,
			},
		},
	},
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
