'use client'
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AddPlayList from "./add.playlist";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddTrack from "./add.track";

interface IProps {
    playlists: IPlayList[]
    tracks: ITrackTop[]
}
const PlayListTrack = (props: IProps) => {
    const { playlists, tracks } = props
    const [openPlayList, setOpenPlayList] = useState(false);
    const [openTrack, setOpenTrack] = useState(false);

    return (
        <div style={{
            marginTop: 40,
            padding: 50,
            background: '#ccc'
        }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <h3 style={{ color: '#000' }}>My Playlist</h3>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                    }}
                >
                    <Button
                        sx={{
                            color: '#000',
                            borderColor: '#000',
                            width: "120px",
                            height: "40px"
                        }}
                        variant="outlined"
                        onClick={() => setOpenPlayList(true)}
                        startIcon={<AddIcon />}
                    >
                        Playlist
                    </Button>

                    <Button
                        sx={{
                            color: '#000',
                            borderColor: '#000',
                            width: "120px",
                            height: "40px"
                        }}
                        variant="outlined"
                        onClick={() => setOpenTrack(true)}
                        startIcon={<AddIcon />}
                    >
                        Tracks
                    </Button>
                </div>
            </div>
            <Divider />
            {playlists.map((playlist) => (
                <Accordion
                    key={playlist._id}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">{playlist.title}</Typography>
                    </AccordionSummary>
                    <Divider />
                    {playlist.tracks.length === 0 ? (
                        <p
                            style={{
                                color: '#ccc',
                                textAlign: 'right',
                                marginRight: '10px',
                            }}
                        >
                            Empty track
                        </p>
                    ) : (
                        playlist.tracks.map((track) => (
                            <AccordionDetails
                                key={track._id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                {track.title}
                                <PlayArrowIcon sx={{ cursor: 'pointer' }} />
                            </AccordionDetails>
                        ))
                    )}

                    <Divider />
                </Accordion>
            ))}

            <AddPlayList
                open={openPlayList}
                setOpen={setOpenPlayList}
            />
            <AddTrack
                open={openTrack}
                setOpen={setOpenTrack}
                playlists={playlists ?? []}
                tracks={tracks ?? []}
            />
        </div>
    )
}

export default PlayListTrack