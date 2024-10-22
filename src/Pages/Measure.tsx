/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import LeftSection from '../components/Measure/LeftSection';
import {
  addMeasuresData,
  deleteMeasuresData,
  fetchMeasuresData,
  updateMeasuresData,
} from '../services/MeasureFuncitons';
import MeasureForm from '../components/Measure/MeasureForm';
import MeasureItems from '../components/Measure/MeasureItems';
import { CustomMeasuresIcon } from '../assets/icons';
import { fetchTotalScopes } from '../services/ScopesFunctions';
import StackedAreaChart from '../components/Measure/graphs/TestGraph';
import { useAuthContext } from '../hooks/AuthContext';
import { Scopes, Scope1, Scope2, Scope3 } from '../types/Primary';

const Measure = () => {
  const { token } = useAuthContext();
  const [totalScopes, setTotalScopes] = useState<Scopes | null>(null);
  const [measures, setMeasures] = useState<any | null>(null);

  // const items = useSelector((state: any) => state.measureItems.value.filter((item: any) => !item.isManual));
  const scope1Items = totalScopes?.filter((scopes: Scope1) => scopes?.scope === 1);
  const scope2Items = totalScopes?.filter((scopes: Scope2) => scopes?.scope === 2);
  const scope3Items = totalScopes?.filter((scopes: Scope3) => scopes?.scope === 3);

  const [item, setItem] = useState({
    companyId: 0,
    facility: '',
    type: '',
    oldEmit: '',
    conversion: 0,
    period_start: '',
    period_end: '',
    status: 0,
  });

  const [data] = useState<{
    measure: any;
    oldEmitList: any;
  }>({
    measure: null,
    oldEmitList: [],
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  // useEffect(() => {
  //   let measure = Measures.filter((it: any) => it.name === item.type)[0] ?? null;
  //   if (measure == null) return;

  //   let newData = { ...data };

  //   newData.measure = measure;
  //   newData.oldEmitList = measure.linkTypes;

  //   setData(newData);
  //   if (newData.oldEmitList.length === 1 && item.oldEmit !== newData.oldEmitList[0]) {
  //     setItem({
  //       ...item,
  //       oldEmit: newData.oldEmitList[0],
  //     });
  //   }
  // }, [item]);

  const handleClearAll = () => {
    setItem({
      ...item,
      type: '',
      conversion: 0,
      oldEmit: '',
      period_start: '',
      period_end: '',
      status: 0,
    });
  };

  const handleNew = (_e: any) => {
    handleClearAll();
    setEditIndex(-1);
    setIsEdit(true);
  };

  const handleSelect = (index: any) => {
    setEditIndex(index);
    setItem({
      ...item,
      ...measures[index],
      period_start: formatDate(measures[index].period_start),
      period_end: formatDate(measures[index].period_end),
    });
    setIsEdit(true);
  };

  const handleClickCancel = (_e: any) => {
    setIsEdit(false);
  };

  const handleInputChange = (name: string, value: any) => {
    setItem({ ...item, [name]: value });
  };

  const handleSave = (e: any) => {
    e.preventDefault();

    if (editIndex < 0) {
      addMeasuresData(token, {
        ...item,
        // color: colors[items.length % colors.length],
        isManual: false,
      });
    } else {
      updateMeasuresData(token, {
        index: editIndex,
        data: { ...item },
      });
    }
    setIsEdit(false);
    getTotalMeasures();
  };

  const handleDelete = (index: any) => {
    deleteMeasuresData(token, index);
  };

  const getTotalScopes = async () => {
    try {
      const res = await fetchTotalScopes(token, 0);
      setTotalScopes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalMeasures = async () => {
    try {
      const res = await fetchMeasuresData(token);
      setMeasures(res.data?.filter((measure: any) => measure.isManual === false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalMeasures();
    getTotalScopes();
  }, []);

  const formatDate = (str: any) => {
    if (!str) return '';
    const parsedDate: any = new Date(str);
    if (isNaN(parsedDate)) {
      return '';
    }
    return format(parsedDate, 'yyyy-MM-dd');
  };

  return (
    <div className="max-w-7xl pl-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <CustomMeasuresIcon />
            <Typography className="text-3xl font-normal">Measures</Typography>
          </div>
        </div>
        <Typography variant="body1" className="text-gray-400">
          This tool shows the overall CO2 emissions and displays possible reduction measures.
        </Typography>
      </div>
      <Divider className="mt-8 mb-9" />
      <Grid container spacing={2} columnSpacing={4} className="min-h-96">
        <LeftSection scopes={totalScopes} measures={measures} />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item md={5} sm={12}>
          <form onSubmit={(e) => handleSave(e)}>
            <Grid container spacing={2}>
              {!isEdit ? (
                <MeasureItems
                  handleNew={handleNew}
                  items={measures}
                  handleDelete={handleDelete}
                  handleSelect={handleSelect}
                />
              ) : (
                <MeasureForm
                  item={item}
                  data={data}
                  scope1Items={scope1Items}
                  scope2Items={scope2Items}
                  scope3Items={scope3Items}
                  editIndex={editIndex}
                  handleInputChange={handleInputChange}
                  handleClearAll={handleClearAll}
                  handleClickCancel={handleClickCancel}
                />
              )}
            </Grid>
          </form>
        </Grid>
      </Grid>
      <div className="flex flex-col text-center pr-8 pt-10">
        <Typography className="text-xl font-normal mb-6">Graph</Typography>
        <StackedAreaChart />
      </div>
    </div>
  );
};

export default Measure;
