import { Link } from 'react-router-dom';

export default function WhatIsAnxiety() {
  const sectionStyle = { marginBottom: '1.5rem' };
  return (
    <div>
      <Link to="/library">&larr; Back to Library</Link>
      <article>
        <h1>Understanding Anxiety</h1>
        <p><em>This article is for informational purposes only and is not a substitute for professional medical advice.</em></p>

        <div style={sectionStyle}>
          <h2>What is Anxiety?</h2>
          <p>Anxiety is a natural human response to stress. It's a feeling of fear or apprehension about what's to come. The first day of school, going to a job interview, or giving a speech may cause most people to feel fearful and nervous. But if your feelings of anxiety are extreme, last for longer than six months, and are interfering with your life, you may have an anxiety disorder.</p>
        </div>

        <div style={sectionStyle}>
          <h2>Common Symptoms</h2>
          <p>Common anxiety signs and symptoms include:</p>
          <ul>
            <li>Feeling nervous, restless or tense</li>
            <li>Having a sense of impending danger, panic or doom</li>
            <li>Having an increased heart rate</li>
            <li>Breathing rapidly (hyperventilation)</li>
            <li>Sweating or trembling</li>
          </ul>
        </div>
        
        <div style={sectionStyle}>
          <h2>When to Seek Help</h2>
          <p>It's important to seek help if you feel like you are worrying too much and it's interfering with your work, relationships or other parts of your life. Talking to a peer can help, but consulting with a mental health professional is a crucial step towards diagnosis and treatment.</p>
        </div>
      </article>
    </div>
  );
}