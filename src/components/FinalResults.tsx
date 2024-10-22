import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResultItem from './ResultItem';

interface Props {
  finalScope: any;
  handleSubmit: () => void;
  loading: boolean;
  stationary: string;
  type?: string;
}
const FinalResults: FC<Props> = ({ finalScope, handleSubmit, loading, stationary, type }) => {
  return (
    <div className="mt-12">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h6" className="font-bold">
            Results
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="subtitle1">
              {stationary} {type ? `- ${type}` : ''}
            </Typography>
            <ResultItem scope={finalScope} handleSubmit={handleSubmit} loading={loading} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FinalResults;
