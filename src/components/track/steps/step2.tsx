import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';
import Image from 'next/image';

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

function InputFileUpload(props: any) {
    const { info, setInfo, } = props
    const { data: session } = useSession();
    const toast = useToast()

    const handleUpload = async (image: any) => {
        const formData = new FormData();
        formData.append('fileUpload', image);
        try {
            const res = await axios.post('http://localhost:8000/api/v1/files/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${session?.access_token}`,
                    'target_type': 'images'
                },

            });
            setInfo({
                ...info,
                imgUrl: res.data.data.fileName
            })
        } catch (error) {
            // @ts-ignore
            toast.error(error?.response?.data.message)
        }
    }

    return (
        <Button
            onChange={(e) => {
                const event = e.target as HTMLInputElement
                if (event.files) {
                    handleUpload(event.files[0])
                }
            }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
        >
            <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Upload file
            </Box>
            <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
                Upload
            </Box>
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
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
    setValue: (v: number) => void
}
const Step2 = (props: IProps) => {
    const { data: session } = useSession();
    const { trackUpload, setValue } = props;
    const toast = useToast()

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

    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<ITrackTop[]>>({
            url: 'http://localhost:8000/api/v1/tracks',
            method: 'post',
            body: {
                title: info.title,
                description: info.description,
                trackUrl: info.trackUrl,
                imgUrl: info.imgUrl,
                category: info.category,
            },
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
            },
        })

        if (res && res.data) {
            setValue(0)
            toast.success(res.message)

        } else {
            toast.error(res.message)
        }
    }

    const [info, setInfo] = useState<INewTrack>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: ""
    })

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

            <Grid
                container
                spacing={2}
                mt={5}
                display={'flex'}
                alignItems={'center'}            >
                <Grid
                    size={{ xs: 6, md: 4 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{
                        width: '100%',
                        maxWidth: {
                            xs: 140,
                            sm: 180,
                            md: 220,
                            lg: 250,
                        },
                        aspectRatio: '1 / 1',
                        backgroundColor: '#ccc',
                        marginBottom: '20px',
                        position: 'relative'
                    }}>
                        {info.imgUrl &&
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`}
                                alt='upload-image'
                                fill
                                style={{
                                    objectFit: 'cover'
                                }}
                            />
                        }

                    </Box>

                    <InputFileUpload
                        setInfo={setInfo}
                        info={info}
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 8 }}>
                    <TextField
                        onChange={(e) => setInfo({
                            ...info,
                            title: e.target.value
                        })}
                        value={info.title}
                        sx={{
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

                    <Button onClick={() => handleSubmit()}
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        SAVE
                    </Button>
                </Grid>
            </Grid>
        </div >
    )

}

export default Step2;