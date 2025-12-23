CREATE TABLE `chats` (
	`id` integer PRIMARY KEY NOT NULL,
	`message` text NOT NULL,
	`sender` text NOT NULL,
	`receiver` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`avatar` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);