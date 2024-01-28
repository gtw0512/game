import React, {useRef, useEffect} from 'react';
import {Animated, Button, InteractionManager} from 'react-native';

// setValue();
// addListener(callback);
// removeAllListener();
// stopAnimation();
// resetAnimation();
// setOffset();
// flattenOffset();
// extractOffset();

export default function AnimatedValue() {
  const translateXAnim = useRef(new Animated.Value(-100)).current;  // xanim 수치 값 -100

  useEffect(() => {// 모든터치가 종료되거나 취소 될때까지 콜백을 지연시킴
    InteractionManager.runAfterInteractions(() => {
      console.log(1);  // 로그를 1 찍는다
    });

    return () => translateXAnim.removeAllListeners();  // 초기값으로  xanim값을 없애버림
  });

  const onButtonPress = () => {
    translateXAnim.setValue(-100);
    translateXAnim.addListener(({value}) => console.log(value));

    setTimeout(() => {
      translateXAnim.resetAnimation();
    }, 500);

    Animated.timing(translateXAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Button title="움직여라!" onPress={onButtonPress} />
      <Animated.Text
        style={{fontSize: 70, transform: [{translateX: translateXAnim}]}}
      >
        🍊
      </Animated.Text>
    </>
  );
}