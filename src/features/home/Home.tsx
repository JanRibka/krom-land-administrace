import { Stack } from '@mui/system';

import AboutUs from './aboutUs/AboutUs';
import Seo from './seo/Seo';
import WhatPeopleSay from './whatPeopleSay/WhatPeopleSay';

const Home = () => {
  return (
    <Stack spacing={4}>
      <Seo />
      <AboutUs />
      <WhatPeopleSay />
    </Stack>
  );
};

export default Home;
