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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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
  const [fileURL, setFileURL] = useState("/assets/images/proof1.jpg");
  const data = useSelector((state) => state.UserReducer);
  const searchParams = new URLSearchParams(window.location.search);
  const cid = searchParams.get('campaignId');
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    milestoneDetails,
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

  const handleApprove = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      campaignAddress,
      crowdFundingABI,
      signer
    );
    await contract.voteForMilestone(1);
  }

  const handleEndVoting = async () => {
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
    dispatch(addCampaignAddress({ campaignId: _id, campaignAddress }));


    const to = await contract.createCampaign();

    const campaignAddress = to.to;
    console.log(campaignAddress);
    dispatch(addCampaignAddress({ campaignId: _id, campaignAddress }));

  }

  const handleFileUpload = () => {
    console.log("on clicking submit");
    handleClose();
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

                  {milestoneDetails
                    ? milestoneDetails.map((milestone, index) => (
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

                        <LoadingButton size="large" type="submit" variant="contained" style={{ "margin": 10 }} onClick={handleOpen}>
                          Upload Proof
                        </LoadingButton>

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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Upload proof for milestone
            </Typography>
            <CustomInput
              type="file"
              id="cimage"
              label="Upload Proof"
              // value={imageURL}
              onChange={(e) => {
                setFileURL(
                  'data:image/jpeg;base64,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'
                );
              }}
            />
            {/* <input name="milestoneProofUpload" style={{ "margin": 10 }} type="file" /> */}
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleFileUpload} style={{ "margin": 10 }}>
              Submit
            </LoadingButton>
          </Box>
        </Modal>
      </Container>
    </>
  );
}

export default CampaignDetails;
