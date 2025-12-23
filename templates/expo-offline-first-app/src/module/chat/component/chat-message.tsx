import { Color } from "@theme/color";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { Message } from "../../../types/chat";

interface ChatMessageComponentProps {
	messages: Message[];
	isLoading?: boolean;
}

const ChatMessageComponent = ({
	messages,
	isLoading,
}: ChatMessageComponentProps) => {
	return (
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{
				padding: 16,
				paddingBottom: 200,
			}}
			showsVerticalScrollIndicator={false}
		>
			{/* Sample Messages */}
			{messages.map((message, index) =>
				message.role === "user" ? (
					<View style={{ marginBottom: 12 }} key={index}>
						<View
							style={{
								alignSelf: "flex-end",
								backgroundColor: Color.primary,
								padding: 12,
								borderRadius: 16,
								borderBottomRightRadius: 4,
								maxWidth: "80%",
							}}
						>
							<Text style={{ color: "white", fontSize: 16 }}>
								{message.content}
							</Text>
						</View>
					</View>
				) : message.role === "assistant" ? (
					<View style={{ marginBottom: 12 }} key={index}>
						<View
							style={{
								alignSelf: "flex-start",
								backgroundColor: Color.surface,
								padding: 12,
								borderRadius: 16,
								borderBottomLeftRadius: 4,
								maxWidth: "80%",
							}}
						>
							<Text style={{ color: Color.onSurface, fontSize: 16 }}>
								{message.content}
							</Text>
						</View>
					</View>
				) : null,
			)}

			{/* Loading indicator */}
			{isLoading && (
				<View style={{ marginBottom: 12 }}>
					<View
						style={{
							alignSelf: "flex-start",
							backgroundColor: Color.surface,
							padding: 12,
							borderRadius: 16,
							borderBottomLeftRadius: 4,
							maxWidth: "80%",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<ActivityIndicator size="small" color={Color.primary} />
						<Text
							style={{ color: Color.onSurface, fontSize: 16, marginLeft: 8 }}
						>
							AI is thinking...
						</Text>
					</View>
				</View>
			)}
		</ScrollView>
	);
};

export { ChatMessageComponent };
