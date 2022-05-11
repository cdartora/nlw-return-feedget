import { CloseButton } from "../../CloseButton";
import SuccessIconUrl from '../../../../assets/emoji.svg';

interface FeedbackSuccessStepProps {
  onFeedbackRestart: () => void;
}

export function FeedbackSuccessStep(props: FeedbackSuccessStepProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>
      <div className="flex flex-col items-center py-10 w-[304px]">
        <img
          className="w-10 h-10"
          src={SuccessIconUrl}
          alt="Emoji de correto"
        />
        <span className="text-xl mt-2">Agradecemos seu feedback</span>
        <button
          type="button"
          className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-700 focus:ring-brand-500"
          onClick={props.onFeedbackRestart}
        >
          Quero enviar outro
        </button>
      </div>
    </>
  );
}