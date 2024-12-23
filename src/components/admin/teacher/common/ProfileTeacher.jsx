import React from 'react';
import Profile from '../../common/Profile';

const ProfileTeacher = ({ open, handleClose, teacher }) => {
    return (
        <Profile open={open} handleClose={handleClose} type="Teacher" data={teacher} />
    );
};

export default ProfileTeacher;
