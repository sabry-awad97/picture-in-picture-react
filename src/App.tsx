import { useEffect, useRef } from 'react';

async function selectMediaStream(videoElement: HTMLVideoElement) {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => videoElement.play();
  } catch (error) {
    // Catch Error Here
  }
}

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    selectMediaStream(videoRef.current);
  }, []);

  return (
    <>
      <video ref={videoRef} controls height="360" width="640" hidden></video>
      <div className="button-container">
        <button
          ref={buttonRef}
          onClick={async () => {
            buttonRef.current!.disabled = true;
            await videoRef.current!.requestPictureInPicture();
            buttonRef.current!.disabled = false;
          }}
        >
          START
        </button>
      </div>
    </>
  );
};

export default App;
