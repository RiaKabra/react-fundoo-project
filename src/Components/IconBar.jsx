

import React, { useState } from 'react';
import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';  
import GroupIcon from '@mui/icons-material/Group'; 
import PaletteIcon from '@mui/icons-material/Palette';  
import ImageIcon from '@mui/icons-material/Image'; 
import ArchiveIcon from '@mui/icons-material/Archive'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toggleArchiveNote } from '../Services/noteService';

export default function IconBar({ noteId, onColorChange }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const {id} = useParams();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorChange = async (color) => {
        setSelectedColor(color);
        handleClose();

        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/notes/colour/${noteId}`, {
                color: color,
            });
            if (response.status === 200) {
                onColorChange(color);
            }
        } catch (error) {
            console.error('Error updating note color:', error);
        }
        return (
            <div className="icon-bar">
                <button onClick={() => handleColorChange('blue')}>Blue</button>
                <button onClick={() => handleColorChange('red')}>Red</button>
                <button onClick={() => handleColorChange('white')}>White</button>
                <button onClick={() => handleColorChange('black')}>Black</button>
                <button onClick={() => handleColorChange('yellow')}>Yellow</button>
                <button onClick={() => handleColorChange('orange')}>Orange</button>
            </div>
        );
    };
    const archive = async () => {
        if (id) {
            console.log(id);
            try {
                const res = await  toggleArchiveNote(id);
                console.log('Note archived:', res);
            } catch (error) {
                console.error('Failed to archive note:', error);
            }
        } else {
            console.error('No id found in params');
        }
    };
    return (
        <div className="icon-bar">
            <div className="icon-group">
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
                    open={open}
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
                    <IconButton onClick={archive}>
                        <ArchiveIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}