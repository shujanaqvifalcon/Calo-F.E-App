import axios from 'axios';
export const createJob = async (payload) => {
  try {
    await axios.post('http://localhost:5000/api/jobs', payload);
  } catch (error) {
    console.error('Error creating job:', error);
  }
};

export const getJobs = async (payload) => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/jobs');
    return data.jobs;
  } catch (error) {
    console.error('Error creating job:', error);
  }
};
