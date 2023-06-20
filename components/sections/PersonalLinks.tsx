import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SvgIcon from '../ui/svg-icon';
import { useTheme } from '@mui/material/styles';

const linkList = [
  {
    name: 'gitHub',
    link: 'https://github.com/alltrust',
    icon: <GitHubIcon style={{ width: '50px', height: '50px' }} />,
  },
  {
    name: 'linkedIn',
    link: 'https://linkedin.com/in/aldo-rene-garcia/',
    icon: <LinkedInIcon style={{ width: '50px', height: '50px' }} />,
  },
  {
    name: 'stackOverflow',
    link: 'https://stackoverflow.com/users/18693692/alltrust',
    icon: <SvgIcon svgLink={'/svg/stackoverflow-svgrepo-com.svg'} />,
    iconForDark: <SvgIcon svgLink={'/svg/stackoverflow-svgrepo-white.svg'} />,
  },
  {
    name: 'codepen',
    link: 'https://codepen.io/alldo29',
    icon: <SvgIcon svgLink={'/svg/codepen-svgrepo-com.svg'} />,
    iconForDark: <SvgIcon svgLink={'/svg/codepen-svgrepo-white.svg'} />,
  },
];

interface IPersonalLinks {
  direction?: 'column' | 'row';
}

const PersonalLinks = ({ direction = 'row' }: IPersonalLinks) => {
  const theme = useTheme();

  
  
  return (
    <Box sx={{ display: 'flex', flexDirection: direction, marginTop: '1rem', marginBottom: '1rem', justifyContent: 'space-evenly' }}>
      {linkList.map((links, idx) => {
        const {link, icon, iconForDark} = links
        return (
          <Box key={idx}>
            <a href={link} target="blank" rel="noopener noreferrer">
              {theme.palette.mode === 'dark' &&  iconForDark ? iconForDark : icon}
            </a>
          </Box>
        );
      })}
    </Box>
  );
};

export default PersonalLinks;
