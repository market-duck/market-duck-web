import { createGlobalStyle } from 'styled-components';

export const AppColorStyle = createGlobalStyle`
:root {
  /* Gray colors */
  .bg-gray-00 {
    background-color: #FFFFFF;
  }
  .fc-gray-00 {
    color: #FFFFFF;
  }

  .bg-gray-50 {
    background-color: #F5F5F5;
  }
  .fc-gray-50 {
    color: #F5F5F5;
  }

  .bg-gray-100 {
    background-color: #E3E3E3;
  }
  .fc-gray-100 {
    color: #E3E3E3;
  }

  .bg-gray-200 {
    background-color: #D1D1D1;
  }
  .fc-gray-200 {
    color: #D1D1D1;
  }

  .bg-gray-300 {
    background-color: #CACACA;
  }
  .fc-gray-300 {
    color: #CACACA;
  }

  .bg-gray-400 {
    background-color: #B6B6B6;
  }
  .fc-gray-400 {
    color: #B6B6B6;
  }

  .bg-gray-500 {
    background-color: #989898;
  }
  .fc-gray-500 {
    color: #989898;
  }

  .bg-gray-600 {
    background-color: #868686;
  }
  .fc-gray-600 {
    color: #868686;
  }

  .bg-gray-700 {
    background-color: #777777;
  }
  .fc-gray-700 {
    color: #777777;
  }

  .bg-gray-800 {
    background-color: #4F4F4F;
  }
  .fc-gray-800 {
    color: #4F4F4F;
  }

  .bg-gray-900 {
    background-color: #333333;
  }
  .fc-gray-900 {
    color: #333333;
  }

  /* Green colors */
  .bg-green-50 {
    background-color: #ECF7E7;
  }
  .fc-green-50 {
    color: #ECF7E7;
  }

  .bg-green-100 {
    background-color: #C7E6B9;
  }
  .fc-green-100 {
    color: #C7E6B9;
  }

  .bg-green-200 {
    background-color: #A2D48E;
  }
  .fc-green-200 {
    color: #A2D48E;
  }

  .bg-green-300 {
    background-color: #7FC167;
  }
  .fc-green-300 {
    color: #7FC167;
  }

  .bg-green-400 {
    background-color: #5DAD45;
  }
  .fc-green-400 {
    color: #5DAD45;
  }

  .bg-green-500 {
    background-color: #3E9926;
  }
  .fc-green-500 {
    color: #3E9926;
  }

  .bg-green-600 {
    background-color: #208408;
  }
  .fc-green-600 {
    color: #208408;
  }

  .bg-green-700 {
    background-color: #036E00;
  }
  .fc-green-700 {
    color: #036E00;
  }

  .bg-green-800 {
    background-color: #22770D;
  }
  .fc-green-800 {
    color: #22770D;
  }

  .bg-green-900 {
    background-color: #114A03;
  }
  .fc-green-900 {
    color: #114A03;
  }

  /* Red colors */
  .bg-red-100 {
    background-color: #FDE8E8;
  }
  .fc-red-100 {
    color: #FDE8E8;
  }

  .bg-red-300 {
    background-color: #F89B9B;
  }
  .fc-red-300 {
    color: #F89B9B;
  }

  .bg-red-500 {
    background-color: #F14141;
  }
  .fc-red-500 {
    color: #F14141;
  }

  .bg-red-700 {
    background-color: #CA1414;
  }
  .fc-red-700 {
    color: #CA1414;
  }

  .bg-red-900 {
    background-color: #880D0D;
  }
  .fc-red-900 {
    color: #880D0D;
  }

  /* Blue colors */
  .bg-blue-100 {
    background-color: #EAF3FF;
  }
  .fc-blue-100 {
    color: #EAF3FF;
  }

  .bg-blue-300 {
    background-color: #A4CBFE;
  }
  .fc-blue-300 {
    color: #A4CBFE;
  }

  .bg-blue-500 {
    background-color: #519CFD;
  }
  .fc-blue-500 {
    color: #519CFD;
  }

  .bg-blue-700 {
    background-color: #2572D7;
  }
  .fc-blue-700 {
    color: #2572D7;
  }

  .bg-blue-900 {
    background-color: #194C90;
  }
  .fc-blue-900 {
    color: #194C90;
  }

  /* Yellow colors */
  .bg-yellow-100 {
    background-color: #FFFBE9;
  }
  .fc-yellow-100 {
    color: #FFFBE9;
  }

  .bg-yellow-300 {
    background-color: #FFEF9F;
  }
  .fc-yellow-300 {
    color: #FFEF9F;
  }

  .bg-yellow-500 {
    background-color: #FFE147;
  }
  .fc-yellow-500 {
    color: #FFE147;
  }

  .bg-yellow-700 {
    background-color: #D9B91A;
  }
  .fc-yellow-700 {
    color: #D9B91A;
  }

  .bg-yellow-900 {
    background-color: #917C12;
  }
  .fc-yellow-900 {
    color: #917C12;
  }

  /* White color */
  .bg-white {
    background-color: #FFFFFF;
  }
  .fc-white {
    color: #FFFFFF;
  }
}
`;

export const AppColor = {
  GRAY00: {
    hex: '#FFFFFF',
    bg: 'bg-gray-00',
    color: 'fc-gray-00',
  },
  GRAY50: {
    hex: '#F5F5F5',
    bg: 'bg-gray-50',
    color: 'fc-gray-50',
  },
  GRAY100: {
    hex: '#E3E3E3',
    bg: 'bg-gray-100',
    color: 'fc-gray-100',
  },
  GRAY200: {
    hex: '#D1D1D1',
    bg: 'bg-gray-200',
    color: 'fc-gray-200',
  },
  GRAY300: {
    hex: '#CACACA',
    bg: 'bg-gray-300',
    color: 'fc-gray-300',
  },
  GRAY400: {
    hex: '#B6B6B6',
    bg: 'bg-gray-400',
    color: 'fc-gray-400',
  },
  GRAY500: {
    hex: '#989898',
    bg: 'bg-gray-500',
    color: 'fc-gray-500',
  },
  GRAY600: {
    hex: '#868686',
    bg: 'bg-gray-600',
    color: 'fc-gray-600',
  },
  GRAY700: {
    hex: '#777777',
    bg: 'bg-gray-700',
    color: 'fc-gray-700',
  },
  GRAY800: {
    hex: '#4F4F4F',
    bg: 'bg-gray-800',
    color: 'fc-gray-800',
  },
  GRAY900: {
    hex: '#333333',
    bg: 'bg-gray-900',
    color: 'fc-gray-900',
  },
  GREEN50: {
    hex: '#ECF7E7',
    bg: 'bg-green-50',
    color: 'fc-green-50',
  },
  GREEN100: {
    hex: '#C7E6B9',
    bg: 'bg-green-100',
    color: 'fc-green-100',
  },
  GREEN200: {
    hex: '#A2D48E',
    bg: 'bg-green-200',
    color: 'fc-green-200',
  },
  GREEN300: {
    hex: '#7FC167',
    bg: 'bg-green-300',
    color: 'fc-green-300',
  },
  GREEN400: {
    hex: '#5DAD45',
    bg: 'bg-green-400',
    color: 'fc-green-400',
  },
  GREEN500: {
    hex: '#3E9926',
    bg: 'bg-green-500',
    color: 'fc-green-500',
  },
  GREEN600: {
    hex: '#208408',
    bg: 'bg-green-600',
    color: 'fc-green-600',
  },
  GREEN700: {
    hex: '#036E00',
    bg: 'bg-green-700',
    color: 'fc-green-700',
  },
  GREEN800: {
    hex: '#22770D',
    bg: 'bg-green-800',
    color: 'fc-green-800',
  },
  GREEN900: {
    hex: '#114A03',
    bg: 'bg-green-900',
    color: 'fc-green-900',
  },
  RED100: {
    hex: '#FDE8E8',
    bg: 'bg-red-100',
    color: 'fc-red-100',
  },
  RED300: {
    hex: '#F89B9B',
    bg: 'bg-red-300',
    color: 'fc-red-300',
  },
  RED500: {
    hex: '#F14141',
    bg: 'bg-red-500',
    color: 'fc-red-500',
  },
  RED700: {
    hex: '#CA1414',
    bg: 'bg-red-700',
    color: 'fc-red-700',
  },
  RED900: {
    hex: '#880D0D',
    bg: 'bg-red-900',
    color: 'fc-red-900',
  },
  BLUE100: {
    hex: '#EAF3FF',
    bg: 'bg-blue-100',
    color: 'fc-blue-100',
  },
  BLUE300: {
    hex: '#A4CBFE',
    bg: 'bg-blue-300',
    color: 'fc-blue-300',
  },
  BLUE500: {
    hex: '#519CFD',
    bg: 'bg-blue-500',
    color: 'fc-blue-500',
  },
  BLUE700: {
    hex: '#2572D7',
    bg: 'bg-blue-700',
    color: 'fc-blue-700',
  },
  BLUE900: {
    hex: '#194C90',
    bg: 'bg-blue-900',
    color: 'fc-blue-900',
  },
  YELLOW100: {
    hex: '#FFFBE9',
    bg: 'bg-yellow-100',
    color: 'fc-yellow-100',
  },
  YELLOW300: {
    hex: '#FFEF9F',
    bg: 'bg-yellow-300',
    color: 'fc-yellow-300',
  },
  YELLOW500: {
    hex: '#FFE147',
    bg: 'bg-yellow-500',
    color: 'fc-yellow-500',
  },
  YELLOW700: {
    hex: '#D9B91A',
    bg: 'bg-yellow-700',
    color: 'fc-yellow-700',
  },
  YELLOW900: {
    hex: '#917C12',
    bg: 'bg-yellow-900',
    color: 'fc-yellow-900',
  },
  WHITE: {
    hex: '#FFFFFF',
    bg: 'bg-white',
    color: 'fc-white',
  },
};

export const AppSemanticColor = {
  // Text colors
  TEXT_PRIMARY: AppColor.GRAY800.hex,
  TEXT_SECONDARY: AppColor.GRAY700.hex,
  TEXT_TERTIARY: AppColor.GRAY600.hex,
  TEXT_INFO: AppColor.BLUE500.hex,
  TEXT_WARNING: AppColor.YELLOW900.hex,
  TEXT_SUCCESS: AppColor.GREEN500.hex,
  TEXT_DANGER: AppColor.RED500.hex,
  TEXT_DISABLED: AppColor.GRAY500.hex,
  TEXT_INVERSE: AppColor.GRAY00.hex,
  TEXT_INTERACTIVE_PRIMARY: AppColor.GREEN500.hex,
  TEXT_INTERACTIVE_PRIMARY_HOVER: AppColor.GREEN600.hex,
  TEXT_INTERACTIVE_PRIMARY_PRESS: AppColor.GREEN700.hex,
  TEXT_INTERACTIVE_SECONDARY: AppColor.GRAY600.hex,
  TEXT_INTERACTIVE_SECONDARY_HOVER: AppColor.GRAY700.hex,
  TEXT_INTERACTIVE_SECONDARY_PRESS: AppColor.GRAY800.hex,

  // Background colors
  BG_PRIMARY: AppColor.GRAY00.hex,
  BG_SECONDARY: AppColor.GRAY50.hex,
  BG_TERTIARY: AppColor.GRAY100.hex,
  BG_INFO_SUBTLE: AppColor.BLUE100.hex,
  BG_INFO: AppColor.BLUE500.hex,
  BG_WARNING_SUBTLE: AppColor.YELLOW100.hex,
  BG_WARNING: AppColor.YELLOW500.hex,
  BG_SUCCESS_SUBTLE: AppColor.GREEN50.hex,
  BG_SUCCESS: AppColor.GREEN500.hex,
  BG_DANGER_SUBTLE: AppColor.RED100.hex,
  BG_DANGER: AppColor.RED500.hex,
  BG_DISABLED: AppColor.GRAY100.hex,
  BG_INTERACTIVE_PRIMARY: AppColor.GREEN500.hex,
  BG_INTERACTIVE_PRIMARY_HOVER: AppColor.GREEN600.hex,
  BG_INTERACTIVE_PRIMARY_PRESS: AppColor.GREEN700.hex,
  BG_INTERACTIVE_SECONDARY: AppColor.GRAY50.hex,
  BG_INTERACTIVE_SECONDARY_HOVER: AppColor.GRAY100.hex,
  BG_INTERACTIVE_SECONDARY_PRESS: AppColor.GRAY200.hex,
  BG_INTERACTIVE_INFO: AppColor.BLUE100.hex,
  BG_INTERACTIVE_INFO_HOVER: AppColor.BLUE300.hex,
  BG_INTERACTIVE_INFO_PRESS: AppColor.BLUE300.hex,
  BG_INTERACTIVE_WARNING: AppColor.YELLOW100.hex,
  BG_INTERACTIVE_WARNING_HOVER: AppColor.YELLOW300.hex,
  BG_INTERACTIVE_WARNING_PRESS: AppColor.YELLOW300.hex,
  BG_INTERACTIVE_SUCCESS: AppColor.GREEN100.hex,
  BG_INTERACTIVE_SUCCESS_HOVER: AppColor.GREEN300.hex,
  BG_INTERACTIVE_SUCCESS_PRESS: AppColor.GREEN300.hex,
  BG_INTERACTIVE_DANGER: AppColor.RED100.hex,
  BG_INTERACTIVE_DANGER_HOVER: AppColor.RED300.hex,
  BG_INTERACTIVE_DANGER_PRESS: AppColor.RED300.hex,

  // Border colors
  BORDER_PRIMARY: AppColor.GRAY500.hex,
  BORDER_SECONDARY: AppColor.GRAY400.hex,
  BORDER_TERTIARY: AppColor.GRAY300.hex,
  BORDER_FOCUS_RING: AppColor.GREEN600.hex,
  BORDER_INFO: AppColor.BLUE300.hex,
  BORDER_WARNING: AppColor.YELLOW300.hex,
  BORDER_SUCCESS: AppColor.GREEN300.hex,
  BORDER_DANGER: AppColor.RED300.hex,
  BORDER_DISABLED: AppColor.GRAY400.hex,
  BORDER_INTERACTIVE_PRIMARY: AppColor.GREEN500.hex,
  BORDER_INTERACTIVE_PRIMARY_HOVER: AppColor.GREEN600.hex,
  BORDER_INTERACTIVE_PRIMARY_PRESS: AppColor.GREEN700.hex,
  BORDER_INTERACTIVE_SECONDARY: AppColor.GRAY200.hex,
  BORDER_INTERACTIVE_SECONDARY_HOVER: AppColor.GRAY300.hex,
  BORDER_INTERACTIVE_SECONDARY_PRESS: AppColor.GRAY400.hex,

  // Icon colors
  ICON_PRIMARY: AppColor.GRAY800.hex,
  ICON_SECONDARY: AppColor.GRAY700.hex,
  ICON_TERTIARY: AppColor.GRAY600.hex,
  ICON_BRAND: AppColor.GREEN500.hex,
  ICON_INFO: AppColor.BLUE500.hex,
  ICON_WARNING: AppColor.YELLOW900.hex,
  ICON_SUCCESS: AppColor.GREEN500.hex,
  ICON_DANGER: AppColor.RED500.hex,
  ICON_DISABLED: AppColor.GRAY500.hex,
  ICON_INVERSE: AppColor.GRAY00.hex,
  ICON_INTERACTIVE_PRIMARY: AppColor.GREEN500.hex,
  ICON_INTERACTIVE_PRIMARY_HOVER: AppColor.GREEN600.hex,
  ICON_INTERACTIVE_PRIMARY_PRESS: AppColor.GREEN700.hex,
  ICON_INTERACTIVE_SECONDARY: AppColor.GRAY600.hex,
  ICON_INTERACTIVE_SECONDARY_HOVER: AppColor.GRAY700.hex,
  ICON_INTERACTIVE_SECONDARY_PRESS: AppColor.GRAY800.hex,
};
