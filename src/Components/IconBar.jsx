import { useState } from 'react'

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAddOutlined';
import LightbulbIcon from '@mui/icons-material/LightbulbOutlined';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardOutlined'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import '../Style/IconBar.css'
import ColorPicker from '../Components/Colorpicker';

export default function IconBaar() {

    const [isExpanded, setIsExpanded] = useState(false);


    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className="icon-baar">
                <div className="icon-group">
                    <Tooltip title="Notifications" arrow>
                        <IconButton>
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add Group" arrow>
                        <IconButton>
                            <GroupAddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Colors" arrow>
                        <IconButton>
                            <ColorLensOutlinedIcon onClick={handleToggle} />
                            {/* {isExpanded && (
                                <div className="color-picker-container">
                                    <ColorPicker onColorChange={handleColorChange} />
                                </div>)} */}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ideas" arrow>
                        <IconButton>
                            <LightbulbIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Insert Image" arrow>
                        <IconButton>
                            <ImageIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Calendar" arrow>
                        <IconButton>
                            <CalendarTodayIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="icon-group">
                    <Tooltip title="More Options" arrow>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Undo" arrow>
                        <IconButton>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Redo" arrow>
                        <IconButton>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Tooltip>
                    <br />


                </div>

            </div>

        </>
    )
}