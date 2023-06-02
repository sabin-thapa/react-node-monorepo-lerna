import { RequestHandler } from "express";
import NoteModel, { NoteInput } from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const note = await NoteModel.findById(noteId).exec();

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note ID");
    }

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// interface PostNoteBody {
//   title?: string;
//   text?: string;
// }

export const postNotes: RequestHandler<
  unknown,
  unknown,
  NoteInput,
  unknown
> = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    // if (!title) {
    //   throw createHttpError(400, "Note must have a title!");
    // }

    const newNote = await NoteModel.create({
      title,
      text,
    });
    res.status(200).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const updatedTitle = req.body.title;
  const updatedText = req.body.text;
  try {
    const note = await NoteModel.findById(noteId);

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    if (!updatedTitle) {
      throw createHttpError(400, "Note must have a title!");
    }

    note.title = updatedTitle;
    note.text = updatedText;

    const updatedNote = await note.save();

    return res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note ID");
    }

    const note = await NoteModel.findByIdAndDelete(noteId);

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
