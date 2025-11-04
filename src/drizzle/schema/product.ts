import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schema.helpers";
import { relations } from "drizzle-orm";
import { CourseProductTable } from "./courseProduct";

/**
 * Custom ProductStatus enum with type safety
 * Each product can only be public or private, private by default
 */
export const productStatuses = ["public", "private"] as const;
export type ProductStatus = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum("product_status", productStatuses);

export const ProductTable = pgTable("products", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

/**
 * Product can have many Courses
 */
export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProduct: many(CourseProductTable),
}));
