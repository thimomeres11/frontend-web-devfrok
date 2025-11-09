import { useState } from "react";
import "../App.css";

type ImageType = {
  id: number;
  url: string;
};

const Gallery = () => {
  const [images, setImages] = useState<ImageType[]>([
    { id: 1, url: "https://picsum.photos/id/10/400/300" },
    { id: 2, url: "https://picsum.photos/id/11/400/300" },
    { id: 3, url: "https://picsum.photos/id/12/400/300" },
    { id: 4, url: "https://picsum.photos/id/13/400/300" },
    { id: 5, url: "https://picsum.photos/id/14/400/300" },
    { id: 6, url: "https://picsum.photos/id/15/400/300" },
  ]);

  const addImage = () => {
    const newId = Math.floor(Math.random() * 100) + 20;
    const newImage = {
      id: newId,
      url: `https://picsum.photos/id/${newId}/400/300`,
    };
    setImages([...images, newImage]);
  };

  const deleteImage = (idToDelete: number) => {
    setImages(images.filter((img) => img.id !== idToDelete));
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <h2 className="sidebar-title">Group 4</h2>
        <ul className="team-list">
          <li>
            <span className="member-name">Jildany Petra Mikhael</span>
          </li>
          <li>
            <span className="member-name">Virginia Eva Maria</span>
          </li>
          <li>
            <span className="member-name">Sri Ayunda</span>
          </li>
          <li>
            <span className="member-name">Rivanda Elva</span>
          </li>
          <li>
            <span className="member-name">Timo Meres</span>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="gallery-container">
          <div className="gallery-header">
            <h1>My Gallery Nature</h1>
            <button onClick={addImage} className="add-button">
              ➕ Add New Image
            </button>
          </div>

          <div className="gallery-grid">
            {images.map((image) => (
              <div key={image.id} className="gallery-item">
                <img src={image.url} alt={`Nature ${image.id}`} />
                <button
                  onClick={() => deleteImage(image.id)}
                  className="delete-button"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
