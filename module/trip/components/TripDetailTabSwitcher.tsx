import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type TripDetailTab = "Work" | "Receipts";

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
      {(["Work", "Receipts"] as TripDetailTab[]).map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          className="flex-1 p-2 rounded-full items-center justify-center flex-row gap-2"
          style={{
            backgroundColor:
              activeTab === tab
                ? tab === "Work"
                  ? APP_COLORS.successShadow
                  : APP_COLORS.warningShadow
                : "transparent",
            borderWidth: 1.5,
            borderColor:
              activeTab === tab
                ? tab === "Work"
                  ? APP_COLORS.successButton
                  : APP_COLORS.warningDark
                : "transparent",
          }}
        >
          <Ionicons
            name={tab === "Work" ? "briefcase" : "receipt"}
            size={16}
            color={
              activeTab === tab
                ? tab === "Work"
                  ? APP_COLORS.successDark
                  : APP_COLORS.warningDark
                : APP_COLORS.textSecondary
            }
          />
          <Text
            className="font-poppins-semibold text-sm capitalize"
            style={{
              color:
                activeTab === tab
                  ? tab === "Work"
                    ? APP_COLORS.successDark
                    : APP_COLORS.warningDark
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
