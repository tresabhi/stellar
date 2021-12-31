import { Link } from 'react-router-dom';

const Mobile = () => (
  <div style={{ color: 'white' }}>
    <span>Mobile coming soon!</span>
    <span>
      <Link to="/desktop">
        <button style={{ color: 'white' }}>Desktop version</button>
      </Link>
    </span>
  </div>
);

export default Mobile;
