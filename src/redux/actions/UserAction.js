import { userConstants } from './constants';
import axios from '../../helper/axios';

export const login = (user) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/signin', {
        email: user.email,
        password: user.password,
      });

      if (res.status === 200) {
        const { id, firstName, lastName, imageURL, email } = res.data;
        console.log(res);
        dispatch({
          type: userConstants.SIGNIN,
          payload: { id, firstName, lastName, imageURL, email },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCampaign = (payload) => {
  return async (dispatch) => {
    try {
      // console.log('hey here is yash', payload);
      const res = axios.post('/postNewCampaign', { payload });
      console.log(res);
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllCampaigns = ({userId}) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/getAllCampaigns',{userId});
      if (res.status === 200) {
        // console.log(res);
        dispatch({
          type: userConstants.GETALLCAMPAIGNS,
          payload: res.data.message
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMyPostedCampaigns = ({userId}) => {
  return async (dispatch) => {
    try {
    const res = await axios.post("/getMyPostedCampaigns", {userId});
    // console.log(res);

    dispatch({
      type: userConstants.GETMYCAMPAIGNS,
      payload: res.data.message
    })
      
    } catch (error) {
      console.log(error);
    }
  }
}

export const getMyFundedCampaigns = ({userId}) => {
  return async (dispatch) => {
    try {
    const res = await axios.post("/getMyFundedCampaigns", {userId});
    // console.log(res);

    dispatch({
      type: userConstants.GETMYFUNDINGS,
      payload: res.data.message
    })
      
    } catch (error) {
      console.log(error);
    }
  }
}

export const getCampaignById = ({ cid }) => {
  return async (dispatch) => {
    try {
      console.log(cid);
      const res = await axios.post('/getCampaign', { campaignID: cid });
      console.log(res);

      if (res.status === 200) {
        const campaign = res.data.message;
        // console.log(campaign);
        dispatch({
          type: userConstants.GETCAMPAIGNBYID,
          payload: {
            campaign,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

 export const bidCampaign = ({userId, campaignId, fundingAmnt, equity}) => {
    return async (dispatch) => {
      try {
        console.log("yash",{userId, campaignId, fundingAmnt, equity});
        const res = await axios.post("/bidOnCampaign", {userId, campaignId, amountOffered: fundingAmnt, equityAsked: equity});
        console.log(res);
        
      } catch (error) {
        console.log(error);
      }
    }
 }

 export const addCampaignAddress = ({campaignId, campaignAddress}) => {
  return async (dispatch) => {
    try { 
      const res = await axios.post("/addCampaignAddress", {campaignId, campaignAddress});
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  }
}