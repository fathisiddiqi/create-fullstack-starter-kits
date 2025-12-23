import { useState, useCallback } from "react";
import { Message, LLMConfig, LLMHookReturn } from "@types/chat";

// Mock model constant - replace with actual implementation
export const QWEN2_5_0_5B_QUANTIZED = "qwen2.5-0.5b-quantized";

interface UseLLMOptions extends LLMConfig {
	onError?: (error: Error) => void;
}

export const useLLM = (options: UseLLMOptions): LLMHookReturn => {
	const { model, temperature = 0.7, maxTokens = 1000, onError } = options;

	const [response, setResponse] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [downloadProgress, setDownloadProgress] = useState<string>("");

	const generate = useCallback(
		async (messages: Message[]) => {
			try {
				setIsLoading(true);
				setError(null);
				setResponse(null);
				setDownloadProgress("Generating response...");

				// Mock implementation - replace with actual LLM integration
				// This could be a call to a local model, OpenAI API, or other LLM service
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate processing time

				const lastUserMessage = messages.filter((m) => m.role === "user").pop();
				const mockResponse = generateMockResponse(
					lastUserMessage?.content || "",
				);

				setResponse(mockResponse);
				setDownloadProgress("Response generated");
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Failed to generate response";
				setError(errorMessage);
				onError?.(err instanceof Error ? err : new Error(errorMessage));
			} finally {
				setIsLoading(false);
			}
		},
		[model, temperature, maxTokens, onError],
	);

	const reset = useCallback(() => {
		setResponse(null);
		setError(null);
		setDownloadProgress("");
	}, []);

	return {
		response,
		isLoading,
		error,
		downloadProgress,
		generate,
		reset,
	};
};

// Mock response generator - replace with actual AI logic
function generateMockResponse(userInput: string): string {
	const responses = [
		`I understand you mentioned: "${userInput}". As your personal finance assistant, I can help you track expenses and savings.`,
		`Thanks for sharing that information. Let me help you categorize this financial activity.`,
		`I've noted your input about "${userInput}". Would you like me to record this as an expense or saving?`,
		`Based on what you've told me, I can help you better manage your finances. What specific assistance do you need?`,
		`I see you're discussing "${userInput}". Let me provide some financial guidance on this topic.`,
	];

	return responses[Math.floor(Math.random() * responses.length)];
}
