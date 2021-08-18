package apiserver.app.task.domain;

public class TaskFixtures {
    public static Task tdd() {
        return Task.builder()
                .id(1L)
                .content("TDD 훈련")
                .build();
    }
}
