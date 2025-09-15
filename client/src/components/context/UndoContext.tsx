"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

interface Command {
  do: () => void;
  undo: () => void;
}

interface UndoContextType {
  execute: (cmd: Command) => void;
  undo: () => void;
  redo: () => void;
}

const UndoContext = createContext<UndoContextType | null>(null);

export function UndoProvider({ children }: { children: React.ReactNode }) {
  const undoStack = useRef<Command[]>([]);
  const redoStack = useRef<Command[]>([]);

  const execute = (cmd: Command) => {
    cmd.do();
    undoStack.current.push(cmd);
    redoStack.current = []; // clear redo after new action
  };

  const undo = useCallback(() => {
    const cmd = undoStack.current.pop();
    if (cmd) {
      cmd.undo();
      redoStack.current.push(cmd);
    }
  }, [undoStack, redoStack]);

  const redo = useCallback(() => {
    const cmd = redoStack.current.pop();
    if (cmd) {
      cmd.do();
      undoStack.current.push(cmd);
    }
  }, [undoStack, redoStack]);

  // keyboard bindings
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  return (
    <UndoContext.Provider value={{ execute, undo, redo }}>
      {children}
    </UndoContext.Provider>
  );
}

export const useUndo = () => {
  const ctx = useContext(UndoContext);
  if (!ctx) throw new Error("useUndo must be used within UndoProvider");
  return ctx;
};
