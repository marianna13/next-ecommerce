import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function PositionedMenu({vid}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
      fetch('http://localhost:3000/api/vendors', {
           method: 'DELETE',
           body: vid
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(function(res){ console.log(res) })
  }

  const handleUpdate = () => {
      fetch('http://localhost:3000/api/vendors', {
           method: 'PUT',
           body: vid
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(function(res){ console.log(res) })
  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <MoreVertIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
        <MenuItem onClick={handleClose}>Изменить</MenuItem>
      </Menu>
    </div>
  );
}
