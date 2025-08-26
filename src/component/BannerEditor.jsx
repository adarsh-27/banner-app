import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./BannerEditor.css";

export default function BannerEditor() {
  const bannerRef = useRef(null);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(URL.createObjectURL(file));
    }
  };

  const handleDownload = () => {
    if (bannerRef.current) {
      html2canvas(bannerRef.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "banner.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        setUserImage(null);
        setUserName("");
      });
    }
  };

  return (
    <div className="banner-editor">
      {/* Banner Section */}
      <div
        ref={bannerRef}
        className="banner"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        {/* User Uploaded Image in Fixed Position */}
        {userImage && (
          <img
            src={userImage}
            alt="User Upload"
            className="user-image"
            style={{ bottom: "80px", right: "36px" }} // adjust as per your design
          />
        )}

        {/* User Name */}
        {userName && (
          <p
            className="user-name"
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
