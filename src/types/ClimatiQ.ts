export interface Activity {
  current_page?: number | undefined;
  last_page?: number | undefined;
  total_results?: number | undefined;
  results: Result[];
  possible_filters?: PossibleFilters | undefined;
}

export interface PossibleFilters {
  year: number[];
  source: { source: string; datasets: string[] }[];
  region: { id: string; name: string }[];
  category: string[];
  sector: string[];
  unit_type: string[];
  source_lca_activity: string[];
  access_type: string[];
  data_quality_flags: any[];
}

export interface Result {
  activity_id: string;
  id: string;
  name: string;
  category: string;
  sector: string;
  source: string;
  source_link: string;
  source_dataset: string;
  uncertainty: any;
  year: number;
  year_released: number;
  region: string;
  region_name: string;
  description: string;
  unit_type: string;
  unit: string;
  source_lca_activity: string;
  data_quality_flags: any[];
  access_type: string;
  supported_calculation_methods: string[];
  factor: any;
  factor_calculation_method: any;
  factor_calculation_origin: any;
  constituent_gases: {
    co2e_total: any;
    co2e_other: any;
    co2: any;
    ch4: any;
    n2o: any;
  };
  checked?: boolean;
  estimateData?: EstimateData;
}

export interface EstimateData {
  co2e: number;
  co2e_unit: string;
  co2e_calculation_method: string;
  co2e_calculation_origin?: string;
  emission_factor?: Result;
  constituent_gases?: {
    co2e_total: number;
    co2e_other: number;
    co2: number;
    ch4: number;
    n2o: number;
  };
  activity_data?: {
    activity_value: number;
    activity_unit: string;
  };
  audit_trail?: string;
}
