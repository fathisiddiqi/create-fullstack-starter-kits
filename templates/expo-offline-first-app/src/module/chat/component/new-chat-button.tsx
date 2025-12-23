import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Color } from "@theme/color";
import { TouchableOpacity, Text } from "react-native";

interface NewChatButtonProps {
	onPress?: () => void;
}

const NewChatButton = ({ onPress }: NewChatButtonProps) => {
	return (
		<TouchableOpacity
			style={{
				width: 40,
				height: 40,
				borderRadius: 20,
				backgroundColor: Color.primary,
				alignItems: "center",
				justifyContent: "center",
			}}
			onPress={onPress}
		>
			<MaterialCommunityIcons
				name="chat-plus-outline"
				size={24}
				color="white"
			/>
		</TouchableOpacity>
	);
};

export { NewChatButton };
