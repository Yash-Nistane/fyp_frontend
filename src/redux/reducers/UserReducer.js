import { userConstants } from '../actions/constants';

const initialState = {
  user: {
    id: "", 
    firstName: "", 
    lastName: "", 
    imageURL: "", 
    email: ""
  },
  allCampaigns: [],
  campaignById: {},
  myCampaigns: [],
  myFundings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SIGNIN:
      state = {
        ...state,
        user: action.payload
      };
      break;

    case userConstants.GETALLCAMPAIGNS:
      state = {
        ...state,
        allCampaigns: action.payload
      };
      break;
    
      case userConstants.GETCAMPAIGNBYID:
      state={
        ...state,
        campaignById : action.payload.campaign
      }
      break;

      case userConstants.GETMYCAMPAIGNS:
        state={
          ...state,
          myCampaigns: action.payload
        }
        break;

      case userConstants.GETMYFUNDINGS:
        state={
          ...state,
          myFundings: action.payload
        }
        break;

    default:
  }

  return state;
};
