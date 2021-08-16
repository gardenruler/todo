package apiserver.app.task.controller;

import apiserver.app.task.application.TaskService;
import apiserver.app.task.domain.Task;
import apiserver.app.task.domain.TaskFixtures;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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
    @DisplayName("GET /tasks 요청은")
    class Describe_get_tasks {
        final List<Task> taskList = new ArrayList<>();
        final Task task = TaskFixtures.tdd();

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

    @Nested
    @DisplayName("POST /tasks 요청은")
    class Describe_post_tasks {
        final ObjectMapper objectMapper = new ObjectMapper();
        final Task task = TaskFixtures.tdd();

        @BeforeEach
        void mocking() {
            given(taskService.createTask(any(Task.class)))
                    .willReturn(task);
        }

        @Test
        @DisplayName("할 일을 생성해서 리턴한다")
        void It_creates_a_task_and_returns_it() throws Exception {
            var request =
                    post("/tasks")
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(task));

            mockMvc.perform(request)
                    .andExpect(status().isCreated())
                    .andExpect(content().string(containsString("TDD 훈련")))
                    .andExpect(jsonPath("$.content", containsString("TDD 훈련")));

            verify(taskService).createTask(any(Task.class));
        }
    }
}
