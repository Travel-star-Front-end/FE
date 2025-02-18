import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../apis/axios';

// 일정 조회
export const useSchedules = () => {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const response = await API.get('/schedule');
      return response.data;
    },
  });
};

// 일정 세부 일정 조회
export const useDaySchedules = (selectedDay) => {
  return useQuery({
    queryKey: ['schedules', selectedDay],
    queryFn: async () => {
      const response = await API.get(`/schedule/${selectedDay}`);
      return response.data;
    },
  });
};

// 일정 추가
export const useAddSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSchedule) => {
      const response = await API.post('/schedule', newSchedule);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
