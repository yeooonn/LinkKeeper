import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { linkFormSchema } from "@/shared/lib/linkForm.schema";
import { LinkResponse } from "@/entites/link/model/types";

const defaultValues = (mode: string, initData: LinkResponse) => {
  if (mode === "edit" && initData)
    return {
      title: initData.title,
      url: initData.url,
      tags: initData.linkTags.map((tags) => tags.tag.name).join(" "), // tags 문자열로 변환
      memo: initData.memo,
      alert: initData.alertType,
      date: initData.customAlertDate?.toString().split("T")[0],
      time: initData.customAlertDate?.toString().slice(11, 16),
    };

  return {
    title: "",
    url: "",
    tags: "",
    memo: "",
    alert: "NONE",
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

  return {
    methods,
    initialFolder: initFoleder,
    initialAlert: mode === "edit" ? initData[0]?.alertType : "미등록",
  };
};

export default useLinkForm;
