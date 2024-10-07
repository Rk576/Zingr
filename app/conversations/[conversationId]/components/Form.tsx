"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import MessageInput from "./MessageInput";

// Define the type for the Cloudinary upload result
interface CloudinaryUploadResult {
  info: {
    secure_url: string;
  };
}

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }  // You can keep this if you want to show error messages elsewhere in the form
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', {
      ...data,
      conversationId
    });
  };

  // Use type assertion to explicitly define the result type
  const handleUpload = (result: unknown) => {
    const uploadResult = result as CloudinaryUploadResult;
    axios.post('/api/messages', {
      image: uploadResult?.info?.secure_url,
      conversationId
    });
  };

  return ( 
    <div
      className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}  // Fix: type assertion used in `handleUpload`
        uploadPreset="tctmgfm4"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
            rounded-full
            p-2
            bg-sky-500
            cursor-pointer
            hover:bg-sky-600
            transition
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>
      </form>
    </div>
  );
};

export default Form;