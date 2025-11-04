/**
 * Join Table for Course <> Product
 * Course can be part of many Products
 * Product may have many Courses
 */

import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { ProductTable } from "./product";
import { createdAt, updatedAt } from "../schema.helpers";
import { relations } from "drizzle-orm";

export const CourseProductTable = pgTable(
  "course_products",
  {
    /**
     * courseId creates a foreign key reference to id in CourseTable
     * onDelete: 'restrict' - Disallows deletion if Course is part of a Product being sold
     */
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: "restrict" }),
    /**
     * productId creates a foreign key reference to id in ProductTable
     * onDelete: 'cascade' - Deletes all relationships between the deleted Product and Course relationships
     */
    productId: uuid()
      .notNull()
      .references(() => ProductTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  // Creates unique primary key that associates courseId and productId so there's never the same
  // courseId and productId combo
  (t) => [primaryKey({ columns: [t.courseId, t.productId] })]
);

/**
 * CourseProduct can only have one courseId and one productId
 */
export const CourseProductRelationships = relations(
  CourseProductTable,
  ({ one }) => ({
    course: one(CourseTable, {
      fields: [CourseProductTable.courseId],
      references: [CourseTable.id],
    }),
    product: one(ProductTable, {
      fields: [CourseProductTable.productId],
      references: [ProductTable.id],
    }),
  })
);
