package apiserver.app.task.application;

import apiserver.app.task.domain.Task;
import apiserver.app.task.domain.TaskRepository;
import apiserver.app.task.exception.TaskNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional(readOnly = true)
    public List<Task> listTasks() {
        return taskRepository.findAll();
    }

    /**
     * 할 일을 생성해서 리턴합니다.
     *
     * @param task 할 일
     * @return 생성된 할 일
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * 할 일을 조회해서 리턴합니다.
     *
     * @param taskId 할 일 식별자
     * @return 할 일
     */
    @Transactional(readOnly = true)
    public Task getTask(Long taskId) {
        return taskRepository.findById(taskId)
            .orElseThrow(() -> new TaskNotFoundException("할 일을 찾을 수 없습니다."));
    }

    /**
     * 할 일을 수정해서 리턴합니다.
     *
     * @param taskId 할 일 식별자
     * @param source 수정 데이터
     * @return 수정된 할 일
     */
    public Task updateTask(Long taskId, Task source) {
        Task task = getTask(taskId);
        task.changeWith(source);
        return task;
    }

    /**
     * 할 일을 삭제합니다.
     *
     * @param taskId 할 일 식별자
     */
    public void deleteTask(Long taskId) {
        getTask(taskId);
        taskRepository.deleteById(taskId);
    }
}
