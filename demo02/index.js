var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
    <div>
    {
        names.map(function(name) {
            return <div>hello, {name}</div>;
        })
    }
    </div>,
    document.getElementById("example")
);