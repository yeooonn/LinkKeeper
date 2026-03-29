import { zodResolver } from "@hookform/resolvers/zod";
import type { LinkResponse } from "@linkkeeper/shared";
import { linkFormSchema } from "@linkkeeper/shared";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { formatCustomAlertForInput } from "./custom-alert";

export type LinkFormValues = z.infer<typeof linkFormSchema>;

export function getDefaultValuesForForm(
  mode: "create" | "edit",
  init?: LinkResponse,
): LinkFormValues {
  if (mode === "edit" && init) {
    const tags = init.linkTags.map((t) => t.tag.name).join(" ");
    const custom = formatCustomAlertForInput(init.customAlertDate ?? undefined);
    return {
      title: init.title,
      url: init.url,
      tags,
      memo: init.memo ?? "",
      alert: init.alertType ?? "NONE",
      date: custom?.date ?? "",
      time: custom?.time ?? "",
    };
  }
  return {
    title: "",
    url: "",
    tags: "",
    memo: "",
    alert: "NONE",
    date: "",
    time: "",
  };
}

export function useLinkForm(mode: "create" | "edit", init?: LinkResponse) {
  const methods = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: getDefaultValuesForForm(mode, init),
    mode: "onChange",
  });

  const initialFolder =
    mode === "edit" && init
      ? `${init.folder.name}_${init.folder.id}`
      : "";

  return { methods, initialFolder };
}
