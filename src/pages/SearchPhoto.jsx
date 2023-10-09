import './SearchPhoto.css';
import Search from '../components/SearchInput';
import CardPhoto from '../components/CardPhoto';
import { Grid } from '@mui/material';


export const SearchPhoto = () => {

    return (
        <>

        <Search sx={{marginTop:'1.5em', marginLeft:'1.5em', marginBottom:'2.5em', width:'80%'}} placeholder='Search Photos...'/>
        <Grid container spacing={1} sx={{width:'95%'}}>
            <Grid item xs={6}>
                <CardPhoto sx={{marginLeft:'1.5em'}}  title={'Prueba'} image={'src/assets/paisaje.svg'}/>
            </Grid>
            <Grid item xs={6}>
                <CardPhoto sx={{marginLeft:'1.5em'}}  title={'Prueba2'} image={'src/assets/paella.svg'}/>
            </Grid>
        </Grid>
        
        </>
    )
}