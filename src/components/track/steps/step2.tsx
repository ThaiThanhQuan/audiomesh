import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react';

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

function InputFileUpload() {
    return (
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

interface INewTrack {
    title: string,
    description: string,
    trackUrl: string,
    imgUrl: string,
    category: string
}

interface IProps {
    trackUpload: {
        fileName: string;
        percent: number;
        uploadedTrackName: string
    }
}
const Step2 = (props: IProps) => {
    const { trackUpload } = props;
    const categories = [
        {
            value: 'CHILL',
            label: 'CHILL',
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

    const [info, setInfo] = useState<INewTrack>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: ""
    })

    console.log('upload', info)

    useEffect(() => {
        if (trackUpload && trackUpload.uploadedTrackName) {
            setInfo({
                ...info,
                trackUrl: trackUpload.uploadedTrackName
            })
        }
    }, [trackUpload])

    return (
        <div>
            <div>{trackUpload.fileName}</div>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={trackUpload.percent} />
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

                    <InputFileUpload />
                </Grid>
                <Grid size={{ xs: 6, md: 8 }}>
                    <TextField
                        onChange={(e) => setInfo({
                            ...info,
                            title: e.target.value
                        })}
                        value={info.title}
                        sx={{
                            mb: 2,
                            '& .MuiInputBase-input': {
                                paddingLeft: '3px',
                            },
                            '& input:-webkit-autofill': {
                                WebkitTextFillColor: '#e5e7eb',
                                WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                transition: 'background-color 9999s ease-in-out 0s',
                            },
                        }}
                        label="Title"
                        fullWidth
                        variant="standard"
                        margin="dense" />
                    <TextField
                        onChange={(e) => setInfo({
                            ...info,
                            description: e.target.value
                        })}
                        value={info.description}
                        sx={{
                            mb: 2,
                            '& .MuiInputBase-input': {
                                paddingLeft: '3px',
                            },
                            '& input:-webkit-autofill': {
                                WebkitTextFillColor: '#e5e7eb',
                                WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                transition: 'background-color 9999s ease-in-out 0s',
                            },
                        }}
                        label="Description"
                        fullWidth
                        variant="standard"
                        margin="dense" />
                    <TextField
                        onChange={(e) => setInfo({
                            ...info,
                            category: e.target.value
                        })}
                        value={info.category}
                        sx={{ mb: 2 }}
                        label="Category"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        select
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