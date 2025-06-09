import React, { useState } from 'react';

const API_BASE = 'https://wardrobestudio.net'; // ✅ No trailing slash

function Upload() {
  const [form, setForm] = useState({
    name: '',
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
    formData.append('name', form.name);
    formData.append('image', form.image);

    try {
      const res = await fetch(`${API_BASE}/wardrobe/upload`, {
        method: 'POST',
        body: formData
      });

      const resText = await res.text();

      if (res.ok) {
        alert('Upload successful!');
        setForm({ name: '', image: null });
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
    <div>
      <h2>Upload Clothing Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Type of clothing (e.g., T-shirt)"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
