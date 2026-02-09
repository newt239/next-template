CREATE TABLE `account` (
	`access_token` text,
	`access_token_expires_at` integer,
	`account_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`id` text PRIMARY KEY NOT NULL,
	`id_token` text,
	`password` text,
	`provider_id` text NOT NULL,
	`refresh_token` text,
	`refresh_token_expires_at` integer,
	`scope` text,
	`updated_at` integer DEFAULT (unixepoch()),
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`created_at` integer DEFAULT (unixepoch()),
	`expires_at` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`ip_address` text,
	`token` text NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()),
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `task_items` (
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`image` text,
	`name` text NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`created_at` integer DEFAULT (unixepoch()),
	`expires_at` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()),
	`value` text NOT NULL
);
