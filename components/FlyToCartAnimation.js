import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';

const FlyToCart = forwardRef((props, ref) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const imageUri = useRef(null);

  useImperativeHandle(ref, () => ({
    fly(fromX, fromY, uri) {
      imageUri.current = uri;
      x.value = fromX;
      y.value = fromY;
      opacity.value = 1;
      scale.value = 1;

      const toX = 400; // adjust to match cart icon position
      const toY = 800;

      runOnUI(() => {
        x.value = withTiming(toX, { duration: 600 });
        y.value = withTiming(toY, { duration: 600 });
        scale.value = withTiming(0.2, { duration: 600 });
        opacity.value = withTiming(0, { duration: 600 });
      })();
    },
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: y.value,
    left: x.value,
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return imageUri.current ? (
    <Animated.View style={[styles.imageContainer, animatedStyle]}>
      <Image source={{ uri: imageUri.current }} style={styles.image} />
    </Animated.View>
  ) : null;
});

export default FlyToCart;

const styles = StyleSheet.create({
  imageContainer: {
    zIndex: 1000,
    position: 'absolute',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
