import React, { useState } from 'react';
import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import GroupIcon from '@mui/icons-material/Group';
import PaletteIcon from '@mui/icons-material/Palette';
import ImageIcon from '@mui/icons-material/Image';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { toggleArchiveNote, toggleTrashNote, deleteForever, updateNoteColor } from '../Services/noteService';
import { useParams } from 'react-router-dom';

export default function IconBar({ noteId, input, onColorChange, isArchived, isTrashed, setNoteCreated, handleColour }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { id } = useParams();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorChange = async (color) => {
        try {
            if (input === true) {
                handleColour(color);
            } else {
                await updateNoteColor(noteId, color);
                setNoteCreated(true);
            }
        } catch (error) {
            console.error('Error updating note color:', error.response ? error.response.data : error.message);
        }
    };

    const handleArchiveToggle = async () => {
        if (id) {
            try {
                const response = await toggleArchiveNote(id);
                setNoteCreated(true);
                console.log('Archive toggle response:', response);
            } catch (error) {
                console.error('Failed to toggle archive:', error);
            }
        }
    };

    const handleTrashToggle = async () => {
        if (id) {
            try {
                const response = await toggleTrashNote(id);
                setNoteCreated(true);
                console.log('Trash toggle response:', response);
            } catch (error) {
                console.error('Failed to toggle trash:', error);
            }
        }
    };

    const handleDelete = async () => {
        if (id) {
            try {
                const response = await deleteForever(id);
                setNoteCreated(true);
                console.log('Delete forever response:', response);
            } catch (error) {
                console.error('Failed to delete forever:', error);
            }
        }
    };

    const renderIcons = () => {
        return (
            <>
                <Tooltip title="Remind me" arrow>
                    <IconButton style={{ color: 'white' }}>
                        <AlarmIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Collaborator" arrow>
                    <IconButton style={{ color: 'white' }}>
                        <GroupIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Background options" arrow>
                    <IconButton onClick={handleClick} style={{ color: 'white' }}>
                        <PaletteIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'background-options-button',
                    }}
                >
                    <MenuItem onClick={() => handleColorChange('blue')}>Blue</MenuItem>
                    <MenuItem onClick={() => handleColorChange('red')}>Red</MenuItem>
                    <MenuItem onClick={() => handleColorChange('white')}>White</MenuItem>
                    <MenuItem onClick={() => handleColorChange('black')}>Black</MenuItem>
                    <MenuItem onClick={() => handleColorChange('yellow')}>Yellow</MenuItem>
                    <MenuItem onClick={() => handleColorChange('orange')}>Orange</MenuItem>
                </Menu>
                <Tooltip title="Add image" arrow>
                    <IconButton style={{ color: 'white' }}>
                        <ImageIcon />
                    </IconButton>
                </Tooltip>

                {isTrashed ? (
                    <>
                        <Tooltip title="Restore" arrow>
                            <IconButton onClick={handleTrashToggle} style={{ color: 'white' }}>
                                <RestoreFromTrashIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Forever" arrow>
                            <IconButton onClick={handleDelete} style={{ color: 'white' }}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : isArchived ? (
                    <Tooltip title="Unarchive" arrow>
                        <IconButton onClick={handleArchiveToggle} style={{ color: 'white' }}>
                            <UnarchiveIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <>
                        <Tooltip title="Archive" arrow>
                            <IconButton onClick={handleArchiveToggle} style={{ color: 'white' }}>
                                <ArchiveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Trash" arrow>
                            <IconButton onClick={handleTrashToggle} style={{ color: 'white' }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </>
        );
    };

    return (
        <div className="icon-bar">
            <div className="icon-group">
                {renderIcons()}
            </div>
        </div>
    );
}
