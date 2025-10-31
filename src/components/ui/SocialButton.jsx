//  Job Portal Social Button Design
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function SocialButton({ title, onPress, style, icon, provider = 'google' }) {
  const getButtonStyle = () => {
    switch (provider) {
      case 'google':
        return {
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.border,
        };
      case 'whatsapp':
        return {
          backgroundColor: Colors.whatsapp,
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.border,
        };
    }
  };

  const getTextStyle = () => {
    switch (provider) {
      case 'google':
        return {
          color: Colors.textPrimary,
        };
      case 'whatsapp':
        return {
          color: Colors.textPrimary,
        };
      default:
        return {
          color: Colors.textPrimary,
        };
    }
  };

  const getIconStyle = () => {
    switch (provider) {
      case 'google':
        return {
          color: Colors.google,
          fontWeight: 'bold',
        };
      case 'whatsapp':
        return {
          color: Colors.textPrimary,
        };
      default:
        return {
          color: Colors.textPrimary,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.container,
        getButtonStyle(),
        style
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <View style={styles.iconContainer}>
            <Text style={[styles.icon, getIconStyle()]}>{icon}</Text>
          </View>
        )}
        <Text style={[styles.text, getTextStyle()]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});