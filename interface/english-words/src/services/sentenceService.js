/* eslint-disable class-methods-use-this */
import http from '../config/http-common';

class SentenceService {
  getAll() {
    return http.get('/sentences');
  }

  createSentence(data) {
    return http.post('/sentences', data);
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
export default new SentenceService();