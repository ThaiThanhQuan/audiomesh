'use client';
import { FileWithPath, useDropzone } from 'react-dropzone'
import './theme.css';
import { styled } from '@mui/material/styles';
import { Alert, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { use, useCallback, useState } from 'react';
import { sendRequestFile } from '@/utils/api';
import { useSession } from 'next-auth/react';
import axios from 'axios';

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

function InputFileUpload() {
    return (
        <Button
            onClick={(e) => e.preventDefault()}
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
interface IProps {
    setValue: (v: number) => void
    setTrackUpload: any
    trackUpload: {
        fileName: string,
        percent: number,
        uploadedTrackName: string
    }
}
const Step1 = (props: IProps) => {
    const { setValue, setTrackUpload, trackUpload } = props;

    const { data: session } = useSession();

    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setValue(1);
            const audio = acceptedFiles[0];
            const formData = new FormData();
            formData.append('fileUpload', audio);
            try {
                const res = await axios.post('http://localhost:8000/api/v1/files/upload', formData, {
                    headers: {
                        'Authorization': `Bearer ${session?.access_token}`,
                        'target_type': 'tracks',
                        delay: 3000
                    },
                    onUploadProgress: function (progressEvent) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!)

                        setTrackUpload({
                            ...trackUpload,
                            fileName: acceptedFiles[0].name,
                            percent: percentCompleted
                        })
                    }
                });

                setTrackUpload({
                    ...trackUpload,
                    uploadedTrackName: res.data.data.fileName,
                })

            } catch (error) {
                // @ts-ignore
                alert('error upload file', error?.response?.data.message);
            }


        }
    }, [session, setTrackUpload])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'audio/*': []
        },
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div
                {...getRootProps({ className: 'dropzone' })}
                style={{
                    background: '#7c7878',
                    color: '#fff'
                }}
            >
                <input {...getInputProps()} />
                <InputFileUpload />
                <p>Drag and drop your files here, or click to select them</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default Step1