import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotButton: (screenshot: string | null) => void;
}

export function ScreenshotButton(props: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  const handleScreenshot = async () => {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png');

    props.onScreenshotButton(base64image);
    setIsTakingScreenshot(false);
  };

  if (props.screenshot) {
    return <button
      type="button"
      className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end flex-end text-zinc-400 hover:text-zinc-100 transition-colors"
      style={{
        backgroundImage: `url(${props.screenshot})`,
        backgroundPosition: 'right bottom',
        backgroundSize: 180,
      }}
      onClick={() => props.onScreenshotButton(null)}>
      <Trash weight="fill" />
    </button>
  }

  return (
    <button
      type="button"
      onClick={handleScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-700 focus:ring-brand-500"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
};