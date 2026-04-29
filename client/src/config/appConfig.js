const config = {
    entity: "tasks",
    fields: [
        {name: "title", type: "text"},
        {name: "status", type: "select", options: ["Todo", "Done"]}
    ]
}

export default config;