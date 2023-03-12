import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <Link to="/example">GO to Example page</Link>
    </>
  );
}

export default Home;
