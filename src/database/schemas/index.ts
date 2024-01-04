import { appSchema } from "@nozbe/watermelondb";
import { entrySchema } from "./entrySchema";

export const schemas = appSchema({
    version: 1,
    tables: [
        entrySchema
    ]
})