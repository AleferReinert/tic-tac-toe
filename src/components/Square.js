export function Square(props) {
    return (
        <button className="square" onClick={props.onClick} data-index={props.index}>
            <span className={ props.value }></span>
        </button>
    );
}