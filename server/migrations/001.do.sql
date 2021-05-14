CREATE TABLE IF NOT EXISTS session (
    session_id          VARCHAR(36) DEFAULT (UUID()),
    password            VARCHAR(16),
    created_date        DATE DEFAULT (CURRENT_DATE),
    session_creator     VARCHAR(255) NOT NULL,
    max_num_listeners   INT NOT NULL,
    PRIMARY KEY (session_id)
);