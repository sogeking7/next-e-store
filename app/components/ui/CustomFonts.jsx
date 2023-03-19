import { Global } from '@mantine/core';
import SfPro from '../../public/fonts/San-Francisco/San Francisco/otf/SFNSDisplay-Regular.otf'

export default function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'SF-Pro',
            src: `url('${SfPro}') format("otf")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}