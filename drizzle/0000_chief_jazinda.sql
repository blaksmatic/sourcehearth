CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`name` text NOT NULL,
	`body` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`visitor_hash` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_feedback_visitor_created` ON `feedback` (`visitor_hash`,`created_at`);