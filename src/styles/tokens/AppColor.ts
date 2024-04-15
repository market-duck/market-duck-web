import { createGlobalStyle } from 'styled-components';

export const AppColorStyle = createGlobalStyle`
:root {
  /* Gray colors */
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

  /* Primary colors */
  .bg-primary-50 {
    background-color: #ECF7E7;
  }
  .fc-primary-50 {
    color: #ECF7E7;
  }

  .bg-primary-100 {
    background-color: #C7E6B9;
  }
  .fc-primary-100 {
    color: #C7E6B9;
  }

  .bg-primary-200 {
    background-color: #A2D48E;
  }
  .fc-primary-200 {
    color: #A2D48E;
  }

  .bg-primary-300 {
    background-color: #7FC167;
  }
  .fc-primary-300 {
    color: #7FC167;
  }

  .bg-primary-400 {
    background-color: #5DAD45;
  }
  .fc-primary-400 {
    color: #5DAD45;
  }

  .bg-primary-500 {
    background-color: #3E9926;
  }
  .fc-primary-500 {
    color: #3E9926;
  }

  .bg-primary-600 {
    background-color: #208408;
  }
  .fc-primary-600 {
    color: #208408;
  }

  .bg-primary-700 {
    background-color: #036E00;
  }
  .fc-primary-700 {
    color: #036E00;
  }

  .bg-primary-800 {
    background-color: #22770D;
  }
  .fc-primary-800 {
    color: #22770D;
  }

  .bg-primary-900 {
    background-color: #114A03;
  }
  .fc-primary-900 {
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

  .bg-yellow-200 {
    background-color: #FFEF9F;
  }
  .fc-yellow-200 {
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
  PRIMARY50: {
    hex: '#ECF7E7',
    bg: 'bg-primary-50',
    color: 'fc-primary-50',
  },
  PRIMARY100: {
    hex: '#C7E6B9',
    bg: 'bg-primary-100',
    color: 'fc-primary-100',
  },
  PRIMARY200: {
    hex: '#A2D48E',
    bg: 'bg-primary-200',
    color: 'fc-primary-200',
  },
  PRIMARY300: {
    hex: '#7FC167',
    bg: 'bg-primary-300',
    color: 'fc-primary-300',
  },
  PRIMARY400: {
    hex: '#5DAD45',
    bg: 'bg-primary-400',
    color: 'fc-primary-400',
  },
  PRIMARY500: {
    hex: '#3E9926',
    bg: 'bg-primary-500',
    color: 'fc-primary-500',
  },
  PRIMARY600: {
    hex: '#208408',
    bg: 'bg-primary-600',
    color: 'fc-primary-600',
  },
  PRIMARY700: {
    hex: '#036E00',
    bg: 'bg-primary-700',
    color: 'fc-primary-700',
  },
  PRIMARY800: {
    hex: '#22770D',
    bg: 'bg-primary-800',
    color: 'fc-primary-800',
  },
  PRIMARY900: {
    hex: '#114A03',
    bg: 'bg-primary-900',
    color: 'fc-primary-900',
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
  YELLOW200: {
    hex: '#FFEF9F',
    bg: 'bg-yellow-200',
    color: 'fc-yellow-200',
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
