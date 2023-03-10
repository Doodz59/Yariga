import React from 'react'
import { Typography,Box,Stack, useTheme } from '@pankod/refine-mui'
import { propertyReferralsInfo } from 'constants/index'

interface ProgressBarProps{
  title: string,
  percentage: number, 
  color : string,
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => {
    const theme = useTheme();
    return(
        <Box width="100%">
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Typography fontSize={16} fontWeight={500} color={theme.palette.mode === "dark" ? "white" :'#11142d'}>
                {title}
            </Typography>
            <Typography fontSize={16} fontWeight={500} color={theme.palette.mode === "dark" ? "white" :'#11142d'}>
                {percentage}%
            </Typography>
        </Stack>
        <Box
            mt={2}
            position="relative"
            width="100%"
            height="8px"
            borderRadius={1}
            bgcolor="#e4e8ef"
        >
            <Box
                width={`${percentage}%`}
                bgcolor={color}
                position="absolute"
                height="100%"
                borderRadius={1}
            />
        </Box>
    </Box>
    )
 
};

const PropertyReferrals = () => {
    const theme = useTheme();
  return (
      <Box
          p={4}
          bgcolor={theme.palette.mode === "dark" ? "#0E8388" : "#fcfcfc"}
          id="chart"
          minWidth={490}
          display="flex"
          flexDirection="column"
          borderRadius="15px"
      >
          <Typography fontSize={18} fontWeight={600} color={theme.palette.mode === "dark" ? "white" :'#11142d'}>
              Property Referrals
          </Typography>

          <Stack my="20px" direction="column" gap={4}>
              {propertyReferralsInfo.map((bar) => (
                  <ProgressBar key={bar.title} {...bar} />
              ))}
          </Stack>
      </Box>
  );
};

export default PropertyReferrals;