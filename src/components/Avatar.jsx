import { generateColor } from '../utils';

export default function Avatar({ username }) {
  const initial = username ? username.charAt(0).toUpperCase() : '?';
  const color = generateColor(username || '');

  const avatarStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: color,
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginRight: '10px'
  };

  return (
    <div style={avatarStyle}>
      {initial}
    </div>
  );
}