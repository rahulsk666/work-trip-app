import React from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

interface DialogProps {
  modalVisible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({ modalVisible, onRequestClose, children }: DialogProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onRequestClose}
      >
        {/* modal box - stop touch propagation */}
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center", // ← centers vertically
    alignItems: "center", // ← centers horizontally
  },
  container: {
    backgroundColor: "#162635",
    borderRadius: 12,
    padding: 24,
    width: "90%",
    borderWidth: 1,
    borderColor: "#1F3446",
  },
});

export default Dialog;
