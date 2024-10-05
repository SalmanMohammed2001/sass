


"use client";

import React, { useState } from "react";

import { createClient } from "@/app/lib/supabase/client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingCom from "../loadingcom/loading";
import Tiptap from "../Tiptap/tiptap";

// Define form data type
interface FormDataType {
  id: string;
  content: string | undefined;
  title: string;
}

const Writeblogs = () => {
  const router = useRouter();
  const [content, setContent] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    id: "",
    content: "",
    title: "",
  });

  const [imagePreviews, setImagePreviews] = useState("");
  const [imagefile, setImagefile] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // Validate content
    if (!newContent || newContent.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, content: "Content cannot be empty." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, content: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate title
    if (name === "title" && value.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, title: "Title cannot be empty." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previews = URL.createObjectURL(file);
      setImagePreviews(previews);
      setImagefile(file);
      setErrors((prevErrors) => ({ ...prevErrors, image: "" })); // Clear error on valid image
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, image: "Please upload an image." }));
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (formData.title.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, title: "Title cannot be empty." }));
      isValid = false;
    }

    if (!content || content.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, content: "Content cannot be empty." }));
      isValid = false;
    }

    if (!imagefile) {
      setErrors((prevErrors) => ({ ...prevErrors, image: "Please upload an image." }));
      isValid = false;
    }

    return isValid;
  };

  const saveFunction = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Form is incomplete",
        text: "Please fill in all fields correctly before submitting.",
      });
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const user =  (await supabase.auth.getUser()).data.user;

    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          title: formData.title,
          description: content,
          createdBy: user?.id,
        },
      ])
      .select();

    let listingData;

    if (data && data.length > 0) {
      listingData = data[0].id;
      const file = imagefile;
      const fileName = Date.now().toString();

      const { error: uploadError } = await supabase.storage
        .from("blogimages")
        .upload(`${fileName}`, file as File, {
          contentType: file?.type,
          upsert: false,
        });

      if (uploadError) {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Image upload failed",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;

        await supabase
          .from("listing")
          .update({ image_url: imageUrl })
          .eq("id", listingData);

        setImagePreviews("");
        setLoading(false);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Blog saved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/blog");
      }
    } else {
      setLoading(false);
      console.error("Error inserting blog:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingCom />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-[100px] text-black">

    
      <div className="max-w-3xl w-full grid place-items-start mx-auto pt-10 mb-10 gap-[18px]">

      <h1 className="text-[24px] font-semibold">Type You are Blog </h1>

        <input
          onChange={handleInputChange}
          id="title"
          name="title"
          className="border-black border-2 border-solid rounded-md px-4 py-3 text-black font-medium text-[16px] w-[80%] outline-none mb-5"
          type="text"
          placeholder="Title"
          value={formData.title}
          required
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}

        <label
          htmlFor="imageId"
          className="flex items-center gap-2 p-1 font-medium border border-gray-300 rounded-md text-[#0AA195] focus:border-black focus:outline-none hover:border-black"
        >
          <span role="img" aria-label="upload" className="anticon anticon-upload">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="upload"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </span>
          Upload
        </label>
        <input
          type="file"
          id="imageId"
          className="hidden"
          onChange={handleFileInputChange}
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
        {imagePreviews && (
          <div className="mt-4 flex">
            <img
              src={imagePreviews}
              alt="Preview"
              width="150"
              className="max-w-full border border-gray-300 w-full h-[180px] bg-cover rounded-lg"
            />
          </div>
        )}

<Tiptap
          name="content"
         
          // @ts-expect-error: someFunction is not typed, but we expect it to work
          content={content}
          onChange={(newContent: string) => handleContentChange(newContent)}
        />
        {errors.content && <p className="text-red-500">{errors.content}</p>}

        <button
          onClick={saveFunction}
          type="submit"
          className="px-4 bg-[#0AA195] text-white py-2 rounded-md"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
};

export default Writeblogs;
