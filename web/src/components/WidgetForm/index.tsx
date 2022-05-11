import { useState } from 'react'

import bugUrl from '../../../assets/bug.svg';
import ideaUrl from '../../../assets/idea.svg';
import thoughtUrl from '../../../assets/thought.svg';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccess';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugUrl,
      alt: 'Imagem de uma larva'
    }
  },
  THOUGHT: {
    title: 'Ideia',
    image: {
      source: ideaUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OUTRO: {
    title: 'Outro',
    image: {
      source: thoughtUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const feedbackRestart = () => {
    setFeedbackType(null)
    setFeedbackSent(false)
  };

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {
        feedbackSent ? (
          <FeedbackSuccessStep onFeedbackRestart={feedbackRestart} />
        ) : (
          <>
            {!feedbackType ? (
              <FeedbackTypeStep setFeedbackType={setFeedbackType} />
            ) : (
              <FeedbackContentStep
                feedbackRestart={feedbackRestart}
                feedbackType={feedbackType}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )
            }
          </>
        )
      }

      <footer className="text-xs text-neutral-400">
        feito com ♥ por <a className="underline underline-offset-2" target="_blank" href="https://carlos-dartora.super.site/">Carlos Dartora</a>
      </footer>
    </div >
  )
}