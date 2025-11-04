import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schema.helpers";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";

/**
 * Custom CourseSectionStatus enum with type safety
 * Each course section can only be public or private, private by default
 */
export const courseSectionStatuses = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatuses)[number];
export const courseSectionStatusEnum = pgEnum(
  "course_section_status",
  courseSectionStatuses
);

export const CourseSectionTable = pgTable("courseSections", {
  id,
  name: text().notNull(),
  status: courseSectionStatusEnum().notNull().default("private"),
  order: integer().notNull(), // Order of the section in the Course
  // onDelete: "cascade" - Deletes all CourseSections for the deleted Course
  courseId: uuid()
    .notNull()
    .references(() => CourseTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

/**
 * CourseSection can only have one courseId
 */
export const CourseSectionRelationships = relations(
  CourseSectionTable,
  ({ one }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id],
    }),
  })
);
