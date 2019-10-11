import { NextPage } from 'next';
import GameClient from '../components/game-client';
import Layout from '../components/layout';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <Layout>
        <GameClient/>
        <h1>Hello world! - user agent: {userAgent}</h1>
    </Layout>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Home;
