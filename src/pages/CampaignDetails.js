import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { addCampaignAddress, bidCampaign, getCampaignById } from '../redux/actions';
import CustomInput from '../components/customInput/CustomInput';
import { crowdFundingABI, auctionABI } from './exportAbi';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CampaignDetails() {
  const [expanded, setExpanded] = React.useState(false);
  const [fundingAmnt, setfundingAmnt] = useState(0);
  const [equity, setequity] = useState(0);
  const data = useSelector((state) => state.UserReducer);
  const searchParams = new URLSearchParams(window.location.search);
  const cid = searchParams.get('campaignId');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaignById({ cid, userId: "642364f2da1ea43d5cd5bfab" }));
  }, []);

  const {
    _id,
    title,
    description,
    imageURL,
    amountToRaise,
    deadlineToBid,
    deadlineOfProject,
    minAmountToFund,
    maxEquityToDilute,
    dateCreated,
    milestones,
    userDetails,
    contractAddress,
    campaignAddress,
  } = data.campaignById;

  const myproject = userDetails ? data.user.id === userDetails._id : false;

  console.log(myproject);  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFund = async () => {
    const userId = data.user.id;
    const campaignId = data.campaignById._id;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, auctionABI, signer);

    console.log(ethers.utils.parseEther(fundingAmnt), equity);

    await contract.saveBid(equity, { value: ethers.utils.parseEther(fundingAmnt) });
    dispatch(bidCampaign({ userId, campaignId, fundingAmnt, equity }));
  };

  const handleApprove = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      campaignAddress,
      crowdFundingABI,
      signer
    );
    await contract.voteForMilestone(1); 
  }

  const handleEndVoting = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      campaignAddress,
      crowdFundingABI,
      signer
    );
    await contract.endVotingSession(); 
  }

  const handleEndAuction = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      auctionABI,
      signer
    );
    await contract.runAuction(); 
    console.log(campaignAddress);
    dispatch(addCampaignAddress({campaignId:_id, campaignAddress}));

    
    const to = await contract.createCampaign();

    const campaignAddress = to.to; 
    console.log(campaignAddress);
    dispatch(addCampaignAddress({campaignId:_id, campaignAddress}));

  }


  return (
    <>
      <Helmet>
        <title>Campaign Details</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Campaign Details
        </Typography>

        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
          <Grid item md={12}>
            <Card sx={{ maxWidth: 800 }}>
              <CardHeader
                avatar={<Avatar src={userDetails ? userDetails.imageURL : ''} aria-label="recipe" />}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={title}
                subheader={`${userDetails ? userDetails.firstName : ' '} ${userDetails ? userDetails.lastName : ' '}`}
                sx={{ mb: '1rem', fontWeight: 'lighter' }}
              />
              <CardMedia component="img" height="300" image={imageURL} alt="Paella dish" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph variant="body2">
                    Amount to be rasied : Rs {amountToRaise}
                  </Typography>
                  <Typography paragraph variant="body2">
                    Max equity to dilute : {maxEquityToDilute}%
                  </Typography>
                  <Typography paragraph variant="body2">
                    Min amount to fund : Rs {minAmountToFund}
                  </Typography>
                  <Typography paragraph variant="body2">
                    Expected date of project completion : 12 Dec 2024
                  </Typography>
                  <Typography paragraph variant="body2" mb={4}>
                    Deadline to bid : 20 March 2024
                  </Typography>

                  {milestones
                    ? milestones.map((milestone, index) => (
                        <>
                          <hr />
                          <Typography paragraph variant="subtitle1" mt={3}>
                            Milestone {index + 1}
                          </Typography>
                          <Typography paragraph variant="body2">
                            Title : {milestone.title}
                          </Typography>

                          <Typography paragraph variant="body2">
                            Description : {milestone.description}
                          </Typography>

                          <Typography paragraph variant="body2">
                            Funds Required : {milestone.fundsRequired}
                          </Typography>

                          <Typography mb={3} variant="body2">
                            Deadline : {milestone.deadlineToComplete}
                          </Typography>

                          {myproject ? null : (
                            <LoadingButton size="large" type="submit" variant="contained" onClick={handleApprove}>
                              Approve
                            </LoadingButton>
                          )}
                        </>
                      ))
                    : null}

                  {myproject ? (
                    campaignAddress ? (
                      <LoadingButton size="large" type="submit" variant="contained" onClick={handleEndVoting}>
                        End Voting
                      </LoadingButton>
                    ) : (
                      <>
                        <LoadingButton size="large" type="submit" variant="contained" onClick={handleEndAuction}>
                          End Auction
                        </LoadingButton>
                      </>
                    )
                  ) : (
                    <Grid container spacing={4} sx={{ mt: '2rem' }}>
                      <Grid item md={4}>
                        <CustomInput
                          type="number"
                          label="Enter amount"
                          value={fundingAmnt}
                          onChange={(e) => setfundingAmnt(e.target.value)}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <CustomInput
                          type="number"
                          label="Equity ask"
                          value={equity}
                          onChange={(e) => setequity(e.target.value)}
                        />
                      </Grid>

                      <Grid item md={4}>
                        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleFund}>
                          Fund
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CampaignDetails;
