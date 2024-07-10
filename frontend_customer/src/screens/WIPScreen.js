import React from 'react';
import { Box, Typography } from '@mui/material';
import { Construction } from '@mui/icons-material';
import styles from '../styles/WIP.module.css';

const WIPScreen = () => {
    return (
        <Box className={styles.container}>
            <Construction className={styles.largeIcon} color="disabled" />
            <Typography variant="h6" className={styles.message}>
                Work in Progress
            </Typography>
        </Box>
    );
};

export default WIPScreen;

