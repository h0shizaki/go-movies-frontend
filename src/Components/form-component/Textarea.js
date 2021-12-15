const Textarea = (props) => {

    return (
        <div className="mb-3">
            <label htmlFor={props.name} className='form-label'>
                {props.title}
            </label>

            <textarea
                className= {`form-control ${props.className}`}
                id={props.name}
                name={props.name}
                rows={props.rows}
                onChange={props.handleChange}
                value={props.value}
            />

            <div className={props.errorDiv}>{props.errorMessage}</div>

        </div>
    );

}

export default Textarea;