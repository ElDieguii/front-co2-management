import { Box, Button, CircularProgress, Typography } from '@mui/material';

const LoadingOrContent = ({ loading, children }: any) => (
  <Box className="flex justify-center items-center mt-2">{loading ? <CircularProgress size={24} /> : children}</Box>
);

function ResultItem({ scope, handleSubmit, loading }: any) {
  return (
    <Box className="flex flex-row justify-between mt-5 p-5">
      <Box className="flex flex-row gap-32 mt-2 w-3/4">
        <Box>
          <Typography>Amount/Unit</Typography>
          <LoadingOrContent loading={loading}>
            <div className="flex flex-row gap-2">
              <Typography variant="h6">{scope?.amount ?? 0}</Typography>
              <Typography variant="h6">{scope?.unit_type ?? 'kg'}</Typography>
            </div>
          </LoadingOrContent>
        </Box>
        <Box>
          <Typography>CO2e per unit</Typography>
          <LoadingOrContent loading={loading}>
            <Typography variant="h6">{scope ? scope.co2e.toFixed(2) : '0'} kg</Typography>
          </LoadingOrContent>
        </Box>
        <Box>
          <Typography className="text-blue-400">Total CO2 Factor</Typography>
          <LoadingOrContent loading={loading}>
            <Typography variant="h6" className="text-blue-400 font-bold">
              {scope ? scope.total.toFixed(2) : '0'} kg
            </Typography>
          </LoadingOrContent>
        </Box>
      </Box>
      <Box className="flex flex-row mt-2 w-1/4 gap-2">
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={!scope ? true : false}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default ResultItem;
