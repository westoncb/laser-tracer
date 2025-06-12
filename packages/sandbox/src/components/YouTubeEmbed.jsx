export default function YouTubeEmbed({ videoId }) {
  return (
    <>
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Laser-Tracer Demo"
        ></iframe>
      </div>
      <style>{`
        .video-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
      `}</style>
    </>
  );
}
