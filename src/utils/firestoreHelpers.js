// src/utils/firestoreHelpers.js
import { db } from "../firebase";
import {
  collection, addDoc, getDocs,
  deleteDoc, updateDoc, doc, query, where
} from "firebase/firestore";

export const addTodoToFirestore = async (todo) => {
    return await addDoc(collection(db, "todos"), todo);
  };

export const getTodosFromFirestore = async (userId) => {
  const q = query(collection(db, "todos"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteTodoFromFirestore = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};

export const toggleCompleteFirestore = async (id, newValue) => {
  if (typeof newValue !== "boolean") {
    throw new Error("completed değeri boolean olmalı");
  }
  await updateDoc(doc(db, "todos", id), {
    completed: newValue
  });
};
