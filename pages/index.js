import { Typography } from '@mui/material';
import * as React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Index = ({ data }) => {
  return (
    <>
      <Navbar />
      <div>
        {data.map((user, i) => {
          return (
            <Typography
              key={i}
              sx={{ margin: 1 }}
            >{`Name=${user.name}  Email=${user.email}`}</Typography>
          );
        })}
      </div>
      <Footer title='DAT 2.0' description='@irfanalamt' />
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/users`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Index;
