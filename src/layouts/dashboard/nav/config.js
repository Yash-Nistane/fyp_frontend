// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'My Campaigns',
    path: '/dashboard/mycampaigns',
    icon: icon('ic_blog'),
  },
  {
    title: 'My Fundings',
    path: '/dashboard/myfundings',
    icon: icon('ic_blog'),
  },
  {
    title: 'All Campaigns',
    path: '/dashboard/allcampaigns',
    icon: icon('ic_blog'),
  },
  {
    title: 'Add Campaign',
    path: '/dashboard/createcampaign',
    icon: icon('ic_blog'),
  },
  {
    title: 'logout',
    path: '/login',
    icon: icon('ic_lock'),
  }
];

export default navConfig;
