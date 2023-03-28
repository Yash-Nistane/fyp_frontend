import { LoadingButton } from '@mui/lab';
import { Grid, Button, Container, Stack, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { createCampaign } from '../redux/actions';
import CustomInput from '../components/customInput/CustomInput';
import Iconify from '../components/iconify';

function CreateCampaign() {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [amountToRaise, setamountToRaise] = useState('');
  const [deadlineToBid, setdeadlineToBid] = useState('');
  const [deadlineOfProject, setdeadlineOfProject] = useState('');
  const [minAmountToRelease, setminAmountToRelease] = useState(0);
  const [minAmountToFund, setminAmountToFund] = useState(0);
  const [maxEquityToDilute, setmaxEquityToDilute] = useState(0);
  const [numofmilestone, setnumofmilestone] = useState(0);
  const [imageURL, setimageURL] = useState("/assets/images/covers/cover_6.jpg");
  const [projectBuildersRequired, setprojectBuildersRequired] = useState(false);
  const [milestones, setmilestones] = useState([]);

  const data = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const milestoneList = [];

    for (let i = 0; i < numofmilestone; i += 1) {
      const obj = {
        title: '',
        description: '',
        // milestoneNumber : 0,
        // campaignId,
        fundsRequired: 0,
        deadlineToComplete: '',
      };
      milestoneList.push(obj);
    }
    setmilestones(milestoneList);
  }, [numofmilestone]);

  const handleMilestonechange = ({ e, index, x }) => {
    let milestoneList = [];
    milestoneList = [...milestones];

    if (x === 'title') {
      milestoneList[index].title = e.target.value;
      setmilestones([...milestoneList]);
    }

    if (x === 'description') {
      milestoneList[index].description = e.target.value;
      setmilestones([...milestoneList]);
    }

    if (x === 'fundsRequired') {
      milestoneList[index].fundsRequired = e.target.value;
      setmilestones([...milestoneList]);
    }

    if (x === 'deadlineToComplete') {
      milestoneList[index].deadlineToComplete = e.target.value;
      setmilestones([...milestoneList]);
    }
  
  };

  const handleSubmit = () => {
    const payload = {
      userId:data.user.id,
      title,
      description,
      imageURL,
      amountToRaise,
      deadlineToBid,
      deadlineOfProject,
      projectBuildersRequired,      
      minAmountToRelease,
      minAmountToFund,
      maxEquityToDilute,
      milestones,
    };

    dispatch(createCampaign(payload));
    console.log("payload ", payload);    
  };

  return (
    <>
      <Helmet>
        <title>Create Campaign</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add new campaign
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button> */}
        </Stack>

        <Grid container spacing={4} sx={{ mb: '2rem' }}>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="text"
              id="ctitle"
              label="Title"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="text"
              id="cDescription"
              label="Description"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mb: '2rem' }}>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="number"
              id="camount"
              label="Amount to raise"
              value={amountToRaise}
              onChange={(e) => {
                setamountToRaise(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="datetime-local"
              id="cdeadlinebid"
              label="Deadline to bid"
              value={deadlineToBid}
              onChange={(e) => {
                setdeadlineToBid(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mb: '2rem' }}>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="number"
              id="cInitialamnt"
              label="Intital amount"
              value={minAmountToRelease}
              onChange={(e) => {
                setminAmountToRelease(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="datetime-local"
              id="cdeadlineproject"
              label="Deadline of project"
              value={deadlineOfProject}
              onChange={(e) => {
                setdeadlineOfProject(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mb: '2rem' }}>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="number"
              id="cminamntfund"
              label="Min amount to be funded"
              value={minAmountToFund}
              onChange={(e) => {
                setminAmountToFund(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="number"
              id="cmaxeuquitydilue"
              label="Max equity dilution"
              value={maxEquityToDilute}
              onChange={(e) => {
                setmaxEquityToDilute(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mb: '2rem' }}>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="number"
              id="cnumberofmilestone"
              label="No of milestone"
              value={numofmilestone}
              onChange={(e) => {
                setnumofmilestone(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <CustomInput
              type="file"
              id="cimage"
              label="Upload Image"
              // value={imageURL}
              onChange={(e) => {
                setimageURL(
                  'https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png'
                );
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mb: '2rem' }}>
          <Grid item xs={6} md={4}>
            <input
              type="checkbox"
              className="developercheck"
              onChange={() => {
                setprojectBuildersRequired(!projectBuildersRequired);
              }}
            />
            Need a developer
          </Grid>
        </Grid>

        {milestones.map((milestone, index) => (
          <div key={index}>
            <h4>Milestone {index + 1}</h4>
            <Grid container spacing={4} sx={{ mb: '2rem' }}>
              <Grid item xs={6} md={3}>
                <CustomInput
                  type="text"
                  id="ctitle"
                  label="Title"
                  value={milestones[index] !== undefined ? milestones[index].title : ''}
                  onChange={(e) => handleMilestonechange({ e, index, x: 'title' })}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomInput
                  type="text"
                  id="description"
                  label="Description"
                  value={milestones[index] !== undefined ? milestones[index].description : ''}
                  onChange={(e) => handleMilestonechange({ e, index, x: 'description' })}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <CustomInput
                  type="text"
                  id="fundsrequired"
                  label="Funds Required"
                  value={milestones[index] !== undefined ? milestones[index].fundsRequired : ''}
                  onChange={(e) => handleMilestonechange({ e, index, x: 'fundsRequired' })}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <CustomInput
                  type="datetime-local"
                  id="fdeadline"
                  label="Deadline to complete"
                  value={milestones[index] !== undefined ? milestones[index].deadlineToComplete : ''}
                  onChange={(e) => handleMilestonechange({ e, index, x: 'deadlineToComplete' })}
                />
              </Grid>
            </Grid>
          </div>
        ))}

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CreateCampaign;
