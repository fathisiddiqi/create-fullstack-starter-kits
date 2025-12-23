export interface Message {
	id?: number;
	content: string;
	role: "user" | "assistant" | "system";
	timestamp?: string;
}

export interface ChatSession {
	id: string;
	title: string;
	messages: Message[];
	createdAt: string;
	updatedAt: string;
}

export interface LLMConfig {
	model: string;
	temperature?: number;
	maxTokens?: number;
}

export interface LLMResponse {
	content: string;
	usage?: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
}

export interface LLMHookReturn {
	response: string | null;
	isLoading: boolean;
	error: string | null;
	downloadProgress: string;
	generate: (messages: Message[]) => Promise<void>;
	reset: () => void;
}
