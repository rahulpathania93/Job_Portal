import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secure = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  error = null,
  leftIcon = null,
  rightIcon = null,
  onRightIconPress = null,
  style = {},
  inputStyle = {},
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getInputStyle = () => {
    return {
      flex: 1,
      fontSize: 16,
      color: Colors.inputText,
      paddingVertical: multiline ? 12 : 16,
      textAlignVertical: multiline ? 'top' : 'center',
      minHeight: multiline ? 80 : 48,
    };
  };

  const getContainerStyle = () => {
    return {
      flexDirection: 'row',
      alignItems: multiline ? 'flex-start' : 'center',
      borderWidth: 1,
      borderColor: error ? Colors.error : (isFocused ? Colors.inputBorderFocus : Colors.inputBorder),
      borderRadius: 8,
      backgroundColor: disabled ? Colors.surface : Colors.inputBackground,
      paddingHorizontal: 16,
      paddingVertical: multiline ? 12 : 0,
      minHeight: multiline ? 80 : 48,
      opacity: disabled ? 0.6 : 1,
    };
  };

  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View style={getContainerStyle()}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}

        <TextInput
          style={[getInputStyle(), inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure && !showPassword}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholderTextColor={Colors.inputPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          editable={!disabled}
        />

        {secure && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.rightIconContainer}
          >
            <Text style={styles.eyeIcon}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && !secure && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  leftIconContainer: {
    marginRight: 12,
    marginTop: 0,
  },
  rightIconContainer: {
    marginLeft: 12,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default InputField;