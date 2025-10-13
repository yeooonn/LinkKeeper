import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { linkFormSchema } from "./linkForm.schema";

const useLinkForm = () => {
  const methods = useForm({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      title: "",
      url: "",
      tags: "",
      memo: "",
      alert: "미등록",
      date: "",
      time: "",
    },
    mode: "onChange",
  });

  return { methods };
};

export default useLinkForm;
