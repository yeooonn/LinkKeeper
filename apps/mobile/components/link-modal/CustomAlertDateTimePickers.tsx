import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useMemo, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import {
  formatDateYMD,
  formatTimeHM,
  localDateFromFormStrings,
} from "../../lib/custom-alert";
import type { LinkFormValues } from "../../lib/use-link-form";
import { BottomSheetPickerModal } from "./BottomSheetPickerModal";

function useMinimumTimeForPicker(dateStr: string | undefined) {
  return useMemo(() => {
    if (!dateStr?.trim()) return undefined;
    const d = localDateFromFormStrings(dateStr, "00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sel = new Date(d);
    sel.setHours(0, 0, 0, 0);
    if (sel.getTime() === today.getTime()) {
      return new Date();
    }
    return undefined;
  }, [dateStr]);
}

function DatePickerField() {
  const { control } = useFormContext<LinkFormValues>();
  const timeStr = useWatch({ control, name: "time" });
  const [showAndroid, setShowAndroid] = useState(false);
  const [iosOpen, setIosOpen] = useState(false);
  const [iosDraft, setIosDraft] = useState(() => new Date());

  return (
    <Controller
      control={control}
      name="date"
      render={({ field: { onChange, value } }) => (
        <>
          <Pressable
            onPress={() => {
              const base = localDateFromFormStrings(value, timeStr);
              setIosDraft(base);
              if (Platform.OS === "android") setShowAndroid(true);
              else setIosOpen(true);
            }}
            className="rounded-xl border border-border-primary bg-background-secondary px-3 py-2.5"
          >
            <Text
              className={`text-base ${value?.trim() ? "text-foreground-primary" : "text-foreground-trtiary"}`}
            >
              {value?.trim() ? value : "날짜 선택"}
            </Text>
          </Pressable>
          {showAndroid && Platform.OS === "android" ? (
            <DateTimePicker
              value={localDateFromFormStrings(value, timeStr)}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setShowAndroid(false);
                if (event.type === "set" && selectedDate) {
                  onChange(formatDateYMD(selectedDate));
                }
              }}
            />
          ) : null}
          {Platform.OS === "ios" ? (
            <BottomSheetPickerModal
              visible={iosOpen}
              onDismiss={() => setIosOpen(false)}
            >
              <View className="rounded-t-xl bg-background-secondary p-4 pb-8">
                <View className="mb-2 flex-row justify-between">
                  <Pressable onPress={() => setIosOpen(false)}>
                    <Text className="text-base text-blue-600">취소</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      onChange(formatDateYMD(iosDraft));
                      setIosOpen(false);
                    }}
                  >
                    <Text className="text-base font-semibold text-blue-600">
                      완료
                    </Text>
                  </Pressable>
                </View>
                <DateTimePicker
                  value={iosDraft}
                  mode="date"
                  display="spinner"
                  minimumDate={new Date()}
                  onChange={(_, d) => {
                    if (d) setIosDraft(d);
                  }}
                  locale="ko-KR"
                />
              </View>
            </BottomSheetPickerModal>
          ) : null}
        </>
      )}
    />
  );
}

function TimePickerField() {
  const { control } = useFormContext<LinkFormValues>();
  const dateStr = useWatch({ control, name: "date" });
  const minForTime = useMinimumTimeForPicker(dateStr);
  const [showAndroid, setShowAndroid] = useState(false);
  const [iosOpen, setIosOpen] = useState(false);
  const [iosDraft, setIosDraft] = useState(() => new Date());

  return (
    <Controller
      control={control}
      name="time"
      render={({ field: { onChange, value } }) => (
        <>
          <Pressable
            onPress={() => {
              const base = localDateFromFormStrings(dateStr, value);
              setIosDraft(base);
              if (Platform.OS === "android") setShowAndroid(true);
              else setIosOpen(true);
            }}
            className="rounded-xl border border-border-primary bg-background-secondary px-3 py-2.5"
          >
            <Text
              className={`text-base ${value?.trim() ? "text-foreground-primary" : "text-foreground-trtiary"}`}
            >
              {value?.trim() ? value : "시간 선택"}
            </Text>
          </Pressable>
          {showAndroid && Platform.OS === "android" ? (
            <DateTimePicker
              value={localDateFromFormStrings(dateStr, value)}
              mode="time"
              display="default"
              is24Hour
              minimumDate={minForTime}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setShowAndroid(false);
                if (event.type === "set" && selectedDate) {
                  onChange(formatTimeHM(selectedDate));
                }
              }}
            />
          ) : null}
          {Platform.OS === "ios" ? (
            <BottomSheetPickerModal
              visible={iosOpen}
              onDismiss={() => setIosOpen(false)}
            >
              <View className="rounded-t-xl bg-background-secondary p-4 pb-8">
                <View className="mb-2 flex-row justify-between">
                  <Pressable onPress={() => setIosOpen(false)}>
                    <Text className="text-base text-blue-600">취소</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      onChange(formatTimeHM(iosDraft));
                      setIosOpen(false);
                    }}
                  >
                    <Text className="text-base font-semibold text-blue-600">
                      완료
                    </Text>
                  </Pressable>
                </View>
                <DateTimePicker
                  value={iosDraft}
                  mode="time"
                  display="spinner"
                  is24Hour
                  minimumDate={minForTime}
                  onChange={(_, d) => {
                    if (d) setIosDraft(d);
                  }}
                  locale="ko-KR"
                />
              </View>
            </BottomSheetPickerModal>
          ) : null}
        </>
      )}
    />
  );
}

export function CustomAlertDateTimePickers() {
  return (
    <View className="flex-row gap-2">
      <View className="flex-1">
        <Text className="mb-1 text-xs text-foreground-secondary">날짜</Text>
        <DatePickerField />
      </View>
      <View className="flex-1">
        <Text className="mb-1 text-xs text-foreground-secondary">시간</Text>
        <TimePickerField />
      </View>
    </View>
  );
}
