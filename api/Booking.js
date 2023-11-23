import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: "http://localhost:8080",
});

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (e) {
        // manejar el error, si es necesario
    }
};

const BookingApi = {
    addBooking: async (courseId, professorId, timeSlotId) => {
        const token = await getToken();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        return api.post('/bookings/new', { courseId, professorId, timeSlotId }, { headers });
    },

    getStudentBookings: async (page) => {
        const token = await getToken();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        return api.get(`/bookings/student?page=${page}`, { headers });
    },

    getFutureBookings: async (page) => {
        const token = await getToken();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        return api.get(`/bookings/professor?page=${page}`, { headers });
    },

    getById: async (id) => {
        const token = await getToken();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        return api.get(`/bookings/short/${id}`, { headers });
    },
};

export default BookingApi;
