create table configuration (
    key varchar(255) primary key,
    value jsonb not null,
    updated_at timestamptz not null default now(),
    updated_by text not null
);
