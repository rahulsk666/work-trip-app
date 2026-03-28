import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type TripDetailTab = "work" | "receipts";

interface TripDetailTabSwitcherProps {
  activeTab: TripDetailTab;
  setActiveTab: (tab: TripDetailTab) => void;
}

const TripDetailTabSwitcher = ({
  activeTab,
  setActiveTab,
}: TripDetailTabSwitcherProps) => {
  return (
    <View
      className="flex-row rounded-xl"
      style={{ backgroundColor: APP_COLORS.cardElevated }}
    >
      {(["work", "receipts"] as TripDetailTab[]).map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          className="flex-1 p-2 rounded-lg items-center justify-center flex-row gap-2"
          style={{
            backgroundColor:
              activeTab === tab ? APP_COLORS.primary : "transparent",
          }}
        >
          <Ionicons
            name={tab === "work" ? "briefcase" : "receipt"}
            size={16}
            color={
              activeTab === tab
                ? APP_COLORS.textPrimary
                : APP_COLORS.textSecondary
            }
          />
          <Text
            className="font-poppins-semibold text-sm capitalize"
            style={{
              color:
                activeTab === tab
                  ? APP_COLORS.textPrimary
                  : APP_COLORS.textSecondary,
            }}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TripDetailTabSwitcher;
