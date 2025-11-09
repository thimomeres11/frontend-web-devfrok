import { useEffect, useState } from "react";

type Image = {
  id: number;
  author: string;
  url: string;
};

const ImageGallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        // Fetch only 6 specific images that are nature-themed
        const imageIds = [10, 11, 12, 13, 14, 15]; // These IDs have nice nature photos
        const imagesData = await Promise.all(
          imageIds.map(async (id) => {
            const response = await fetch(`https://picsum.photos/id/${id}/info`);
            if (!response.ok) throw new Error("Failed to fetch image info");
            const data = await response.json();
            return {
              id: data.id,
              author: data.author,
              url: `https://picsum.photos/id/${id}/400/300`,
            };
          })
        );
        setImages(imagesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleAddImage = async () => {
    try {
      // Get a random image ID between 1 and 1000
      const randomId = Math.floor(Math.random() * 1000) + 1;
      const response = await fetch(`https://picsum.photos/id/${randomId}/info`);
      if (!response.ok) throw new Error("Failed to fetch image info");
      const data = await response.json();

      const newImage = {
        id: data.id,
        author: data.author,
        url: `https://picsum.photos/id/${randomId}/400/300`,
      };

      setImages([...images, newImage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add image");
    }
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((img) => img.id !== id));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Loading Images...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ borderColor: "#dc3545" }}>
          <h2 style={{ color: "#dc3545" }}>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">My Gallery Nature</h1>
        <button className="add-button" onClick={handleAddImage}>
          <span>➕ Add Random Image</span>
        </button>
      </div>

      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.url} alt={`Photo by ${image.author}`} />
            <div className="image-overlay">
              <p className="image-author">By: {image.author}</p>
              <button
                className="button button-danger"
                onClick={() => handleDeleteImage(image.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
