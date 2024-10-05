"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "../Toolbar/toolbar";
import { useRef } from "react";

interface Log {
  onChange: CallableFunction;
  content: string | null;
}

const Tiptap = ({ onChange, content }: Log) => {
  const editorRef = useRef<HTMLDivElement | null>(null); // Reference for the editor container

  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 w-full h-full justify-start text-black items-start gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none break-all",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());

      // Auto-scroll to the bottom
      if (editorRef.current) {
        editorRef.current.scrollTop = editorRef.current.scrollHeight;
      }
    },
  });

  return (
    <div
      ref={editorRef} // Attach reference to the scrollable container
      className="border-2 w-[250px] sm:w-full overflow-auto rounded-md h-[400px] border-gray-200 flex flex-col"
    >
      <div className="flex-shrink-0">
        {
          // @ts-expect-error: someFunction is not typed, but we expect it to work
          <Toolbar editor={editor} content={content} />
        }
      </div>

      <div className="flex-grow">
        <EditorContent
          className="break-all"
          style={{ whiteSpace: "pre-line", height: '100%' }}
          editor={editor}
        />
      </div>
    </div>
  );
};

export default Tiptap;
