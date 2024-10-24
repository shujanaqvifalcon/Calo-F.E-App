import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { createJob } from '../api/index';

const JobForm = ({ onClose }) => {
  const [jobData, setJobData] = useState({
    title: '',
    salaryExpectation: '',
    experience: ''
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(jobData);
      onClose();
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Job Title"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Salary Expectation"
          name="salaryExpectation"
          value={jobData.salaryExpectation}
          onChange={handleChange}
          margin="normal"
          type="number"
          required
        />
        <TextField
          fullWidth
          label="Experience (Years)"
          name="experience"
          value={jobData.experience}
          onChange={handleChange}
          margin="normal"
          type="number"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Job
        </Button>
      </form>
    </Box>
  );
};

export default JobForm;
