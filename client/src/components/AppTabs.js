import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {MyDiagram} from './MyDiagram'
import {MoviesDataContext} from '../context/DataMoviesContext'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    },
   tabs:{
     textTransform:"none"
   },
   CWGtext1:{
       position:"absolute",
       left:"1%",
       right:"95%",
       top:"3%",
       },
      CWGtext2:{
        position:"absolute",
        left:"1%",
        right:"95%",
        top:"23.5%",
        },
       CWGtext3:{
        position:"absolute",
        left:"1%",
        right:"95%",
        top:"42%",
        },
       CWGtext4:{
        position:"absolute",
        left:"1%",
        right:"95%",
        top:"62.5%",
        },
        ROItext:{
        position:"absolute",
        whiteSpace:"pre"
        }
}));

export default function AppTabs() {
 
 const MovieContext = useContext(MoviesDataContext)
 
 const {lengthMovieDiagram,
        ratingDataDiagram,
        releaseQuarterDiagram,
        runtimeMovieDiagram,
        typeDiagram,
        NumbertypesDiagram
      } = MovieContext

 const lengthData = lengthMovieDiagram() 
 const ratingData = ratingDataDiagram() 
 const releaseData = releaseQuarterDiagram() 
 const runtimeData = runtimeMovieDiagram()
 const typeData = typeDiagram()
 const NumbersTypesData = NumbertypesDiagram()

 const classes = useStyles();
 const theme = useTheme();
 const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="full width tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab className={classes.tabs} label="CWG => Movie Length Name" {...a11yProps(0)} />
          <Tab className={classes.tabs} label="ROI => Movie Rating" {...a11yProps(1)} />
          <Tab className={classes.tabs} label="ROI => Release Quarter" {...a11yProps(2)} />
          <Tab className={classes.tabs} label="ROI => Movie Runtime" {...a11yProps(3)} />
          <Tab className={classes.tabs} label="ROI => Movie Type" {...a11yProps(4)} />
          <Tab className={classes.tabs} label="ROI => Movie Type Numbers" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Typography className={classes.CWGtext1} component={'span'} variant={'body2'}>(1B)$</Typography>
        <Typography className={classes.CWGtext2} component={'span'} variant={'body2'}>(750M)$</Typography>
        <Typography className={classes.CWGtext3} component={'span'} variant={'body2'}>(500M)$</Typography>
        <Typography className={classes.CWGtext4} component={'span'} variant={'body2'}>(250M)$</Typography>
        <MyDiagram data={lengthData}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Typography className={classes.ROItext} component={'div'} variant={'caption'}> ROI is measured as a percentage</Typography>
        <MyDiagram data={ratingData}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Typography className={classes.ROItext} component={'div'} variant={'caption'}> ROI is measured as a percentage</Typography>
        <MyDiagram data={releaseData}/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <Typography className={classes.ROItext} component={'div'} variant={'caption'}> ROI is measured as a percentage</Typography>
        <MyDiagram data={runtimeData}/>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
        <Typography className={classes.ROItext} component={'div'} variant={'caption'}> ROI is measured as a percentage</Typography>
        <MyDiagram data={typeData}/>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
        <Typography className={classes.ROItext} component={'div'} variant={'caption'}> ROI is measured as a percentage</Typography>
        <MyDiagram data={NumbersTypesData}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}


