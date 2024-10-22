import { useEffect, useState } from 'react';
import TopSideHeader from '../../components/TopSideHeader';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchTotalScopes, addScope, deleteScope } from '../../services/ScopesFunctions';
import { fetchCompanyData } from '../../services/CompanyFunctions';
import StacionaryCombustionUI from '../../components/Scope1/StacionaryCombustionUI';
import MobileCombustionUI from '../../components/Scope1/MobileCombustionUI';
import FugitiveCombustion from '../../components/Scope1/FugitiveCombustion';
import CustomToaster from '../../components/Toaster';
import { fetchAdvanceSearchData } from '../../services/ClimatiqFunctions';
import AdvanceCalculation from '../../components/AdvanceCalculation/AdvanceCalculation';
import { initialScope, initialRoutes } from '../../constants';
import { useAuthContext } from '../../hooks/AuthContext';
import { Activity, PossibleFilters, Result } from '../../types/ClimatiQ';
import { CompanyData, Scope1, Routes } from '../../types/Primary';
import { Search } from '../../components/AdvanceCalculation/ClimatiqCalculation/ClimatiQCalculation';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Scope1NewUI = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const { user, token } = useAuthContext();

  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [baseScope1, setBaseScope1] = useState<Scope1>(initialScope);
  const [finalScope1, setFinalScope1] = useState<Scope1 | null>(null);
  const [loadingResults, setLoadingResults] = useState(false);

  const [totalScopes, setTotalScopes] = useState<any | null>(null);
  const [routes, setRoutes] = useState<Routes[]>([initialRoutes]);
  const [selectedRoute, setSelectedRoute] = useState<Routes | null>(null);

  const [activity, setActivity] = useState<Activity | null>(null);
  const [posibleFilters, setPosibleFilters] = useState<PossibleFilters | null>(null);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleTabChange = (_event: any, newValue: number) => {
    handleClearAll();
    setActiveTab(newValue);
  };

  const handleBack = () => {
    navigate('/company');
  };

  const handleNext = () => {
    navigate('/scope2');
  };

  const handleClearAll = () => {
    setBaseScope1(initialScope);
    setRoutes([initialRoutes]);
    setSelectedRoute(null);
    setFinalScope1(null);
    setActivity(null);
    setSelectedResult(null);
    setPosibleFilters(null);
  };

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleDelete = async (scope: any) => {
    setLoadingResults(true);
    try {
      await deleteScope(token, 1, scope._id);
      await getTotalScopeData();
      showToast('success', 'The scope was deleted successfully');
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appeared: ' + error.message);
    } finally {
      setLoadingResults(false);
    }
  };

  const handleSubmit = async () => {
    if (finalScope1 !== null) {
      setLoadingResults(true);
      try {
        await addScope(token, 1, finalScope1);
        await getTotalScopeData();
        showToast('success', 'The scope was created successfully');
      } catch (error: any) {
        console.error(error);
        showToast('error', 'An error has appeared: ' + error.message);
      } finally {
        setFinalScope1(null);
        setLoadingResults(false);
      }
    }
  };

  const handleSubmitAdvance = async (scope: any) => {
    try {
      await addScope(token, 1, scope);
      await getTotalScopeData();
      showToast('success', 'The scope was created successfully');
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appeared: ' + error.message);
    }
  };

  const getTotalScopeData = async () => {
    try {
      const res = await fetchTotalScopes(token, 0);
      setTotalScopes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanyData = async () => {
    try {
      await fetchCompanyData(token, user, setCompanyData);
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error);
    }
  };

  const getParams = () => {
    if (activeTab === 0) {
      return 'sector=Energy';
    } else if (activeTab === 1) {
      return 'sector=Energy,Transport';
    } else {
      return 'sector=Refrigerants and Fugitive Gases';
    }
  };

  const fetchResultsAdvanceData = async (token: any, pageNumber: number = 1, search?: Search) => {
    const res = await fetchAdvanceSearchData(token, pageNumber, getParams(), search);
    return res;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');

    if (tab) {
      switch (tab) {
        case 'stationary_combustion':
          setActiveTab(0);
          handleClearAll();
          break;
        case 'mobile_combustion':
          setActiveTab(1);
          handleClearAll();
          break;
        case 'fugitive_combustion':
          setActiveTab(2);
          handleClearAll();
          break;
        default:
          setActiveTab(0);
          break;
      }
    }
  }, [location]);

  useEffect(() => {
    if (!companyData) {
      getCompanyData();
    }
    if (!totalScopes) {
      getTotalScopeData();
    }
  }, []);

  return (
    <div className="max-w-6xl pl-6">
      <TopSideHeader title={'Scope 1'}>
        <Box>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="settings tabs">
            <Tab label="Stationary Combustion" />
            <Tab label="Mobile Combustion" />
            <Tab label="Fugitive Combustion" />
          </Tabs>
        </Box>
        <AdvanceCalculation scopeNumber={1} fetchResults={fetchResultsAdvanceData} onSubmit={handleSubmitAdvance} />
      </TopSideHeader>
      <TabPanel value={activeTab} index={0}>
        <StacionaryCombustionUI
          baseScope1={baseScope1}
          setBaseScope1={setBaseScope1}
          companyData={companyData}
          finalScope1={finalScope1}
          setFinalScope1={setFinalScope1}
          totalScopes={totalScopes}
          setTotalScopes={setTotalScopes}
          showToast={showToast}
          loadingResults={loadingResults}
          handleNext={handleNext}
          handleClearAll={handleClearAll}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <MobileCombustionUI
          baseScope1={baseScope1}
          setBaseScope1={setBaseScope1}
          companyData={companyData}
          finalScope={finalScope1}
          setFinalScope1={setFinalScope1}
          routes={routes}
          setRoutes={setRoutes}
          showToast={showToast}
          setSelectedRoute={setSelectedRoute}
          selectedRoute={selectedRoute}
          totalScopes={totalScopes}
          setTotalScopes={setTotalScopes}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          handleClearAll={handleClearAll}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <FugitiveCombustion
          scope={baseScope1}
          setBaseScope1={setBaseScope1}
          finalScope1={finalScope1}
          setFinalScope1={setFinalScope1}
          companyData={companyData}
          showToast={showToast}
          activity={activity}
          setActivity={setActivity}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          posibleFilters={posibleFilters}
          setPosibleFilters={setPosibleFilters}
          totalScopes={totalScopes}
          setTotalScopes={setTotalScopes}
          loadingResults={loadingResults}
          handleDelete={handleDelete}
          handleClearAll={handleClearAll}
          handleSubmit={handleSubmit}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </TabPanel>
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Scope1NewUI;
