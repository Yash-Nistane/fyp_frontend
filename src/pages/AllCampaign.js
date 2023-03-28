import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

import { getAllCampaigns } from '../redux/actions';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function AllCampaign() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.UserReducer);

  const allCampaigns = data.allCampaigns;
  
  useEffect(() => {    
    dispatch(getAllCampaigns({userId: data.user.id}));
    const date1 = new Date("2023-03-30T20:12:00.000+00:00");
    const date2 = new Date("2023-03-30T20:13:00.000+00:00");

    if(date2 > date1){
      console.log("true");
    }
    else{
      console.log("false");
    }
    console.log(date1);
  },[]);

  const handleClick = () => {

    console.log("handleClick");
    navigate('/dashboard/createcampaign',{ replace: true });
  }

  return (
    <>
      <Helmet>
        <title> All Campaigns </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Campaings
          </Typography>
          <LoadingButton variant="contained" type="submit" startIcon={<Iconify icon="eva:plus-fill"/>} onClick={handleClick}>
            New campaign
          </LoadingButton>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {allCampaigns.map((campaign, index) => (
            <BlogPostCard key={index} campaign={campaign} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
