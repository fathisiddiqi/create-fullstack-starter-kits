import { Color } from "@theme/color";
import React, { useCallback, useEffect } from "react";
import {
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	Text,
	Alert,
} from "react-native";
import { ChatMessageComponent } from "./component/chat-message";
import { ChatInput } from "./component/chat-input";
import { NewChatButton } from "./component/new-chat-button";
import { Header } from "@component/common/header";
import { useChat } from "@hook/useChat";
import { Message } from "@types/chat";
import { useLLM, QWEN2_5_0_5B_QUANTIZED } from "@hook/useLLM";

const INITIAL_ASSISTANT_MESSAGE: Message = {
	role: "assistant",
	content: "Hi, apa yang perlu saya catat?",
};

const Chat: React.FC = () => {
	// Custom hooks for chat functionality
	const {
		messages,
		isLoading: isChatLoading,
		error: chatError,
		addMessage,
		clearMessages,
		loadMessages,
	} = useChat({
		initialMessages: [INITIAL_ASSISTANT_MESSAGE],
		onError: (error) => {
			console.error("Chat error:", error);
			Alert.alert("Chat Error", error.message);
		},
	});

	// LLM hook for AI responses
	const {
		response: llmResponse,
		isLoading: isLLMLoading,
		error: llmError,
		downloadProgress,
		generate,
		reset: resetLLM,
	} = useLLM({
		model: QWEN2_5_0_5B_QUANTIZED,
		temperature: 0.7,
		onError: (error: Error) => {
			console.error("LLM error:", error);
			Alert.alert("AI Error", error.message);
		},
	});

	// Handle new message submission
	const handleSubmitMessage = useCallback(
		async (messageContent: string) => {
			if (!messageContent.trim() || isLLMLoading) return;

			const userMessage: Message = {
				content: messageContent.trim(),
				role: "user",
				timestamp: new Date().toISOString(),
			};

			try {
				// Add user message to chat
				await addMessage(userMessage);

				// Prepare conversation history for AI
				const conversationHistory = [...messages, userMessage];

				// Generate AI response
				await generate(conversationHistory);
			} catch (error) {
				console.error("Error submitting message:", error);

				// Add error message to chat
				const errorMessage: Message = {
					content: "Sorry, I encountered an error processing your message.",
					role: "assistant",
					timestamp: new Date().toISOString(),
				};

				await addMessage(errorMessage);
			}
		},
		[messages, addMessage, generate, isLLMLoading],
	);

	// Handle new chat creation
	const handleNewChat = useCallback(() => {
		Alert.alert(
			"New Chat",
			"Are you sure you want to start a new chat? This will clear the current conversation.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "New Chat",
					style: "destructive",
					onPress: () => {
						clearMessages();
						resetLLM();
						// Re-add initial messages
						setTimeout(() => {
							addMessage(INITIAL_ASSISTANT_MESSAGE);
						}, 100);
					},
				},
			],
		);
	}, [clearMessages, resetLLM, addMessage]);

	// Handle LLM response
	useEffect(() => {
		if (llmResponse && !isLLMLoading) {
			const assistantMessage: Message = {
				content: llmResponse,
				role: "assistant",
				timestamp: new Date().toISOString(),
			};

			addMessage(assistantMessage);
			resetLLM(); // Clear the response after adding to chat
		}
	}, [llmResponse, isLLMLoading, addMessage, resetLLM]);

	// Show loading state
	const isLoading = isChatLoading || isLLMLoading;
	const hasError = chatError || llmError;

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
			>
				{/* Header */}
				<Header
					title="Chat"
					rightComponent={<NewChatButton onPress={handleNewChat} />}
				/>

				{/* Download Progress */}
				{downloadProgress && (
					<Text style={{ padding: 8, textAlign: "center", fontSize: 12 }}>
						{downloadProgress}
					</Text>
				)}

				{/* Error Display */}
				{hasError && (
					<Text
						style={{
							padding: 8,
							textAlign: "center",
							fontSize: 12,
							color: "red",
						}}
					>
						Error: {chatError || llmError}
					</Text>
				)}

				{/* Messages Area */}
				<ChatMessageComponent messages={messages} isLoading={isLoading} />

				{/* Chat Input */}
				<ChatInput
					onSubmit={handleSubmitMessage}
					disabled={isLoading}
					placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Chat;
