import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  animationType?: "slide" | "none" | "fade";
  children: React.ReactNode;
}

const Dialog = ({
  open,
  onClose,
  animationType = "slide",
  children,
}: DialogProps) => {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 bg-black/70 justify-center items-center"
        activeOpacity={1}
        onPress={onClose}
      >
        {/* modal box - stop touch propagation */}
        <View className="bg-background p-6 w-[90%] rounded-xl border border-borderSubtle">
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Dialog;
