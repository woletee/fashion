import React, { useState } from 'react';

const API_BASE = 'https://wardrobestudio.net';

function Upload() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    color: '',
    season: '',
    style_tags: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  const fallbackForm = {
    ...form,
    name: form.name || 't-shirt',
    category: form.category || 'top',
    color: form.color || 'black',
    season: form.season || 'summer',
    style_tags: form.style_tags || 'causal',
  };

  for (const key in fallbackForm) {
    formData.append(key, fallbackForm[key]);
  }

  // Continue with fetch...
};


    try {
      const res = await fetch(`${API_BASE}/wardrobe/upload`, {
        method: 'POST',
        body: formData
      });

      const resText = await res.text();

      if (res.ok) {
        alert('Upload successful!');
        setForm({
          name: '',
          category: '',
          color: '',
          season: '',
          style_tags: '',
          image: null
        });
      } else {
        console.error('Upload failed:', resText);
        alert('Upload failed: ' + res.status);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading');
    }
  };

  return (
    <div className="screen">
      <h2>Upload Clothing Item</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Item Name"
            required
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g., Tops)"
            required
          />
          <input
            type="text"
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Color"
            required
          />
          <input
            type="text"
            name="season"
            value={form.season}
            onChange={handleChange}
            placeholder="Season (e.g., Summer)"
            required
          />
          <input
            type="text"
            name="style_tags"
            value={form.style_tags}
            onChange={handleChange}
            placeholder="Tags (e.g., Casual, Denim)"
            required
          />
          <label htmlFor="imageUpload" className="upload-btn">
  📷 Choose or Take a Photo
</label>
<input
  type="file"
  id="imageUpload"
  name="image"
  accept="image/*"
  onChange={handleChange}
  required
  style={{ display: 'none' }}
/>

            {/*  */}
  {form.image && (
    <img
      src={URL.createObjectURL(form.image)}
      alt="Preview"
      style={{ width: '100%', marginTop: '1rem', borderRadius: '10px' }}
    />
  )}

        </div>
        <button type="submit" className="upload-btn">Upload Item</button>
      </form>
    </div>
  );
}

export default Upload;
