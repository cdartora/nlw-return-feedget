import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from '..'
import { ArrowLeft } from "phosphor-react";
import { ScreenshotButton } from '../ScreenshotButton'
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "../Loading";

interface FeedbackContentStepProps {
  onFeedbackSent: () => void
  feedbackType: FeedbackType; // estado
  feedbackRestart: () => void; // função para resetar o estado
}

export function FeedbackContentStep(props: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypes[props.feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const handleSubmitFeedback = async (event: FormEvent) => {
    event.preventDefault();
    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: props.feedbackType,
      comment,
      screenshot,
    });

    setIsSendingFeedback(false);
    props.onFeedbackSent();
  };

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          onClick={props.feedbackRestart}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">

          <img className="2-6 h-6" src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
          {feedbackTypeInfo.title}

        </span>

        <CloseButton />

      </header>

      <form className='mt-4 w-full' onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder:zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:outline-none focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo"
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 my-2 w-full">
          <ScreenshotButton
            onScreenshotButton={setScreenshot}
            screenshot={screenshot}
          />

          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-700 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:border-brand-500"
            disabled={comment.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>

        </footer>
      </form >
    </>
  );
}