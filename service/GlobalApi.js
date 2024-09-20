import axios from 'axios';

// Make sure you have your VITE_STRAPI_API_KEY set in your environment variables
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api/', // Change this to your production URL if necessary
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const CreateNewResume = async (data) => {
    try {
        const dataPayload = {
            data: {
                title: data.title,
                resumeid: data.resumeid,
                userEmail: data.userEmail,
                userName: data.userName
            }
        };

        const response = await axiosClient.post('/user-resumes', dataPayload);
        console.log('API Response:', response.data);
        return response.data;

    } catch (error) {
        console.error("Error creating resume:", error);
        throw error;
    }
};

const GetUserResumes = (userEmail) => 
    axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

export default {
    CreateNewResume,
    GetUserResumes
};
