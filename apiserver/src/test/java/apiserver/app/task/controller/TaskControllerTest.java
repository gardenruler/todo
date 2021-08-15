package apiserver.app.task.controller;

import apiserver.app.task.application.TaskService;
import apiserver.app.task.domain.Task;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("TaskController 클래스")
@WebMvcTest(TaskController.class)
@ActiveProfiles("local")
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Nested
    @DisplayName("listTasks 메서드는")
    class Describe_list_tasks {
        List<Task> taskList = new ArrayList<>();
        Task task = new Task(1L, "TDD 훈련", false, LocalDateTime.now());

        @BeforeEach
        void mocking() {
            taskList.add(task);

            given(taskService.listTasks())
                    .willReturn(taskList);
        }

        @Test
        @DisplayName("할 일 목록을 리턴한다")
        void It_returns_task_list() throws Exception {
            mockMvc.perform(get("/tasks"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[*]", hasSize(1)))
                    .andExpect(jsonPath("$[0].content", is("TDD 훈련")))
                    .andExpect(jsonPath("$[0].done", is(false)));
        }
    }
}
