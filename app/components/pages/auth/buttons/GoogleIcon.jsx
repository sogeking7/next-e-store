import {Box} from '@mantine/core';
import icon  from '../../../../public/GoogleIcon.ico'
import Image from "next/image";

export function GoogleIcon() {
  return (
    <Box className="w-5 h-5">
      <Image src={icon}/>
    </Box>
  )
}