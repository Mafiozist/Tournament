import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, Drawer, IconButton, TextField, Typography } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useGetTournamentsQuery } from '../../redux/component/api/tournaments.api';
import CircularProgress from '@mui/material/CircularProgress';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function TournamentsListDrawer(props) {
  const [state, setState] = React.useState({
    left: false,
  });

  const {data, isLoading, isError, isSuccess} = useGetTournamentsQuery()
  const [filteredData, setFilteredData] = React.useState();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, left: open });
    setFilteredData();
  };

  const handleFilterTour = (e)=>{
    if(!e.target.value) {setFilteredData(data); return;}

    setFilteredData(data.filter(i=> i.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <TextField variant='outlined' label='Поиск турнира' onChange={handleFilterTour} style={{margin:'10px', width:'230px'}}></TextField>
      <List>
        {
            filteredData? 
                filteredData.map((tour, index) => (
                  <ListItem key={tour.idTour} disablePadding sx={{width:'100%',whiteSpace:'normal'}} onClick={()=> props.handleListItemClick(tour.idTour,index)}>
                      <ListItemButton onClick={toggleDrawer(false)} >
                              <ListItemIcon>
                                  <EmojiEventsIcon/>
                              </ListItemIcon>
                              <ListItemText primary={tour.name}/>
                      </ListItemButton>
                  </ListItem>
                ))
        
            : 
        
                isLoading? <CircularProgress style={{display:'flex'}}/>
                
                : 
                
                <Typography style={{padding:'10px'}}>
                      Еще не был создан ни один турнир {/*<Button>Создать?</Button>*/ setFilteredData(data)}
                </Typography>
            
        }
      </List>
    </Box>
  );

  return (
    <div>
        
        <IconButton style={{ position: 'fixed', top: 79, left: 8, width: '60px', height: '60px' }}  onClick={toggleDrawer(true)}>
                <DensityMediumIcon />
        </IconButton>

        <Drawer
            anchor='left'
            open={state.left}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </Drawer>

     
    </div>
  );
}