import { fetchAPI } from "@linkkeeper/shared";
import { ALERT_OPTION } from "@linkkeeper/shared";
import type { LinkResponse } from "@linkkeeper/shared";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, Controller, useFormContext } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "../ui/BottomSheetModal";
import type { FolderApiItem } from "../../lib/folder-types";
import { CustomAlertDateTimePickers } from "./CustomAlertDateTimePickers";
import { parseCustomAlertFromInput } from "../../lib/custom-alert";
import { parseTagString } from "../../lib/link-tag-parse";
import { useLineStepper } from "../../lib/use-line-stepper";
import {
  getDefaultValuesForForm,
  useLinkForm,
  type LinkFormValues,
} from "../../lib/use-link-form";

function apiBase(): string {
  return (process.env.EXPO_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");
}

function folderDisplayName(slug: string): string {
  return slug.includes("_") ? (slug.split("_")[0] ?? slug) : slug;
}

const WINDOW_H = Dimensions.get("window").height;

function LinkModalFormInner({
  step,
  folders,
  foldersLoading,
  selectedItem,
  setSelectedItem,
  newFolderName,
  setNewFolderName,
  folderSearch,
  setFolderSearch,
  showAddFolderInput,
  setShowAddFolderInput,
}: {
  step: number;
  folders: FolderApiItem[] | undefined;
  foldersLoading: boolean;
  selectedItem: string;
  setSelectedItem: (s: string) => void;
  newFolderName: string;
  setNewFolderName: (s: string) => void;
  folderSearch: string;
  setFolderSearch: (s: string) => void;
  showAddFolderInput: boolean;
  setShowAddFolderInput: (v: boolean) => void;
}) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<LinkFormValues>();

  const filtered = useMemo(() => {
    if (!folders?.length) return [];
    const q = folderSearch.trim().toLowerCase();
    if (!q) return folders;
    return folders.filter((f) => f.name.toLowerCase().includes(q));
  }, [folders, folderSearch]);

  if (step === 0) {
    return (
      <View className="gap-4">
        <View>
          <Text className="mb-1 text-sm font-medium text-foreground-primary">
            파일명 <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="rounded-xl border border-border-primary bg-background-secondary px-3 py-2.5 text-base text-foreground-primary"
                placeholder="파일명"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.title ? (
            <Text className="mt-1 text-xs text-red-500">
              {errors.title.message}
            </Text>
          ) : null}
        </View>
        <View>
          <Text className="mb-1 text-sm font-medium text-foreground-primary">
            URL <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="url"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="rounded-xl border border-border-primary bg-background-secondary px-3 py-2.5 text-base text-foreground-primary"
                placeholder="https://"
                autoCapitalize="none"
                keyboardType="url"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.url ? (
            <Text className="mt-1 text-xs text-red-500">
              {errors.url.message}
            </Text>
          ) : null}
        </View>
        <View>
          <Text className="mb-1 text-sm font-medium text-foreground-primary">
            태그
          </Text>
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="rounded-xl border border-border-primary bg-background-secondary px-3 py-2.5 text-base text-foreground-primary"
                placeholder="#태그1 #태그2"
                onChangeText={onChange}
                value={value ?? ""}
              />
            )}
          />
          <Text className="mt-1 text-xs text-foreground-trtiary">
            태그는 #으로 시작하고 공백으로 구분합니다.
          </Text>
        </View>
        <View>
          <Text className="mb-1 text-sm font-medium text-foreground-primary">
            메모
          </Text>
          <Controller
            control={control}
            name="memo"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="min-h-[88px] rounded-xl border border-border-primary bg-background-secondary px-3 py-2.5 text-base text-foreground-primary"
                placeholder="메모"
                multiline
                textAlignVertical="top"
                onChangeText={onChange}
                value={value ?? ""}
              />
            )}
          />
        </View>
      </View>
    );
  }

  if (step === 1) {
    return (
      <View>
        <View className="mb-2 rounded-xl bg-background-hover px-3 py-2">
          <Text className="text-sm text-foreground-primary" numberOfLines={2}>
            {watch("title")}
          </Text>
        </View>
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-base font-medium text-foreground-primary">
            폴더 선택 <Text className="text-red-500">*</Text>
          </Text>
          <Pressable
            onPress={() => {
              setShowAddFolderInput(!showAddFolderInput);
              if (!showAddFolderInput) setSelectedItem("");
            }}
            className="rounded-lg border border-blue-500 px-3 py-1.5"
          >
            <Text className="text-sm text-blue-600">
              {showAddFolderInput ? "취소" : "폴더 추가"}
            </Text>
          </Pressable>
        </View>
        <TextInput
          className="mb-2 rounded-xl border border-border-primary bg-background-secondary px-3 py-2 text-base"
          placeholder="폴더 검색"
          value={folderSearch}
          onChangeText={setFolderSearch}
        />
        <View className="max-h-64 rounded-xl border border-border-primary">
          {foldersLoading ? (
            <ActivityIndicator className="py-8" />
          ) : (
            <ScrollView keyboardShouldPersistTaps="handled">
              {showAddFolderInput ? (
                <Pressable
                  onPress={() => setSelectedItem(newFolderName.trim())}
                  className={`flex-row items-center gap-2 border-b border-border-muted px-3 py-3 ${
                    selectedItem === newFolderName.trim() &&
                    newFolderName.trim()
                      ? "bg-background-blueTag"
                      : ""
                  }`}
                >
                  <Ionicons name="folder-outline" size={20} color="#3b82f6" />
                  <TextInput
                    className="flex-1 text-base text-foreground-primary"
                    placeholder="새 폴더 이름"
                    value={newFolderName}
                    onChangeText={setNewFolderName}
                  />
                </Pressable>
              ) : null}
              {filtered.map((f) => {
                const slug = `${f.name}_${f.id}`;
                const sel = selectedItem === slug;
                return (
                  <Pressable
                    key={f.id}
                    onPress={() => setSelectedItem(slug)}
                    className={`flex-row items-center gap-2 border-b border-border-muted px-3 py-3 ${
                      sel
                        ? "bg-background-blueTag"
                        : "active:bg-background-hover"
                    }`}
                  >
                    <Ionicons
                      name={sel ? "folder-open" : "folder-outline"}
                      size={20}
                      color="#3b82f6"
                    />
                    <Text className="flex-1 text-base text-foreground-primary">
                      {f.name}
                    </Text>
                    <Text className="text-xs text-foreground-trtiary">
                      {f.links.length}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }

  return (
    <View className="gap-4">
      <View className="mb-2 rounded-xl bg-background-hover px-3 py-2">
        <Text className="text-sm text-foreground-primary" numberOfLines={2}>
          {watch("title")}
        </Text>
      </View>
      <Text className="mb-1 text-sm font-medium text-foreground-primary">
        알림 설정
      </Text>
      <Controller
        control={control}
        name="alert"
        render={({ field: { onChange, value } }) => (
          <View className="gap-1">
            {ALERT_OPTION.map((opt) => {
              const active = (value ?? "NONE") === opt.value;
              return (
                <Pressable
                  key={opt.key}
                  onPress={() => onChange(opt.value)}
                  className={`flex-row items-center justify-between rounded-xl border px-3 py-3 ${
                    active
                      ? "border-blue-500 bg-background-blueTag"
                      : "border-border-primary bg-background-secondary"
                  }`}
                >
                  <Text
                    className={`text-base ${active ? "font-semibold text-blue-800" : "text-foreground-primary"}`}
                  >
                    {opt.label}
                  </Text>
                  {active ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#2563eb"
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        )}
      />
      {watch("alert") === "CUSTOM" ? <CustomAlertDateTimePickers /> : null}
      {errors.time ? (
        <Text className="text-xs text-red-500">{errors.time.message}</Text>
      ) : null}
    </View>
  );
}

type Props = {
  visible: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initLink?: LinkResponse;
  userId: string;
  folders: FolderApiItem[] | undefined;
  foldersLoading: boolean;
};

export function LinkModal({
  visible,
  onClose,
  mode,
  initLink,
  userId,
  folders,
  foldersLoading,
}: Props) {
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const lineCount = 3;
  const {
    step,
    setStep,
    showNextButton,
    showPrevButton,
    showAddButton,
    handleClickNextButton,
    handleClickPrevButton,
  } = useLineStepper(lineCount);

  const { methods } = useLinkForm(mode, mode === "edit" ? initLink : undefined);

  const [selectedItem, setSelectedItem] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [folderSearch, setFolderSearch] = useState("");
  const [showAddFolderInput, setShowAddFolderInput] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setStep(0);
    const init = mode === "edit" ? initLink : undefined;
    methods.reset(getDefaultValuesForForm(mode, init));
    setSelectedItem(
      mode === "edit" && initLink
        ? `${initLink.folder.name}_${initLink.folder.id}`
        : "",
    );
    setNewFolderName("");
    setFolderSearch("");
    setShowAddFolderInput(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 모달 열릴 때만 초기화
  }, [visible, mode, initLink?.id]);

  const base = apiBase();

  const submitMut = useMutation({
    mutationFn: async (data: LinkFormValues) => {
      if (!base) throw new Error("API URL 없음");
      const customAlertDate =
        data.alert === "CUSTOM"
          ? parseCustomAlertFromInput(data.date, data.time)
          : null;
      const tags = parseTagString(data.tags);
      const foldername = selectedItem.includes("_")
        ? folderDisplayName(selectedItem)
        : selectedItem.trim() || newFolderName.trim();

      if (!foldername) {
        throw new Error("폴더를 선택하거나 이름을 입력하세요.");
      }

      const payload: Record<string, unknown> = {
        title: data.title,
        url: data.url,
        memo: data.memo ?? "",
        tag: tags,
        foldername,
        alertType: data.alert ?? "NONE",
        customAlertDate:
          customAlertDate && data.alert === "CUSTOM"
            ? customAlertDate.toISOString()
            : null,
        isBookmark: mode === "edit" && initLink ? initLink.isBookmark : false,
        linkReads: mode === "edit" && initLink ? initLink.linkReads : [],
        id: userId,
      };

      if (mode === "create") {
        const res = await fetchAPI<
          string | { message?: string; error?: string }
        >("api/create/link", {
          method: "POST",
          body: payload as never,
          baseUrl: base,
          credentials: "omit",
        });
        if (res && typeof res === "object" && "message" in res && res.message) {
          throw new Error(String(res.message));
        }
        if (res && typeof res === "object" && "error" in res && res.error) {
          throw new Error(String(res.error));
        }
        return res;
      }

      if (!initLink) throw new Error("수정 대상 없음");
      const res = await fetchAPI<string | { message?: string; error?: string }>(
        `api/links/${initLink.id}/update`,
        {
          method: "PUT",
          body: payload as never,
          baseUrl: base,
          credentials: "omit",
        },
      );
      if (res && typeof res === "object" && "message" in res && res.message) {
        throw new Error(String(res.message));
      }
      if (res && typeof res === "object" && "error" in res && res.error) {
        throw new Error(String(res.error));
      }
      return res;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["links"] });
      void qc.invalidateQueries({ queryKey: ["folders"] });
      onClose();
      Alert.alert(mode === "create" ? "추가되었습니다." : "수정되었습니다.");
    },
    onError: (e: Error) => {
      Alert.alert("오류", e.message || "요청에 실패했습니다.");
    },
  });

  const onSubmit = (data: LinkFormValues) => {
    submitMut.mutate(data);
  };

  const title = methods.watch("title");
  const url = methods.watch("url");
  const alertVal = methods.watch("alert");

  const isFirstNextActive = Boolean(title && url && step === 0);
  const isSecondNextActive = Boolean(
    (selectedItem.trim() || newFolderName.trim()) && step === 1,
  );

  const isAddOk =
    alertVal === "CUSTOM"
      ? Boolean(methods.watch("date") && methods.watch("time"))
      : true;

  const nextDisabled =
    showNextButton &&
    ((step === 0 && !isFirstNextActive) || (step === 1 && !isSecondNextActive));

  const addDisabled = showAddButton && !isAddOk;

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View
        className="rounded-t-3xl bg-background-secondary"
        style={{
          paddingBottom: insets.bottom,
          maxHeight: WINDOW_H * 0.92,
        }}
      >
        <View className="flex-row items-center justify-between border-b border-border-primary px-5 py-4">
          <Text className="text-lg font-bold text-foreground-primary">
            {mode === "create" ? "새 링크 추가" : "링크 수정"}
          </Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={26} color="#404040" />
          </Pressable>
        </View>

        <View className="flex-row items-center justify-center gap-1 py-3">
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              className={`h-2 w-8 rounded-full ${step >= i ? "bg-blue-500" : "bg-gray-200"}`}
            />
          ))}
        </View>

        <ScrollView
          className="px-5"
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
          contentContainerStyle={{ paddingBottom: 28 }}
        >
          <FormProvider {...methods}>
            <LinkModalFormInner
              step={step}
              folders={folders}
              foldersLoading={foldersLoading}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              newFolderName={newFolderName}
              setNewFolderName={setNewFolderName}
              folderSearch={folderSearch}
              setFolderSearch={setFolderSearch}
              showAddFolderInput={showAddFolderInput}
              setShowAddFolderInput={setShowAddFolderInput}
            />
          </FormProvider>
        </ScrollView>

        <View className="flex-row flex-wrap items-center justify-end gap-2 border-t border-border-muted px-5 py-4">
          <Pressable
            onPress={onClose}
            className="rounded-xl bg-gray-200 px-4 py-2.5 active:opacity-80"
          >
            <Text className="font-medium text-foreground-primary">취소</Text>
          </Pressable>
          {showPrevButton ? (
            <Pressable
              onPress={handleClickPrevButton}
              className="rounded-xl bg-gray-200 px-4 py-2.5 active:opacity-80"
            >
              <Text className="font-medium text-foreground-primary">이전</Text>
            </Pressable>
          ) : null}
          {showNextButton ? (
            <Pressable
              disabled={nextDisabled || submitMut.isPending}
              onPress={handleClickNextButton}
              className={`rounded-xl px-4 py-2.5 ${nextDisabled ? "bg-background-hover" : "bg-blue-600"}`}
            >
              <Text
                className={`font-medium ${nextDisabled ? "text-foreground-trtiary" : "text-white"}`}
              >
                다음
              </Text>
            </Pressable>
          ) : null}
          {showAddButton ? (
            <Pressable
              disabled={addDisabled || submitMut.isPending}
              onPress={methods.handleSubmit(onSubmit)}
              className={`rounded-xl px-4 py-2.5 ${addDisabled ? "bg-background-hover" : "bg-blue-600"}`}
            >
              {submitMut.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  className={`font-medium ${addDisabled ? "text-foreground-trtiary" : "text-white"}`}
                >
                  {mode === "create" ? "추가" : "수정"}
                </Text>
              )}
            </Pressable>
          ) : null}
        </View>
      </View>
    </BottomSheetModal>
  );
}
