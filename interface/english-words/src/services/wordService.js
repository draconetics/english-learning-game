/* eslint-disable class-methods-use-this */
import http from '../config/http-common';

class WordService {
  getAll() {
    return http.get('/words');
  }

  createWord(data) {
    return http.post('/words', data);
  }

  updateTask(id, editedTask) {
    return http.put(`/tasks/${id}`, editedTask);
  }

  deleteTask(id) {
    return http.delete(`/tasks/${id}`);
  }

  getInstance() {
    return http;
  }
}
export default new WordService();