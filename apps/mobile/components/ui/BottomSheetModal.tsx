import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const SCREEN_H = Dimensions.get("window").height;

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

/**
 * 시트는 항상 화면 하단(bottom:0)에 고정. flex-end 정렬 대신 absolute로 두어
 * 하단에 딤이 비는 문제를 막음.
 */
export function BottomSheetModal({ visible, onClose, children }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(SCREEN_H)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const prevVisible = useRef(false);

  useEffect(() => {
    const wasOpen = prevVisible.current;
    prevVisible.current = visible;

    if (visible && !wasOpen) {
      setModalVisible(true);
      translateY.setValue(SCREEN_H);
      opacity.setValue(0);
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 68,
            friction: 12,
          }),
        ]).start();
      });
    } else if (!visible && wasOpen) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SCREEN_H,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start(() => setModalVisible(false));
    }
  }, [visible]);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      presentationStyle={Platform.OS === "ios" ? "overFullScreen" : undefined}
    >
      <View style={styles.root} pointerEvents="box-none">
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { opacity, backgroundColor: "rgba(0,0,0,0.5)" },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={onClose}
            accessibilityLabel="닫기"
          />
        </Animated.View>

        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
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
    margin: 0,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
  },
});
