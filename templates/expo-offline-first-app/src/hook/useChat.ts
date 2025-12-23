import { useState, useCallback, useEffect } from "react";
import { Message, ChatSession } from "../types/chat";
import { db } from "../db";
import { chat } from "../db/schema";
import { eq, desc } from "drizzle-orm";

interface UseChatOptions {
	sessionId?: string;
	initialMessages?: Message[];
	onError?: (error: Error) => void;
}

interface UseChatReturn {
	messages: Message[];
	isLoading: boolean;
	error: string | null;
	addMessage: (message: Message) => Promise<void>;
	updateLastMessage: (content: string) => void;
	clearMessages: () => void;
	saveMessage: (message: Omit<Message, "id">) => Promise<void>;
	loadMessages: () => Promise<void>;
}

export const useChat = (options: UseChatOptions = {}): UseChatReturn => {
	const { sessionId, initialMessages = [], onError } = options;

	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Load messages from database
	const loadMessages = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);

			const dbMessages = await db
				.select()
				.from(chat)
				.orderBy(desc(chat.createdAt))
				.limit(50);

			const formattedMessages: Message[] = dbMessages.map((msg) => ({
				id: msg.id,
				content: msg.message,
				role: msg.sender as "user" | "assistant" | "system",
				timestamp: msg.createdAt || undefined,
			}));

			setMessages(formattedMessages.reverse());
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to load messages";
			setError(errorMessage);
			onError?.(err instanceof Error ? err : new Error(errorMessage));
		} finally {
			setIsLoading(false);
		}
	}, [onError]);

	// Save message to database
	const saveMessage = useCallback(
		async (message: Omit<Message, "id">) => {
			try {
				await db.insert(chat).values({
					message: message.content,
					sender: message.role,
					receiver: message.role === "user" ? "assistant" : "user",
				});
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Failed to save message";
				setError(errorMessage);
				onError?.(err instanceof Error ? err : new Error(errorMessage));
			}
		},
		[onError],
	);

	// Add message to state and save to database
	const addMessage = useCallback(
		async (message: Message) => {
			try {
				setMessages((prev) => [...prev, message]);

				if (!message.id) {
					await saveMessage(message);
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Failed to add message";
				setError(errorMessage);
				onError?.(err instanceof Error ? err : new Error(errorMessage));
			}
		},
		[saveMessage, onError],
	);

	// Update the last message (useful for streaming responses)
	const updateLastMessage = useCallback((content: string) => {
		setMessages((prev) => {
			if (prev.length === 0) return prev;

			const updated = [...prev];
			updated[updated.length - 1] = {
				...updated[updated.length - 1],
				content,
			};
			return updated;
		});
	}, []);

	// Clear all messages
	const clearMessages = useCallback(() => {
		setMessages([]);
		setError(null);
	}, []);

	// Load messages on mount
	useEffect(() => {
		if (initialMessages.length === 0) {
			loadMessages();
		}
	}, [loadMessages, initialMessages.length]);

	return {
		messages,
		isLoading,
		error,
		addMessage,
		updateLastMessage,
		clearMessages,
		saveMessage,
		loadMessages,
	};
};
