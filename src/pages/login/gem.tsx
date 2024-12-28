import React, { useRef, useEffect } from "react";

const WaveAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = 200;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#4A00E0");
    gradient.addColorStop(0.5, "#8E2DE2");
    gradient.addColorStop(1, "#4A00E0");

    let wave = {
      y: canvas.height / 2,
      length: 0.015,
      amplitude: 60,
      frequency: 0.05,
    };

    let increment = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      const waves = [
        // { y: canvas.height / 2, length: 0.015, amplitude: 20, frequency: 0.05, color: "#4A00E0" },
        { y: canvas.height / 2, length: 0.02, amplitude: 20, frequency: 0.05, color: "#8E2DE2" },
        { y: canvas.height / 2, length: 0.02, amplitude: 10, frequency: 0.05, color: "#7200a5" },
        { y: canvas.height / 2, length: 0.03, amplitude: 10, frequency: 0.05, color: "#d63dc9" },
        { y: canvas.height / 2, length: 0.01, amplitude: 20, frequency: 0.05, color: "#d63dc9" },
        { y: canvas.height / 2, length: 0.02, amplitude: 10, frequency: 0.05, color: "#7200a5" },
        // { y: canvas.height / 2, length: 0.02, amplitude: 10, frequency: 0.05, color: "#0b2d4c" },
        // 0b2d4c
      ];
      
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let i = 0; i < canvas.width; i++) {
          const y =
            wave.y +
            Math.sin(i * wave.length + increment + index) * wave.amplitude ;
          ctx.lineTo(i, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 3;      
        ctx.shadowBlur = 1;
        ctx.globalAlpha = 1;

        ctx.stroke();
      });

      increment += 0.03;
    };

    const animate = () => {
      drawWave();
      requestAnimationFrame(animate);
    };

    animate();

    // Adjust canvas on window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (<><canvas ref={canvasRef} style={{ width: "100%", height: "200px" }} />
<div className="text-white m-4 text-left text-6xl font-thin pl-20" style={{ fontFamily: "Arial, sans-serif" }}>
    Pocketly AI Powers the
</div>
<div className="text-white m-4 text-left text-8xl font-thin pl-20" style={{ fontFamily: "Arial, sans-serif" }}>
    Worlds leading LLMs
</div>
</>  

);
};

export default WaveAnimation;
