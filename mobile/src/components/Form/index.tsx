import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { captureScreen } from 'react-native-view-shot'
import { ArrowLeft } from 'phosphor-react-native';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../libs/api'

import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { FeedbackType } from '../Widget';

interface Props {
  feedbackType: FeedbackType;
  resetFeedback: () => void;
  sendFeedback: () => void;
}

export function Form({ feedbackType, resetFeedback, sendFeedback }: Props) {
  const feedbackInfo = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');

  const handleScreenshot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then((uri) => setScreenshot(uri))
      .catch(err => console.error(err.message))
  };

  const handleScreenshotRemove = () => {
    setScreenshot(null);
  };

  const handleSendFeedback = async () => {
    if (loading) return;
    setLoading(true);
    const screenshotBase64 = screenshot &&
      await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

    try {

      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `date:image/png;base64, ${screenshotBase64}`,
        comment,
      })

      sendFeedback();

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={resetFeedback} >

          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.surface_secondary}
          />

        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        autoCorrect={false}
        multiline
        style={styles.input}
        placeholder="Conte-nos no detalhe o que está acontecendo."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onRemoveShot={handleScreenshotRemove}
          onTakeShot={handleScreenshot}
          screenshot={screenshot}
        />
        <Button
          onPress={handleSendFeedback}
          isLoading={loading}
        />
      </View>
    </View>
  );
}