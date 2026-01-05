// src/components/MeasurementInstructionsModal.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

interface MeasurementInstructionsModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  steps: string[];
  images: any[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const MeasurementInstructionsModal: React.FC<
  MeasurementInstructionsModalProps
> = ({ visible, onClose, title, steps, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // 🔹 Reiniciar al abrir el modal
  useEffect(() => {
    if (visible) {
      setCurrentImageIndex(0);
      scrollRef.current?.scrollTo({ x: 0, animated: false });
    }
  }, [visible]);

  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      scrollRef.current?.scrollTo({
        x: (currentImageIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      scrollRef.current?.scrollTo({
        x: (currentImageIndex - 1) * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const onScrollEnd = (e: any) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentImageIndex(newIndex);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.imageContainer}>
            {/* Botón anterior */}
            <TouchableOpacity
              onPress={handlePrev}
              disabled={currentImageIndex === 0}
              style={styles.sideButton}
            >
              <Text
                style={[
                  styles.navButton,
                  currentImageIndex === 0 && styles.disabled,
                ]}
              >
                ◀
              </Text>
            </TouchableOpacity>

            <ScrollView
              horizontal
              pagingEnabled
              ref={scrollRef}
              onMomentumScrollEnd={onScrollEnd}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
            >
              {images.map((img, index) => (
                <Image
                  key={index}
                  source={img}
                  style={styles.image}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>

            {/* Botón siguiente */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={currentImageIndex === images.length - 1}
              style={styles.sideButton}
            >
              <Text
                style={[
                  styles.navButton,
                  currentImageIndex === images.length - 1 && styles.disabled,
                ]}
              >
                ▶
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.stepsContainer}>
            {steps.map((step, i) => (
              <Text key={i} style={styles.stepText}>
                {i + 1}. {step}
              </Text>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: SCREEN_WIDTH - 100, // dejar espacio para botones laterales
    height: 200,
    marginHorizontal: 10,
  },
  sideButton: {
    width: 30,
    alignItems: "center",
  },
  navButton: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B214A",
  },
  disabled: {
    color: "#ccc",
  },
  stepsContainer: {
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    marginBottom: 6,
  },
  closeButton: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#0B214A",
    borderRadius: 6,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MeasurementInstructionsModal;
