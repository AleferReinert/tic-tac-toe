export function Square(props) {
    const element = () => {
        if (props.value === 'X') {
            return <span className='x'></span>
        }

        if (props.value === 'O') {
            return <span className='o'></span>
        }
    }
    return (
        <button className="square" onClick={props.onClick} data-index={props.index}>
            {element()}
        </button>
    );
}