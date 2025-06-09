import React, { useState } from 'react';

const API_BASE = 'https://wardrobestudio.net'; // ✅ No trailing slash
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
    for (const key in form) {
      formData.append(key, form[key]);
    }

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
    <div>
      <h2>Upload Clothing Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Item Name" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <input name="color" value={form.color} onChange={handleChange} placeholder="Color" required />
        <input name="season" value={form.season} onChange={handleChange} placeholder="Season" required />
        <input name="style_tags" value={form.style_tags} onChange={handleChange} placeholder="Tags" required />
        <input type="file" name="image" onChange={handleChange} accept="image/*" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
