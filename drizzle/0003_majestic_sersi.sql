PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_account` (
	`access_token` text,
	`access_token_expires_at` integer,
	`account_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`id` text PRIMARY KEY NOT NULL,
	`id_token` text,
	`issuer` text NOT NULL,
	`password` text,
	`provider_id` text NOT NULL,
	`refresh_token` text,
	`refresh_token_expires_at` integer,
	`scope` text,
	`updated_at` integer DEFAULT (unixepoch()),
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);--> statement-breakpoint
INSERT INTO `__new_account` (`access_token`, `access_token_expires_at`, `account_id`, `created_at`, `id`, `id_token`, `issuer`, `password`, `provider_id`, `refresh_token`, `refresh_token_expires_at`, `scope`, `updated_at`, `user_id`) SELECT `access_token`, `access_token_expires_at`, `account_id`, `created_at`, `id`, `id_token`, 'local:' || `provider_id`, `password`, `provider_id`, `refresh_token`, `refresh_token_expires_at`, `scope`, `updated_at`, `user_id` FROM `account`;--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
ALTER TABLE `__new_account` RENAME TO `account`;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_account_unique` ON `account` (`issuer`,`account_id`);--> statement-breakpoint
PRAGMA foreign_keys=ON;
