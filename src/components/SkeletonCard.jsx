import './SkeletonCard.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line" style={{ height: '28px', width: '40%' }}></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-line"></div>
    </div>
  );
}