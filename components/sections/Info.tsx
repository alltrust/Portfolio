import SectionTemplate from '../layout/SectionTemplate';
import Typography from '@mui/material/Typography';

const InfoSection = () => {
  const infoHeading = 'About this Portfolio';

  //
  return (
    <SectionTemplate heading={infoHeading}>
      <Typography>..some context</Typography>
    </SectionTemplate>
  );
};

export default InfoSection;
