import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import JobForm from './JobForm';
import { getJobs } from '../api/index';
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'orange';
    case 'Resolved':
      return 'green';
    case 'Failed':
      return 'red';
    default:
      return 'gray';
  }
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const jobs = await getJobs();
      setJobs(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchJobs, 5000);
    fetchJobs();
    return () => clearInterval(intervalId);
  }, []);

  const handleCreateJobOpen = () => {
    setOpen(true);
  };

  const handleCreateJobClose = async () => {
    setOpen(false);
    await fetchJobs();
  };

  return (
    <Box p={3}>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Jobs List</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateJobOpen}
        >
          Create Job
        </Button>
      </Box>
      <Dialog open={open} onClose={handleCreateJobClose}>
        <DialogTitle>Create Job</DialogTitle>
        <DialogContent>
          <JobForm onClose={handleCreateJobClose} />
        </DialogContent>
      </Dialog>
      <Box mt={2} style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {jobs.length === 0 ? (
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{
              textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginTop: '10px'
            }}
          >
            <Typography variant="h5" color="gray">
              No jobs yet
            </Typography>
            <Typography variant="body1" color="gray">
              Start by creating a new job!
            </Typography>
          </Box>
        ) : (
          jobs.map((job) => (
            <Box
              key={job.id}
              p={2}
              border={`1px solid ${getStatusColor(job.status)}`}
              borderRadius="4px"
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor={job.status === 'Resolved' ? '#e8f5e9' : '#fff'}
              transition="background-color 0.3s"
            >
              <Box>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body1" color={getStatusColor(job.status)}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(job.status),
                      marginRight: '8px'
                    }}
                  ></span>
                  Status: {job.status}
                </Typography>
                {job.result && (
                  <img
                    src={job.result}
                    alt="Job Result"
                    style={{ width: '100px', height: 'auto', marginTop: '8px' }}
                  />
                )}
              </Box>
              {job.status === 'Pending' && <CircularProgress size={24} />}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default JobList;
