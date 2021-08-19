package apiserver.app.task.domain;

public class TaskFixtures {
    public static Task tdd() {
        return Task.builder()
                .id(1L)
                .content("TDD 훈련")
                .build();
    }

    public static Task drinkWater() {
        return Task.builder()
                .id(1L)
                .content("물 마시기")
                .build();
    }
}
