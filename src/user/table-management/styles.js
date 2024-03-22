import { makeStyles } from '@mui/styles'

import { theme } from '@/theme'

export const UseStyleTableManagement = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(10),
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: '95%',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: '20px',
    background: '#FFFFFF',
    filter: 'drop-shadow(0px 10px 10px rgba(196,200,208,0.4 ))',
  },
}))

export const UseStyleForm = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginLeft: 'auto',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '85%',
    width: '95%',
    borderRadius: '20px',
    background: '#FFFFFF',
    filter: 'drop-shadow(0px 10px 10px rgba(196,200,208,0.4 ))',
    '@media (max-width: 768px)': {
      width: '100%',
      height: '90%',
      alignItems: 'end',
    },
  },
}))
