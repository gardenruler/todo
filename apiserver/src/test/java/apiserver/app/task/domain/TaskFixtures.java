package apiserver.app.task.domain;

public class TaskFixtures {
    public static Task tdd() {
        return Task.builder()
                .content("TDD 훈련")
                .build();
    }
}
