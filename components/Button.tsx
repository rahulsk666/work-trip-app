import { cn } from "@/lib/utils";
import { Text, TouchableOpacity } from "react-native";

type ButtonVariant =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "muted";

interface ButtonProps {
  text: string;
  classname?: string;
  disabled?: boolean;
  activeOpacity?: number;
  variant?: ButtonVariant;
  onPress: () => void;
  style?: object;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  muted: "bg-mutedBlue",
};

const Button = ({
  text,
  classname,
  activeOpacity = 0.8,
  variant = "primary",
  disabled,
  onPress,
  style,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "mx-6 mb-6 rounded-lg items-center justify-center py-3",
        variantStyles[variant],
        disabled && "opacity-50",
        classname,
      )}
      style={style}
    >
      <Text className="text-white text-lg font-medium">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
