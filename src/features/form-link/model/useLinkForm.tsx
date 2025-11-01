import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { linkFormSchema } from "@/shared/lib/linkForm.schema";
import { LinkResponse } from "@/entites/link/model/types";

const formatDateTime = (customAlertDate: string) => {
  if (customAlertDate) {
    const utcDate = new Date(customAlertDate); // DB에서 가져온 UTC Date
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // UTC → KST (+9시간)

    const date = kstDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const time = kstDate.toISOString().slice(11, 16); // HH:mm

    return { date, time };
  }
};

const defaultValues = (mode: string, initData: LinkResponse) => {
  if (mode === "edit" && initData)
    return {
      title: initData.title,
      url: initData.url,
      tags: initData.linkTags.map((tags) => tags.tag.name).join(" "), // tags 문자열로 변환
      memo: initData.memo,
      alert: initData.alertType,
      date: formatDateTime(initData.customAlertDate!)?.date,
      time: formatDateTime(initData.customAlertDate!)?.time,
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

  const joinedId = `${initData[0]?.folder.name}_${initData[0]?.folder.id}`;
  const initFoleder = mode === "edit" ? joinedId : "";

  return {
    methods,
    initialFolder: initFoleder,
    initialAlert: mode === "edit" ? initData[0]?.alertType : "미등록",
  };
};

export default useLinkForm;
