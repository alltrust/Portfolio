import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const NullDataDisplay = () => {
  return (
    <Container>
      <Paper elevation={3}>
        <Typography>No featured Projects to Display</Typography>
      </Paper>
    </Container>
  );
};

export default NullDataDisplay;
