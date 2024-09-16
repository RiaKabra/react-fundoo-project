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
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toggleArchiveNote, toggleTrashNote } from '../Services/noteService';

export default function IconBar({ noteId, onColorChange, isArchived, isTrashed ,setNoteCreated}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const { id } = useParams();
    const open = Boolean(anchorEl);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleColorChange = async (color) => {
        setSelectedColor(color);
        handleClose();
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/notes/colour/${noteId}`, { color });
            if (response.status === 200) {
                onColorChange(color);
            }
        } catch (error) {
            console.error('Error updating note color:', error);
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
                const response = await toggleArchiveNote(id);
                setNoteCreated(true);
                console.log('Delete forever response:', response);
           
                
            }
            else
            {
                console.log('Failed to delete forever:');
            }
        }
    

    const renderIcon = () => {
        if (isTrashed) {
            return (<>
                <Tooltip title="Restore" arrow>
                    <IconButton onClick={handleTrashToggle}>
                        <RestoreFromTrashIcon />
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="Delete Forever" arrow>
                    <IconButton onClick={handleDelete}>
                        <DeleteForeverIcon  />
                    </IconButton>
                         </Tooltip>
                         </> );
        } else if (isArchived) {
            return (
                <Tooltip title="Unarchive" arrow>
                    <IconButton onClick={handleArchiveToggle}>
                        <UnarchiveIcon />
                    </IconButton>
                </Tooltip>
            );
        } else {
            return (
                <>
                    <Tooltip title="Remind me" arrow>
                        <IconButton>
                            <AlarmIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Collaborator" arrow>
                        <IconButton>
                            <GroupIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Background options" arrow>
                        <IconButton onClick={handleClick}>
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
                        <IconButton>
                            <ImageIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Archive" arrow>
                        <IconButton onClick={handleArchiveToggle}>
                            <ArchiveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Trash" arrow>
                        <IconButton onClick={handleTrashToggle}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            );
        }
    };

    return (
        <div className="icon-bar">
            <div className="icon-group">
                {renderIcon()}
            </div>
        </div>
    );
}
