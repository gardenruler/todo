package apiserver.app.task.application;

import apiserver.app.task.domain.Task;
import apiserver.app.task.domain.TaskFixtures;
import apiserver.app.task.domain.TaskRepository;
import apiserver.app.task.exception.TaskNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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
    @DisplayName("listTasks 메서드는")
    class Describe_listTasks {
        final List<Task> taskList = new ArrayList<>();
        final Task task = TaskFixtures.tdd();

        @BeforeEach
        void mocking() {
            taskList.add(task);

            given(taskRepository.findAll())
                    .willReturn(taskList);
        }

        @Test
        @DisplayName("할 일 목록을 리턴한다")
        void It_returns_tasks_list() {
            List<Task> result = taskService.listTasks();
            assertThat(result).hasSize(taskList.size());
            assertThat(result.get(0).getContent()).isEqualTo("TDD 훈련");

            verify(taskRepository).findAll();
        }
    }

    @Nested
    @DisplayName("getTask 메서드는")
    class Describe_getTask {
        final Task task = TaskFixtures.tdd();

        @Nested
        @DisplayName("만약 유효한 식별자로 할 일을 조회한다면")
        class Context_with_valid_id {

            @BeforeEach
            void mocking() {
                given(taskRepository.findById(task.getId()))
                        .willReturn(Optional.ofNullable(task));
            }

            @Test
            @DisplayName("식별자에 해당하는 할 일을 조회해서 리턴한다")
            void It_returns_a_task() {
                Task result = taskService.getTask(task.getId());
                assertThat(result.getContent()).isEqualTo("TDD 훈련");
            }
        }

        @Nested
        @DisplayName("만약 유효하지 않은 식별자로 할 일을 조회한다면")
        class Context_with_invalid_id {
            final Long invalidTaskId = task.getId() - 1L;

            @BeforeEach
            void mocking() {
                given(taskRepository.findById(invalidTaskId))
                        .willThrow(new TaskNotFoundException("할 일을 찾을 수 없습니다."));
            }

            @Test
            @DisplayName("할 일을 찾을 수 없다는 예외를 던진다")
            void It_throws_task_not_found_exception() {
                assertThatThrownBy(() -> taskService.getTask(invalidTaskId))
                        .isInstanceOf(TaskNotFoundException.class);
            }
        }
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

    @Nested
    @DisplayName("updateTask 메서드는")
    class Describe_updateTask {
        final Task taskTdd = TaskFixtures.tdd();
        final Task taskDrinkWater = TaskFixtures.drinkWater();

        @Nested
        @DisplayName("만약 유효한 식별자로 할 일을 수정한다면")
        class Context_with_valid_id {

            @BeforeEach
            void mocking() {
                given(taskRepository.findById(taskTdd.getId()))
                        .willReturn(Optional.ofNullable(taskTdd));
            }

            @Test
            @DisplayName("식별자에 해당하는 할 일을 조회해서 리턴한다")
            void It_updates_the_task_and_returns_it() {
                Task result = taskService.updateTask(taskTdd.getId(), taskDrinkWater.getContent());
                assertThat(result.getContent()).isEqualTo("물 마시기");
            }
        }

        @Nested
        @DisplayName("만약 유효하지 않은 식별자로 할 일을 수정한다면")
        class Context_with_invalid_id {
            final Long invalidTaskId = taskTdd.getId() - taskDrinkWater.getId();

            @BeforeEach
            void mocking() {
                given(taskRepository.findById(invalidTaskId))
                        .willThrow(new TaskNotFoundException("할 일을 찾을 수 없습니다."));
            }

            @Test
            @DisplayName("할 일을 찾을 수 없다는 예외를 던진다")
            void It_throws_task_not_found_exception() {
                assertThatThrownBy(() -> taskService.updateTask(invalidTaskId, taskDrinkWater.getContent()))
                        .isInstanceOf(TaskNotFoundException.class);
            }
        }
    }
}
