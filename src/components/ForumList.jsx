import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import SkeletonCard from './SkeletonCard';
import './ForumList.css'; // Import the new CSS file

export default function ForumList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setTimeout(async () => {
        const { data, error } = await supabase.from('forum_categories').select('*');
        if (error) console.error('Error fetching categories:', error);
        else setCategories(data);
        setLoading(false);
      }, 1000);
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Forums</h2>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div>
      <h2>Forums</h2>
      <div style={{ listStyle: 'none', padding: 0 }}>
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <article className="category-card">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}