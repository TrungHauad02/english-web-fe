import React from 'react';
import Profile from '../../common/Profile';

const ProfileStudent = ({ open, handleClose, student }) => {
    return (
        <Profile open={open} handleClose={handleClose} type="Student" data={student} />
    );
};

export default ProfileStudent;
