DROP INDEX `idx_account_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_account_unique` ON `account` (`provider_id`,`account_id`);--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `issuer`;