CREATE TABLE chatbot.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE chatbot.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    user_id UUID NOT NULL REFERENCES chatbot.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE chatbot.message_type AS ENUM ('Bot', 'User');

CREATE TABLE chatbot.messages (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     conversation_id UUID NOT NULL REFERENCES chatbot.conversations(id) ON DELETE CASCADE,
     content TEXT,
     type chatbot.message_type NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
);