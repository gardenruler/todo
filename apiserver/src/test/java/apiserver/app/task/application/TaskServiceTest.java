package apiserver.app.task.application;

import apiserver.app.task.domain.Task;
import apiserver.app.task.domain.TaskFixtures;
import apiserver.app.task.domain.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@DisplayName("TaskService 클래스")
class TaskServiceTest {

    private final TaskRepository taskRepository = mock(TaskRepository.class);
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskService = new TaskService(taskRepository);
    }

    @Nested
    @DisplayName("createTask 메서드는")
    class Describe_createTask {
        final Task task = TaskFixtures.tdd();

        @BeforeEach
        void mocking() {
            given(taskRepository.save(any(Task.class)))
                    .willReturn(task);
        }

        @Test
        @DisplayName("할 일을 생성해서 리턴한다")
        void It_creates_a_task_and_returns_it() {
            Task result = taskService.createTask(task);
            assertThat(result.getContent()).isEqualTo(task.getContent());

            verify(taskRepository).save(any(Task.class));
        }
    }

}