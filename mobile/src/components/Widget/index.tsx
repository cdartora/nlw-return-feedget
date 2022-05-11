import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import { Options } from '../Options';
import { Success } from '../Success';
import { Form } from '../Form';
import { styles } from './styles';
import { theme } from '../../theme';

import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function resetFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function sendFeedback() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent ? (
            <Success onSentAnotherFeedback={resetFeedback} />
          ) : (
            <>
              {
                feedbackType ? (
                  <Form feedbackType={feedbackType} resetFeedback={resetFeedback} sendFeedback={sendFeedback} />
                ) : (
                  <Options onFeedbackTypeChange={setFeedbackType} />
                )
              }
            </>
          )
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);