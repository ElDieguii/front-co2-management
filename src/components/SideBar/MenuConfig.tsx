import {
  ScopeIcon,
  CustomReportIcon,
  CustomAnalisysIcon,
  CustomMeasuresIcon,
  CustomDashboardIcon,
  CustomSettingsIcon,
  CustomUserManagementIcon,
  CustomSuplierManagementIcon,
  CustomTaskManagementIcon,
  CustomEmailIcon,
  CustomCompanyIcon,
  CustomFacilityIcon,
  CustomProductIcon,
} from '../../assets/icons';

export const navbarScopesConfig = [
  {
    name: 'Scopes',
    icon: <ScopeIcon />,
    isAdmin: false,
    children: [
      {
        name: 'Scope 1',
        icon: <ScopeIcon />,
        children: [
          {
            name: 'Stationary Combustion',
            icon: '',
            link: '/scope1?tab=stationary_combustion',
          },
          {
            name: 'Mobile Combustion',
            icon: '',
            link: '/scope1?tab=mobile_combustion',
          },
          {
            name: 'Fugitive Combustion',
            icon: '',
            link: '/scope1?tab=fugitive_combustion',
          },
        ],
      },
      {
        name: 'Scope 2',
        icon: <ScopeIcon />,
        link: '/scope2',
      },
      {
        name: 'Scope 3',
        icon: <ScopeIcon />,
        children: [
          {
            name: 'Purchased Goods & Services',
            icon: '',
            link: '/scope3?tab=purchased_goods_services',
          },
          {
            name: 'Capital Goods',
            icon: '',
            link: '/scope3?tab=capital_goods',
          },
          {
            name: 'Fuel & Energy Activities',
            icon: '',
            link: '/scope3?tab=fuel_energy_activities',
          },
          {
            name: 'Upstream Transportation & Distribution',
            icon: '',
            link: '/scope3?tab=up_transportation_distribution',
          },
          {
            name: 'Waste in Operations',
            icon: '',
            link: '/scope3?tab=waste_operations',
          },
          {
            name: 'Business Travel',
            icon: '',
            link: '/scope3?tab=business_travel',
          },
          {
            name: 'Employee Commuting',
            icon: '',
            link: '/scope3?tab=employee_commuting',
          },
          {
            name: 'Upstream Leased Assets',
            icon: '',
            link: '/scope3?tab=upstream_leased_assets',
          },
          {
            name: 'Downstream Transportation & Distribution',
            icon: '',
            link: '/scope3?tab=dw_transportation_distribution',
          },
          {
            name: 'Process of Sold Products',
            icon: '',
            link: '/scope3?tab=Process_Sold_Products',
          },
          {
            name: 'Use of Sold Products',
            icon: '',
            link: '/scope3?tab=use_sold_products',
          },
          {
            name: 'End-of-Life Treatment',
            icon: '',
            link: '/scope3?tab=end_life_treatment',
          },
          {
            name: 'Downstream Leased Assets',
            icon: '',
            link: '/scope3?tab=downstream_leased_assets',
          },
          {
            name: 'Franchise',
            icon: '',
            link: '/scope3?tab=franchise',
          },
          {
            name: 'Investments',
            icon: '',
            link: '/scope3?tab=investments',
          },
        ],
      },
    ],
  },
];
export const navbarMenuConfig = [
  {
    name: 'Reports',
    icon: <CustomReportIcon />,
    isAdmin: false,
    children: [
      {
        name: 'Report',
        icon: <CustomReportIcon />,
        link: '/report',
        isAdmin: false,
      },
      {
        name: 'Analysis',
        icon: <CustomAnalisysIcon />,
        link: '/analysis',
        isAdmin: false,
      },
      {
        name: 'Measures',
        icon: <CustomMeasuresIcon />,
        link: '/measure',
        isAdmin: false,
      },
    ],
  },
  {
    name: 'Dashboard',
    icon: <CustomDashboardIcon />,
    isAdmin: false,
    link: '/dashboard',
  },
  {
    name: 'Management',
    icon: <CustomSettingsIcon />,
    isAdmin: true,
    children: [
      {
        name: 'User Management',
        icon: <CustomUserManagementIcon />,
        link: '/user-management',
        isAdmin: true,
      },
      {
        name: 'Supplier Management',
        icon: <CustomSuplierManagementIcon />,
        link: '/supplier-management',
        isAdmin: true,
      },
      {
        name: 'Task Management',
        icon: <CustomTaskManagementIcon />,
        link: '/task-management',
        isAdmin: true,
      },
      {
        name: 'Excel Upload',
        icon: <CustomEmailIcon />,
        link: '/excel-upload',
        isAdmin: false,
      },
    ],
  },
  {
    name: 'Company',
    icon: <CustomCompanyIcon />,
    isAdmin: false,
    link: '/company',
  },
  {
    name: 'Facility',
    icon: <CustomFacilityIcon />,
    isAdmin: false,
    link: '/facility',
  },
  {
    name: 'Product',
    icon: <CustomProductIcon />,
    isAdmin: false,
    link: '/product',
  },
];
