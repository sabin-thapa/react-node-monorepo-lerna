import { Schema, model, InferSchemaType } from "mongoose";
import {z} from 'zod';


export const noteSchema = z.object({
  title: z.string({required_error: "Title is required!"}).min(1, "Title should be more than 1 character!"),
  text: z.string().optional()
})

export type NoteInput = z.infer<typeof noteSchema >

const noteModel = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);




// type Note = InferSchemaType<typeof noteModel>;

export default model("Note", noteModel);