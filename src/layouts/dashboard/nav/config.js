// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
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
    path: '/logout',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
