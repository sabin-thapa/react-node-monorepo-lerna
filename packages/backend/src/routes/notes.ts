
import express from 'express';
import * as NotesController from '../controllers/notes';
import { noteSchema } from '../models/note';
import { validateSchema } from '../utils/validateZod';

const router = express.Router()



router.get("/", NotesController.getNotes)
router.get("/:noteId", NotesController.getNote)
router.post("/add-note",  validateSchema(noteSchema), NotesController.postNotes)
router.patch("/:noteId", NotesController.updateNote)
router.delete("/:noteId", NotesController.deleteNote)

export default router