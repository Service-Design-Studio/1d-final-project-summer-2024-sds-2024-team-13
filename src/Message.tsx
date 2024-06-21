function Message() {
    const name = 'mosh'
    if (name)
        return <h1>Hello World {name}</h1>;
    return <h1> Hi </h1>
}

export default Message