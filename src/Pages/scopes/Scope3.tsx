/* eslint-disable react-hooks/exhaustive-deps */
import { useState, SyntheticEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Divider, Tab, Tabs } from '@mui/material';
import TopSideHeader from '../../components/TopSideHeader';
import { addScope, deleteScope, fetchTotalScopes } from '../../services/ScopesFunctions';
import { fetchAdvanceSearchData } from '../../services/ClimatiqFunctions';
import FinalResults from '../../components/FinalResults';
import CustomToaster from '../../components/Toaster';
import { Options, Scope3Components } from '../../components/Scope3/Scope3Options';
import { fetchCompanyData } from '../../services/CompanyFunctions';
import Records from '../../components/Records';
import AdvanceCalculation from '../../components/AdvanceCalculation/AdvanceCalculation';
import { initialScope } from '../../constants';
import { useAuthContext } from '../../hooks/AuthContext';
import { Scope3 } from '../../types/Primary';
import { Search } from '../../components/AdvanceCalculation/ClimatiqCalculation/ClimatiQCalculation';

const Scope3NewUI = () => {
  const { token, user } = useAuthContext();

  const [scope, setScope] = useState<any | null>(initialScope);
  const [companyData, setCompanyData] = useState<any | null>(null);

  const [finalScope, setFinalScope] = useState<any | null>(null);
  const [totalScopes, setTotalScopes] = useState<any | null>(null);

  const [loading] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
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

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    handleClearAll();
    setActiveTab(newValue);
  };

  const handleInputChange = (path: string, value: any) => {
    setScope((prevState: Scope3) => {
      const keys = path.split('.');
      const newState = { ...prevState };
      let currentLevel: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!currentLevel[keys[i]]) {
          currentLevel[keys[i]] = {};
        }
        currentLevel = currentLevel[keys[i]];
      }
      currentLevel[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleSubmit = async () => {
    if (finalScope !== null) {
      setLoadingResults(true);
      try {
        await addScope(token, 3, finalScope);
        await getTotalScopeData();
        showToast('success', 'The scope was created successfully');
      } catch (error: any) {
        console.error(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setLoadingResults(false);
        handleClearAll();
      }
    }
  };

  const handleDelete = async (scope: any) => {
    if (totalScopes) {
      setLoadingResults(true);
      try {
        await deleteScope(token, 3, scope._id);
        await getTotalScopeData();
        showToast('success', 'The scope was deleted successfully');
      } catch (error: any) {
        console.error(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setLoadingResults(false);
      }
    }
  };

  const fetchResultsAdvanceData = async (token: any, pageNumber: number = 1, search?: Search) => {
    const res = await fetchAdvanceSearchData(token, pageNumber, `sector=${Options[activeTab].sector}`, search);
    return res;
  };

  const handleSubmitAdvance = async (scope: any) => {
    if (scope !== null) {
      try {
        await addScope(token, 3, scope);
        await getTotalScopeData();
        showToast('success', 'The scope was created successfully');
      } catch (error: any) {
        console.error(error);
        showToast('error', 'An error has appear' + error);
      }
    }
  };

  const handleClearAll = () => {
    setScope(initialScope);
    setFinalScope(null);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');

    console.log(tab);
    if (tab) {
      const index = Options.findIndex((option) => option.link === tab);
      if (index !== -1) {
        setActiveTab(index);
        handleClearAll();
      } else {
        setActiveTab(0);
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
      <TopSideHeader title="Scope 3">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable_auto_tabs"
          className="w-3/5"
        >
          {Options.map((option, index) => (
            <Tab key={index} label={option.label} />
          ))}
        </Tabs>
        <AdvanceCalculation scopeNumber={3} fetchResults={fetchResultsAdvanceData} onSubmit={handleSubmitAdvance} />
      </TopSideHeader>
      <Divider />
      <div className="mt-10">
        <TopSideHeader title={Options[activeTab].label} description={Options[activeTab].description} />
      </div>
      <div className="mt-10">
        <Scope3Components
          activeTab={activeTab}
          scope={scope}
          setScope={setScope}
          company={companyData}
          handleInputChange={handleInputChange}
          setFinalScope={setFinalScope}
          showToast={showToast}
        />
      </div>
      <FinalResults
        finalScope={finalScope}
        handleSubmit={handleSubmit}
        loading={loading}
        stationary={`3.${Options[activeTab].id} ${Options[activeTab].label}`}
      />
      <Records
        totalScopes={totalScopes}
        setTotalScopes={setTotalScopes}
        handleDelete={handleDelete}
        showToast={showToast}
        loadingResults={loadingResults}
        index={2}
      />
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Scope3NewUI;
