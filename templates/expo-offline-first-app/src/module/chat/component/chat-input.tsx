import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { Color } from "src/theme/color";
import Spacer from "@component/ui/spacer";

interface ChatInputProps {
	onSubmit: (message: string) => void;
	disabled?: boolean;
	placeholder?: string;
}

const ChatInput = ({
	onSubmit,
	disabled = false,
	placeholder = "Type your message...",
}: ChatInputProps) => {
	const [selectedMode, setSelectedMode] = useState<"expense" | "saving">(
		"expense",
	);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [message, setMessage] = useState("");

	return (
		<View
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				padding: 16,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<View style={{ marginRight: 12 }}>
					<TouchableOpacity
						style={{
							backgroundColor: Color.primary,
							borderRadius: 16,
							paddingHorizontal: 12,
							paddingVertical: 6,
							flexDirection: "row",
							alignItems: "center",
							minWidth: 80,
						}}
						onPress={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						<Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
							{selectedMode === "expense" ? "💸 Expense" : "💰 Saving"}
						</Text>
						<MaterialCommunityIcons
							name={isDropdownOpen ? "chevron-up" : "chevron-down"}
							color="white"
							size={16}
							style={{ marginLeft: 4 }}
						/>
					</TouchableOpacity>

					{/* Dropdown Options */}
					{isDropdownOpen && (
						<DropdownMode
							selectedMode={selectedMode}
							setSelectedMode={setSelectedMode}
							setIsDropdownOpen={setIsDropdownOpen}
						/>
					)}
				</View>
			</View>
			<Spacer height={12} />
			<View
				style={{
					backgroundColor: Color.surface,
					borderRadius: 25,
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 16,
					paddingVertical: 12,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.1,
					shadowRadius: 3.84,
					elevation: 5,
				}}
			>
				{/* Text Input */}
				<TextInput
					placeholder={placeholder}
					style={{
						flex: 1,
						fontSize: 16,
						color: disabled ? "#999" : "#333",
						paddingVertical: 8,
					}}
					value={message}
					onChangeText={setMessage}
					placeholderTextColor="#999"
					multiline
					editable={!disabled}
				/>

				{/* Send Button */}
				<TouchableOpacity
					style={{
						width: 40,
						height: 40,
						borderRadius: 20,
						backgroundColor: disabled ? "#ccc" : Color.primary,
						alignItems: "center",
						justifyContent: "center",
						marginLeft: 12,
					}}
					onPress={() => {
						if (!disabled) {
							onSubmit(message);
							setMessage("");
						}
					}}
					disabled={disabled}
				>
					<MaterialCommunityIcons name="send" color="white" size={24} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const DropdownMode = ({
	selectedMode,
	setSelectedMode,
	setIsDropdownOpen,
}: {
	selectedMode: "expense" | "saving";
	setSelectedMode: (mode: "expense" | "saving") => void;
	setIsDropdownOpen: (open: boolean) => void;
}) => {
	return (
		<View
			style={{
				position: "absolute",
				bottom: 40,
				left: 0,
				backgroundColor: "white",
				borderRadius: 8,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
				zIndex: 1000,
				minWidth: 100,
			}}
		>
			<TouchableOpacity
				style={{
					padding: 12,
					borderBottomWidth: 1,
					borderBottomColor: "#f0f0f0",
				}}
				onPress={() => {
					setSelectedMode("expense");
					setIsDropdownOpen(false);
				}}
			>
				<Text
					style={{
						fontSize: 14,
						color: selectedMode === "expense" ? Color.primary : "#333",
					}}
				>
					💸 Expense
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					padding: 12,
				}}
				onPress={() => {
					setSelectedMode("saving");
					setIsDropdownOpen(false);
				}}
			>
				<Text
					style={{
						fontSize: 14,
						color: selectedMode === "saving" ? Color.primary : "#333",
					}}
				>
					💰 Saving
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export { ChatInput };
