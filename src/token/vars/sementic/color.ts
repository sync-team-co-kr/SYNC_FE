// orange 컬러만 Primary, alert 컬러로 구분되어있어 해당 컬러들만 이름 변경

export const color = {
  // primary
  primaryLightOrange: '#FFFDF3',
  primaryOrange: '#FFD880',

  // black
  black: '#202020',
  black70: '#636363',
  black35: '#B3B3B3',
  black20: '#BFBFBF',
  black10: '#F4F4F4',

  // white
  white: '#FFFFFF',

  // alert color
  lightBlue: '#E7F1FF',
  positiveBlue: '#407BD2',
  lightRed: '#FDF5F4',
  negativeRed: '#ED6863',
  alertLightOrange: '#FFF5E8',
  alertOrange: '#FF8A00',
  strokeLightOrange: '#FFE4C0',
  lightGreen: '#F4FBD8',
  strokeLightGreen: '#CBFFD3',
  green: '#23B531',
  lightPurple: '#F1E4FF',
  strokeLightPurple: '#E9D5FF',
  purple: '#9E48FF',
} as const;
