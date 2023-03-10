import React from 'react'
import { AgentCardProp, InfoBarProps } from 'interfaces/agent'
import { EmailOutlined, LocationCity, Phone,Place } from '@mui/icons-material'
import { useGetIdentity } from '@pankod/refine-core'
import { Box,Stack,Typography, useTheme } from '@pankod/refine-mui'
import { Link } from '@pankod/refine-react-router-v6'

const InfoBar =({icon,name}:InfoBarProps)=>{
  const theme= useTheme();
  return (
    <Stack flex={1} minWidth={{xs:'100%', sm:300}} gap={1.5} direction='row'>
      {icon}
      <Typography fontSize={14} color={theme.palette.mode === "dark" ? "white" :'#808191'}>{name}</Typography>
    </Stack>
  );

};
const AgentCard = ({id,name,email,avatar,noOfProperties}:AgentCardProp) => {

  const { data:currentUser} = useGetIdentity();
  const theme= useTheme();
  const generateLink=() => {
    if(currentUser.email===email) return '/my-profile';

    return `agents/show/${id}`;
  }
  return (
    <Box
    component={Link} to={generateLink()}
    width='100%'
    sx={{display:'flex', flexDirection:{xs:'column', sm:'row'}, gap:'20px', padding:'20px', '&:hover':{boxShadow:'0 22px 45px 2px rgba(176, 176, 176, 0.1' } }}>
<img
src={avatar}
alt='user'
width={90}
height={90}
style={{ borderRadius:8, objectFit:'contain'}}
/>
<Stack direction='column' justifyContent='space-between' flex={1} gap={{xs:4, sm:2}} >
  <Stack gap={2} direction='row' flexWrap='wrap' alignItems='center'>
    <Typography fontSize={22} fontWeight={600} color={theme.palette.mode === "dark" ? "white" :'#808191'}>{name}</Typography>
    <Typography fontSize={14} color={theme.palette.mode === "dark" ? "white" :'#808191'}>Real-estate Agent</Typography>

  </Stack>
  <Stack direction='row' flexWrap='wrap' justifyContent='space-between' alignItems='center' gap={2}>
  <InfoBar
                        icon={<EmailOutlined sx={{ color:theme.palette.mode === "dark" ? "white" :'#808191' }} />}
                        name={email}
                    />
   <InfoBar
                        icon={<Place sx={{ color:theme.palette.mode === "dark" ? "white" :'#808191' }} />}
                        name='Paris'
                    />
  <InfoBar
                        icon={<LocationCity sx={{ color:theme.palette.mode === "dark" ? "white" :'#808191' }} />}
                        name={`${noOfProperties} Properties`}
                    />
  <InfoBar
                        icon={<Phone sx={{ color:theme.palette.mode === "dark" ? "white" :'#808191' }} />}
                        name='06 25 81 09 49'
                    />                 

  </Stack>

</Stack>
    </Box>
  )
}

export default AgentCard;
