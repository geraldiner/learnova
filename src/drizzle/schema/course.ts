import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schema.helpers";
import { CourseProductTable } from "./courseProduct";

// Only holds information about the Course
// Product type defined to sell single Course or bundle of Courses
export const CourseTable = pgTable("courses", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt,
});

/**
 * Course can be part of many Products
 */
export const CourseRelationships = relations(CourseTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
}));
