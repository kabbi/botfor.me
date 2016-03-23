import { Link } from 'react-router';

export const AboutView = () => (
  <div className="container text-center">
    <h1>This is the about view!</h1>
    <hr />
    <Link to="/">Back To Home View</Link>
  </div>
);

export default AboutView;
