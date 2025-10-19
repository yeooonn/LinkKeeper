import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { linkFormSchema } from "@/shared/lib/linkForm.schema";
import { LinkResponse } from "@/entites/link/model/types";

const defaultValues = (mode: string, initData: LinkResponse) => {
  console.log(initData);
  if (mode === "edit" && initData)
    return {
      title: initData.title,
      url: initData.url,
      tags: initData.linkTags.map((tags) => tags.tag.name).join(" "), // tags 문자열로 변환
      memo: initData.memo,
      alert: "미등록" as const,
      date: initData.createdAt,
      time: "",
    };

  return {
    title: "",
    url: "",
    tags: "",
    memo: "",
    alert: "미등록" as const,
    date: "",
    time: "",
  };
};

const useLinkForm = (mode: string, initData: LinkResponse[]) => {
  const methods = useForm({
    resolver: zodResolver(linkFormSchema),
    defaultValues: defaultValues(mode, initData[0]),
    mode: "onChange",
  });

  const initFoleder = mode === "edit" ? initData[0]?.foldername : "";

  console.log("initData[0]?.isAlert", initData[0]?.isAlert);
  return {
    methods,
    initialFolder: initFoleder,
    initialAlert: mode === "edit" ? initData[0]?.isAlert : "미등록",
  };
};

export default useLinkForm;
