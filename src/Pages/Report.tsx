/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Button, Divider, Typography } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { toPng } from 'html-to-image';
import { CustomReportIcon } from '../assets/icons';
import PdfDocument from '../components/reports/Pdfdocument';
import { fetchTotalScopes } from '../services/ScopesFunctions';
import ReportTable from '../components/reports/table/ReportTable';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { Spin } from 'antd';
import CustomToaster from '../components/Toaster';
import { useAuthContext } from '../hooks/AuthContext';
import { Scope1, Scope2, Scope3 } from '../types/Primary';

function Report() {
  const { token } = useAuthContext();
  const [totalScopes, setTotalScopes] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const scope1Items = totalScopes?.filter((scopes: Scope1) => scopes.scope === 1);
  const scope2Items = totalScopes?.filter((scopes: Scope2) => scopes.scope === 2);
  const scope3Items = totalScopes?.filter((scopes: Scope3) => scopes.scope === 3);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const htmlBody = useRef<HTMLDivElement>(null);

  const LoadImage = async () => {
    try {
      if (htmlBody.current) {
        const dataUrl = await toPng(htmlBody.current, { cacheBust: true, backgroundColor: 'white' });
        setImageUrl(dataUrl);
      } else {
        showToast('error', 'An error has appear: Ref htmlBody.current is null');
      }
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appear: ' + error.response?.data?.message);
    }
  };

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const GetTotalScopes = async () => {
    try {
      const res = await fetchTotalScopes(token, 0);
      setTotalScopes(res.data);
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear: ' + error.response?.data?.message);
    }
  };

  const Preload = () => {
    GetTotalScopes();
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    !totalScopes && Preload();
  }, []);

  useEffect(() => {
    !loading && LoadImage();
  }, [loading]);

  return (
    <div className="max-w-6xl pl-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row items-center gap-2">
            <CustomReportIcon />
            <Typography className="text-3xl font-normal">GHG Report</Typography>
          </div>
          <div className="flex flex-row gap-4">
            {imageUrl && (
              <PDFDownloadLink document={<PdfDocument image={imageUrl} />} fileName="Report.pdf">
                {({}) => (
                  <Button variant="contained" startIcon={<DownloadingIcon />} className="normal-case px-6 py-3">
                    Print PDF
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </div>
        </div>
        <Typography variant="body1" className="text-gray-400">
          In this section you can download the CO2 emission report
        </Typography>
      </div>
      <Divider className="mt-8 mb-9" />

      {loading ? (
        <div className="w-full flex justify-center items-center h-full">
          <Spin />
        </div>
      ) : (
        <div ref={htmlBody}>
          <div className="flex items-center mb-6">
            <Typography className="text-xl font-medium justify-center">GHG emission data</Typography>
          </div>
          <div>
            <ReportTable scope1Items={scope1Items} scope2Items={scope2Items} scope3Items={scope3Items} />
          </div>
        </div>
      )}
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
}

export default Report;
