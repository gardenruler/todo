package apiserver.app.task.application;

import apiserver.app.task.domain.Task;
import apiserver.app.task.domain.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * 할 일 목록을 리턴합니다.
     *
     * @return 할 일 목록
     */
    public List<Task> listTasks() {
        return taskRepository.findAll();
    }

    /**
     * 할 일을 생성해서 리턴합니다/
     * 
     * @param task 할 일
     * @return 생성된 할 일
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
}
