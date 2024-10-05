import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "../Toolbar/toolbar";

interface TiptapProps {
  onChange: (content: string) => void;  
  content: string | null;               
}

const Tiptap: React.FC<TiptapProps> = ({ onChange, content }) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-black items-start w-full gap-3 font-medium text-[16px]  pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    content, // Pass content as is, it can be null
  });

  return (
    <div className="w-full">
      {content ? ( // Check if content is not null
        <>
          <Toolbar editor={editor} content={content} />
          <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        </>
      ) : (
        <p>No content available.</p> // Optional fallback for null content
      )}
    </div>
  );
};

export default Tiptap;
