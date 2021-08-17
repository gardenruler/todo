package apiserver.app.task.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class TaskNotFoundException extends HttpClientErrorException {
    public TaskNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
