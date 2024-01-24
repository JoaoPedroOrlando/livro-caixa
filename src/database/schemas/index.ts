import { appSchema } from "@nozbe/watermelondb";
import { entrySchema } from "./entrySchema";
import { cashbookSchema } from "./cashbook";

export const schemas = appSchema({
    version: 1,
    tables: [
        entrySchema,
        cashbookSchema
    ]
})