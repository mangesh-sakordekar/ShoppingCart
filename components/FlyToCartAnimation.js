/**
 * FlyToCart.js
 *
 * This component creates a "fly to cart" animation for a product image when added to the cart.
 * It uses React Native Reanimated for smooth transitions. The animation scales and moves
 * the product image from its original position to a fixed cart icon position on the screen.
 *
 * Usage:
 * - Render this component at the root level (e.g., ProductListScreen)
 * - Use a ref to trigger the `fly(fromX, fromY, imageUri)` method
 */

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';

// ForwardRef allows the parent component to control the fly animation
const FlyToCart = forwardRef((props, ref) => {
  // Shared values for animation position, scale, and opacity
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const imageUri = useRef(null); // store the image URI between renders

  // Expose the fly() function to the parent via ref
  useImperativeHandle(ref, () => ({
    fly(fromX, fromY, uri) {
      imageUri.current = uri;
      x.value = fromX;
      y.value = fromY;
      opacity.value = 1;
      scale.value = 1;

      // Destination coordinates for the cart icon (adjust as needed)
      const toX = 400;
      const toY = 800;

      // Perform the animation on the UI thread
      runOnUI(() => {
        x.value = withTiming(toX, { duration: 600 });
        y.value = withTiming(toY, { duration: 600 });
        scale.value = withTiming(0.2, { duration: 600 });
        opacity.value = withTiming(0, { duration: 600 });
      })();
    },
  }));

  // Link animated styles to shared values
  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: y.value,
    left: x.value,
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  // Only render the image while an animation is triggered
  return imageUri.current ? (
    <Animated.View style={[styles.imageContainer, animatedStyle]}>
      <Image source={{ uri: imageUri.current }} style={styles.image} />
    </Animated.View>
  ) : null;
});

export default FlyToCart;

// Styles
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
