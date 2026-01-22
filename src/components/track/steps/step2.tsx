import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const Step2 = () => {
    const [progress, setProgress] = React.useState(10);
    const [category, setCategory] = useState<string>('');

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const categories = [
        {
            value: 'CHILL',
            label: 'Chill',
        },
        {
            value: 'WORKOUT',
            label: 'WORKOUT',
        },
        {
            value: 'PARTY',
            label: 'PARTY',
        }
    ]

    return (
        <div>
            <div>Your uploading track:</div>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>

            <Grid container spacing={2} mt={5}>
                <Grid
                    size={{ xs: 6, md: 4 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <div style={{
                        width: '250px',
                        height: '250px',
                        backgroundColor: '#ccc',
                        marginBottom: '20px'
                    }}>

                    </div>

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                    </Button>
                </Grid>
                <Grid size={{ xs: 6, md: 8 }}>
                    <TextField sx={{ mb: 2 }} label="Title" fullWidth variant="standard" margin="dense" />
                    <TextField sx={{ mb: 2 }} label="Description" fullWidth variant="standard" margin="dense" />
                    <TextField
                        sx={{ mb: 2 }}
                        label="Category"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.value} value={category.value}>
                                {category.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                        SAVE
                    </Button>
                </Grid>
            </Grid>
        </div >
    )

}

export default Step2;