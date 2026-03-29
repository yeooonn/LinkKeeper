import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";

const WINDOW_H = Dimensions.get("window").height;
const SHEET_INITIAL_OFFSET = Math.min(420, WINDOW_H * 0.55);

type Props = {
  visible: boolean;
  /** 닫기 요청 (배경 탭, Android 뒤로가기) 시 부모가 visible을 false로 줄 것 */
  onDismiss: () => void;
  children: React.ReactNode;
  sheetStyle?: ViewStyle;
};

/**
 * 배경 딤은 페이드만 하고, 하단 시트만 아래에서 올라오도록 분리 애니메이션.
 * 부모의 visible이 false가 되면 시트를 먼저 내려 보낸 뒤 Modal을 제거한다.
 */
export function BottomSheetPickerModal({
  visible,
  onDismiss,
  children,
  sheetStyle,
}: Props) {
  const [internalVisible, setInternalVisible] = useState(false);
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(
    new Animated.Value(SHEET_INITIAL_OFFSET),
  ).current;
  const closingAnimationRef = useRef(false);

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && internalVisible) {
      backdropOpacity.setValue(0);
      sheetTranslateY.setValue(SHEET_INITIAL_OFFSET);
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(sheetTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 68,
          friction: 12,
        }),
      ]).start();
    }
  }, [visible, internalVisible, backdropOpacity, sheetTranslateY]);

  useEffect(() => {
    if (!visible && internalVisible) {
      if (closingAnimationRef.current) return;
      closingAnimationRef.current = true;
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: SHEET_INITIAL_OFFSET,
          duration: 240,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        closingAnimationRef.current = false;
        if (finished) {
          setInternalVisible(false);
        }
      });
    }
  }, [visible, internalVisible, backdropOpacity, sheetTranslateY]);

  const handleRequestClose = () => {
    onDismiss();
  };

  return (
    <Modal
      visible={internalVisible}
      transparent
      animationType="none"
      onRequestClose={handleRequestClose}
    >
      <View style={styles.root} pointerEvents="box-none">
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: backdropOpacity,
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleRequestClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            { transform: [{ translateY: sheetTranslateY }] },
            sheetStyle,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    width: "100%",
    zIndex: 2,
    elevation: 8,
  },
});
