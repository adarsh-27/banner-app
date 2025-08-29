import React, { useRef, useState, useEffect } from "react";
import { toPng } from 'html-to-image';
import "./BannerEditor.css";

export default function BannerEditor() {
  const bannerRef = useRef(null);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [dimensions, setDimensions] = useState({
    width: 420,
    height: 580
  });

  // Adjust banner dimensions based on screen size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        // Mobile devices
        setDimensions({
          width: Math.min(320, window.innerWidth - 40),
          height: Math.min(460, window.innerWidth * 1.38)
        });
      } else if (window.innerWidth < 1024) {
        // Tablets
        setDimensions({
          width: Math.min(380, window.innerWidth - 80),
          height: Math.min(530, (window.innerWidth - 80) * 1.38)
        });
      } else {
        // Desktop
        setDimensions({
          width: 420,
          height: 580
        });
      }
    }

    // Set initial dimensions
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(URL.createObjectURL(file));
    }
  };
    
  const handleDownload = () => {
    if (bannerRef.current) {
      // Temporarily hide controls
      const controls = document.querySelector('.controls');
      if (controls) controls.style.visibility = 'hidden';
      
      // Create a high-resolution version of the banner
      const originalWidth = bannerRef.current.offsetWidth;
      const originalHeight = bannerRef.current.offsetHeight;
      
      // Scale up for higher resolution
      const scale = 3;
      
      toPng(bannerRef.current, {
        width: originalWidth * scale,
        height: originalHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${originalWidth}px`,
          height: `${originalHeight}px`
        },
        pixelRatio: 2 // Higher pixel ratio for better quality
      })
      .then((dataUrl) => {
        // Restore controls visibility
        if (controls) controls.style.visibility = 'visible';
        
        const link = document.createElement('a');
        link.download = 'banner.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
        if (controls) controls.style.visibility = 'visible';
      });
    }
  };

  // Calculate responsive positions and sizes
  const userImageStyle = {
    width: `${dimensions.width * 0.32}px`,
    height: `${dimensions.width * 0.41}px`,
    bottom: `${dimensions.height * 0.145}px`,
    right: `${dimensions.width * 0.103}px`
  };

  const userNameStyle = {
    bottom: `${dimensions.height * 0.095}px`,
    left: `${dimensions.width * 0.74}px`,
    width: `${dimensions.width * 0.39}px`,
    fontSize: `${Math.max(12, dimensions.width * 0.04)}px` // Fixed font size calculation
  };

  return (
    <div className="banner-editor">
      {/* Banner Section */}
      <div
        ref={bannerRef}
        className="banner"
        style={{ 
          backgroundImage: "url('/Ganesh1.png')",
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`
        }}
      >
        {/* User Uploaded Image in Fixed Position */}
        {userImage && (
          <img
            src={userImage}
            alt="User Upload"
            className="user-image"
            style={userImageStyle}
          />
        )}

        {/* User Name */}
        {userName && (
          <p
            className="user-name"
            style={userNameStyle}
          >
            {userName}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="controls">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          onClick={handleDownload}
          className="download-btn"
        >
          Download Banner
        </button>
      </div>
    </div>
  );
}