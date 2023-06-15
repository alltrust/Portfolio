import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const linkList = [
  {
    name: 'gitHub',
    link: 'https://github.com/alltrust',
    icon: <GitHubIcon />,
  },
  {
    name: 'linkedIn',
    link: 'https://linkedin.com/in/aldo-rene-garcia/',
    icon: <LinkedInIcon />,
  },
];

interface IPersonalLinks {
  direction?: 'column' | 'row';
}

const PersonalLinks = ({ direction = 'row' }: IPersonalLinks) => {


  return (
    <Box sx={{display: 'flex', flexDirection: direction}}>
      {linkList.map((link, idx) => {
        return (
          <Box key={idx}>
            <a href={link.link} target="blank" rel="noopener noreferrer">
              {link.icon}
            </a>
          </Box>
        );
      })}
    </Box>
  );
};

export default PersonalLinks;
